
SHELL = /bin/sh
PREFIX=/Users/antoine/bin/sctk-2.4.0
bindir = $(PREFIX)/bin

all: stmValidator.pl

stmValidator.pl: stmValidator-main.pl buildInstallVersion.pl STMList.pl STMRecord.pl
	perl buildInstallVersion.pl > stmValidator.pl
	chmod +x stmValidator.pl

check: all
	(cd test_suite; $(SHELL) RunTest.sh ../stmValidator.pl)

install: all
	perl buildInstallVersion.pl > $(bindir)/stmValidator.pl
	chmod +x $(bindir)/stmValidator.pl

STMList.pl:

STMRecord.pl:

clean:

distclean: clean
	rm -r *~ makefile
