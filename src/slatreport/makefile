# **********************************************************
# Makefile for slatreport Directory
# **********************************************************
MAKE=make
PREFIX=/Users/antoine/bin/sctk-2.4.0
bindir=$(PREFIX)/bin

all: slatreport.pl

slatreport.pl: 
	chmod +x slatreport.pl

config:
	@echo -n " Checking gnuplot... "
	@if [ "`which gnuplot | egrep '^/'`" = "" ] ; then \
		echo "not found"; \
	else \
		echo `which gnuplot`; \
	fi

check: all
	@echo "Testing slatreport.pl"
	./slatTest.pl
	@echo "   slatreport.pl tests successfully completed"

install: all
	cp slatreport.pl $(bindir)

clean:

distclean: clean
	rm -r *~ makefile
