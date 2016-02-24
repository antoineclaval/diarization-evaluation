var rttmEval = require("./rttm-evaluation.js");

console.log('generate smoot version of each RTTM');
rttmEval.smoothDirectory('RTTM-Machine/LIUM-3.1/');
rttmEval.smoothDirectory('RTTM-Machine/LIUM-4.2/');
rttmEval.smoothDirectory('RTTM-Machine/LIUM-8.4/');
console.log('build RTTM list needed by md-eval -R option');
rttmEval.buildRTTMList('RTTM-Machine/LIUM-8.4','RTTM-Human', 3 );
console.log('Run md-eval on 8.4')
console.log(rttmEval.report('RTTM-Machine/LIUM-8.4/'));
