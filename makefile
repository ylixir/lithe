.PHONY: all install uninstall clean

all:
	$(MAKE) -C lithe

install: all
	$(MAKE) -C lithe install

uninstall: all
	$(MAKE) -C lithe uninstall
clean:
	$(MAKE) -C lithe clean
	rm -rf dist
