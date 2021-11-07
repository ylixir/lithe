.PHONY: default build install uninstall clean

LUMEN_DIR ?= ../lumen

LUMEN_LUA  ?= lua
LUMEN_NODE ?= node
LUMEN_HOST ?= $(LUMEN_LUA)

LUMEN := LUMEN_HOST="$(LUMEN_HOST)" "$(LUMEN_DIR)/bin/lumen"

# WoW will load the modules in the order they are specified here
MODULES := compiler main
TARGET_DIR := ../dist/Lithe
TARGETS := $(MODULES:%=$(TARGET_DIR)/%.lua)
SOURCES := $(MODULES:%=%.l)
INSTALL_DIR = $(WOW_DIR)/_retail_/Interface/Addons/Lithe/

default: build
build: $(TARGET_DIR) $(TARGET_DIR)/Lithe.toc $(TARGETS)

install: build
	mkdir -p "$(INSTALL_DIR)"
	cp -r $(TARGET_DIR)/. "$(INSTALL_DIR)"

uninstall:
	rm -rf "$(INSTALL_DIR)"

clean:
	rm -rf $(TARGET_DIR)

$(TARGET_DIR):
	@echo "  $@"
	@mkdir -p $(TARGET_DIR)

$(TARGET_DIR)/Lithe.toc: Lithe.toc $(TARGET_DIR)
	@echo "  $@"
	@cp $< $@
	@echo $(MODULES:%=%.lua) | sed -e 's/\.lua\s/.lua\n/g' >> $@

$(TARGET_DIR)/compiler.lua: $(LUMEN_DIR)/runtime.l $(LUMEN_DIR)/macros.l $(LUMEN_DIR)/reader.l $(LUMEN_DIR)/compiler.l compiler.l $(TARGET_DIR)
	@echo "  $@"
	@cat compiler.l \
	| LUMEN_RUNTIME=`cat $(LUMEN_DIR)/runtime.l` \
	  LUMEN_MACROS=`cat $(LUMEN_DIR)/macros.l` \
	  LUMEN_READER=`cat $(LUMEN_DIR)/reader.l` \
	  LUMEN_COMPILER=`cat $(LUMEN_DIR)/compiler.l` \
	  envsubst -no-unset \
	| $(LUMEN) -c /dev/stdin -o $@ -t lua

# dist goes second so that the rule can target the source with $<
$(TARGET_DIR)/%.lua : %.l $(TARGET_DIR)
	@echo "  $@"
	@$(LUMEN) -c $< -o $@ -t lua
