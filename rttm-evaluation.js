const fs = require('fs');
var _ = require('underscore'),
    spawn = require('child_process').spawn;

module.exports = {

    /* Build a list of all human annotated video for each machine annotated video. 
    Assume human annotation are store with original "talent" name in "humanRttmPath" folder */
    buildRTTMList: function(generatedRttmPath,humanRttmPath,humamSampleSize ) {
        fs.readdir(generatedRttmPath, function(err, items) {
            function buildRTTMList(index){
                var toReturn = '';
                for ( var humanIndex = 1 ; humanIndex <= humamSampleSize; humanIndex++){
                    toReturn+= humanRttmPath+'/'+humanIndex+'/'+items[index]+'\r\n'
                }
                return toReturn;
            };

            for (var i=0; i<items.length; i++) {
                if(items[i] && ! items[i].startsWith('.')){
                    fs.writeFile('generatedRttmLists'+'/'+items[i]+'list.txt', buildRTTMList(i), (err)=> {
                        if(err) {
                            return console.log(err);
                        }
                    }); 
                }
            }
        });
    },

    //Exemple cat of the rttmSmooth utility : 
    //cat Computers.mp4-SpeakerExport-smooth-test.txt | ./bin/rttmSmooth.pl 1 > Computers.mp4-SpeakerExport-smooth-test-modif.txt 
    smoothDirectory:function(rttmPath){
        console.log("smooth RTTM for dir :"+rttmPath);
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.split(search).join(replacement);
        };

        fs.readdir(rttmPath, function(err, items) {
            if (err){
                console.log(err);
            }
            if (items){
                for (var i=0; i<items.length; i++) {
                    if(items[i] && ! items[i].startsWith('.')){
                        var cmd = '';
                        for (var i=0; i<items.length; i++) {
                            cmd = 'cat ' + rttmPath+items[i].replaceAll(' ','\\ ') + ' | ./bin/rttmSmooth.pl '+ 1 + ' > ' +rttmPath+ items[i].replaceAll(' ','\\ ')+'-smoothed.txt' ;
                            console.log(cmd);
                            shspawn(cmd);
                        }
                    }
                }
            }
            else {
                console.log('is '+rttmPath + 'correct?');
            }
        });
    },

    /* output report for a given machine-generated RTTM directory */
    report: function(generatedRttmPath) {
        const generatedRttmListDir = 'generatedRttmLists';

        fs.readdir(generatedRttmPath, function(err, items) {
         	var cmd = './bin/md-eval.pl' , 
         		cmdArgs= '';
         	
            for (var i=0; i<items.length; i++) {
            		if(items && items[i] && ! items[i].startsWith('.') ){
                        //console.log(items[i]);
        	    		cmdArgs = ['-R', generatedRttmListDir + '/' + items[i]+'list.txt', '-s', generatedRttmPath + '/' + items[i] ];
                        //console.log(cmdArgs);
        	    		run(cmd,cmdArgs,items[i], (contextualData,result)=>{
        	    			var resultPosition = result.indexOf("OVERALL SPEAKER DIARIZATION ERROR");
                            if ( result && contextualData ){
        	    			    console.log (contextualData +';'+ result.slice(resultPosition+36  , resultPosition+41 ));
                            }
        	    		});
            		}
            }
        });
    }

};

function run(cmd,args, contextualData,callback) {
    var command = spawn(cmd,args);
    var result = '';
    command.stdout.on('data', function(data) {
        if ( data ){
            result += data.toString();
        }
    });
    command.stderr.on('data', function(data) {
        //console.log(`stderr: ${data}`);
    });
    command.on('close', function(code) {
        return callback(contextualData,result);
    });
};

function shspawn(command) {
   spawn('sh', ['-c', command], { stdio: 'inherit' });
} 

