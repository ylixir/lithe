# Copyright © 2021 Jon Allen <jon@ylixir.io>
# This work is free. You can redistribute it and/or modify it under the
# terms of the Do What The Fuck You Want To Public License, Version 2,
# as published by Sam Hocevar. See the LICENSE file for more details.

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
