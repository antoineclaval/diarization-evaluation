#Original work 
see README-From-2009 

# Compile & install tools
make config
make all
make check
make install
make doc

# Running the test
- place rttm files in appropriate directory. 
- node all-test.js
- Alternatively, direct call to what you need in rttm-evaluation.js module ( require("./rttm-evaluation.js");)

#Environnement 
tested on osx 10.11

#Know issus / failling compilation 

Compilation failling for rfilter1. Compilation commented in src/makefile
Doc here : 
https://github.com/foundintranslation/Kaldi/blob/master/tools/sctk-2.4.0/src/rfilter1/rfilter1.c

Test failling for csrfilt. Doc here : 
https://github.com/foundintranslation/Kaldi/blob/master/tools/sctk-2.4.0/src/csrfilt/csrfilt.sh