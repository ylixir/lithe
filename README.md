# Lithe
A notebook/coding environment for the Lumen programming language which runs
from within the Warcraft client.

## Goals
1. Everything is lumen: if you use the tool, you should be able to hack on it.
1. Self hosted. Code for the ui lives in WoW and is modifiable. The actual
   addon only provides what is absolutely necessary to run code.
1. No lua support. There is already tooling supporting lua (Hack forks, Wowlua)
1. Multiuser. Users should be able to easily share and remix scripts. Weakauras
   is a good example of what we are chasing here.
1. Stable communicatiion protocols. Code for communication protocols is _not_
   available from within the UI, and is only hackable by modifying the addon.
1. Embrace the Lua ecosystem over the WoW when needed. We are going to need to
   use packages from the Lua ecosystem. Our lives will be easier if we embrace
   lua idioms instead of WoW idioms. One example is lua packages vs LibStub. We
   aren't going to rewrite lumen to use LibStub, we will just use the lua
   idioms for loading packages.
1. You should be able to run the build from Linux, Windows Subsystem for Linux,
   or Mac OS X

## Licensing
See the LICENSE files for the full license.

tl;dr:
* Lumen code is can be modified and you aren't required to share your changes
* The Lithe addon code can be modified, but you must share your changes
* Do wtf you want with the code for managing build/ops machinery

### License rationale
I want to encourage people in the WoW addon community to be more explicit
with their licenses so I'm trying to force their hand with an aggressive
copyleft license.

Mostly though I like my code to be free, so everything that isn't WoW specific
gets the WTFPL ('cause it's funny).

The original authors of Lumen used the BSD2, so we respect that and don't
fold it into the AGPL.

## Why didn't you fork an existing tool?
Sadly I haven't found a tool like this with an open license.
Hack claims public domain, but that claim is not from the original author.
Wowlua seems to have no license whatsoever, so it is closed source.
I haven't that isn't one of these, or a fork of one of these.

## Setting up your dev environment
Setup your environment: `cp .env.example .env` and then modify `.env` according
to your system.

### Build requirements
Install the tools for managing the dev environment:
* Required
** nix
* Optional
** direnv
** lorri

These tools work on Macs, Linux, and WSL. You can roll without these, but
you are on your own in that case.

### Building
If you aren't running lorri and direnv then you must enter the development
environment by typing `. .env; nix run`. If you are running lorri and direnv
then you will be automatically placed into the development environment after
following the instructions from direnv to authorize it.

You can do a full build by running `make install`.

## misc notes
1. lua-wow allows redefining global math functions, however WoW does not
1. you may inline lua or js code buy putting it in between pipes |
