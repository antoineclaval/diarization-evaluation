# **********************************************************
# Makefile for rfilter1 Directory
# **********************************************************

SHELL = /bin/sh

all: rfilter1

###########################   Options for compilation  #########################
#######  If you have an very new version of GCC, the strcmp* family of functions
#######  is included in the distribution.  Changing the value of OPTIONS to 
#######  be blank will diable the use of supplied versions of these functions.
OPTIONS=-DNEED_STRCMP=1

PREFIX=/Users/antoine/bin/sctk-2.4.0
bindir = $(PREFIX)/bin

rfilter1: rfilter1.c
	gcc $(OPTIONS) -o rfilter1 rfilter1.c

setTests:
	./rfilter1 ../test_suite/test.arb2004.glm < ../test_suite/test.arb2004.txt > ../test_suite/test.arb2004.txt.rfilter1
	./rfilter1 ../test_suite/test.man2004.glm < ../test_suite/test.man2004.txt > ../test_suite/test.man2004.txt.rfilter1

check:
	@echo "Testing rfilter1"
	./rfilter1 ../test_suite/test.arb2004.glm < ../test_suite/test.arb2004.txt | diff - ../test_suite/test.arb2004.txt.rfilter1
	./rfilter1 ../test_suite/test.man2004.glm < ../test_suite/test.man2004.txt | diff - ../test_suite/test.man2004.txt.rfilter1
	@echo "   rfilter1 tests successfully completed"

install: all
	install rfilter1 $(bindir)

clean:
	rm -f rfilter1

distclean: clean
	rm -r *~ makefile
