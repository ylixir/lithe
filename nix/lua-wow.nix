# Copyright © 2021 Jon Allen <jon@ylixir.io>
# This work is free. You can redistribute it and/or modify it under the
# terms of the Do What The Fuck You Want To Public License, Version 2,
# as published by Sam Hocevar. See the top level LICENSE file for more details.

{ lib, stdenv, fetchurl, readline
, compat ? false
, callPackage
, makeWrapper
, packageOverrides ? (final: prev: {})
, sourceVersion
, hash
, patches ? []
, postConfigure ? null
, postBuild ? null
, ...
}:
let
plat = if stdenv.isLinux then "linux"
       else if stdenv.isDarwin then "macosx"
       else "generic";

self = stdenv.mkDerivation rec {
  pname = "lua";
  luaversion = with sourceVersion; "${major}.${minor}";
  version = "${luaversion}.${sourceVersion.patch}";

  src = fetchGit {
    url = "https://github.com/cogwheel/lua-wow.git";
    rev = hash;
  };

  nativeBuildInputs = [ makeWrapper ];
  buildInputs = [ readline ];

  inherit patches;

  # we can't pass flags to the lua makefile because for portability, everything is hardcoded
  postPatch = ''
    {
      echo -e '
        #undef  LUA_PATH_DEFAULT
        #define LUA_PATH_DEFAULT "./share/lua/${luaversion}/?.lua;./?.lua;./?/init.lua"
        #undef  LUA_CPATH_DEFAULT
        #define LUA_CPATH_DEFAULT "./lib/lua/${luaversion}/?.so;./?.so;./lib/lua/${luaversion}/loadall.so"
      '
    } >> src/luaconf.h
  '' ;

  # see configurePhase for additional flags (with space)
  makeFlags = [
    "INSTALL_TOP=${placeholder "out"}"
    "INSTALL_MAN=${placeholder "out"}/share/man/man1"
    "R=${version}"
    "LDFLAGS=-fPIC"
    "V=${luaversion}"
    "PLAT=${plat}"
    "CC=${stdenv.cc.targetPrefix}cc"
    "RANLIB=${stdenv.cc.targetPrefix}ranlib"
    # Lua links with readline wich depends on ncurses. For some reason when
    # building pkgsStatic.lua it fails because symbols from ncurses are not
    # found. Adding ncurses here fixes the problem.
    "MYLIBS=-lncurses"
  ];

  configurePhase = ''
    runHook preConfigure

    makeFlagsArray+=(CFLAGS='-O2 -fPIC${lib.optionalString compat " -DLUA_COMPAT_ALL"} $(${
      if lib.versionAtLeast luaversion "5.2" then "SYSCFLAGS" else "MYCFLAGS"})' )
    makeFlagsArray+=(${lib.optionalString stdenv.isDarwin "CC=\"$CC\""}${lib.optionalString (stdenv.buildPlatform != stdenv.hostPlatform) " 'AR=${stdenv.cc.targetPrefix}ar rcu'"})

    installFlagsArray=( TO_BIN="lua luac" INSTALL_DATA='cp -d' \
      TO_LIB="${if stdenv.isDarwin then "liblua.${version}.dylib"
      else ("liblua.a")}"
    )

    runHook postConfigure
  '';
  inherit postConfigure;

  inherit postBuild;

  postInstall = ''
    mkdir -p "$out/share/doc/lua" "$out/lib/pkgconfig"
    mv "doc/"*.{gif,png,css,html} "$out/share/doc/lua/"
    rmdir $out/{share,lib}/lua/${luaversion} $out/{share,lib}/lua
    mkdir -p "$out/lib/pkgconfig"

    cat >"$out/lib/pkgconfig/lua.pc" <<EOF
    prefix=$out
    libdir=$out/lib
    includedir=$out/include
    INSTALL_BIN=$out/bin
    INSTALL_INC=$out/include
    INSTALL_LIB=$out/lib
    INSTALL_MAN=$out/man/man1

    Name: Lua
    Description: An Extensible Extension Language
    Version: ${version}
    Requires:
    Libs: -L$out/lib -llua
    Cflags: -I$out/include
    EOF
    ln -s "$out/lib/pkgconfig/lua.pc" "$out/lib/pkgconfig/lua-${luaversion}.pc"
    ln -s "$out/lib/pkgconfig/lua.pc" "$out/lib/pkgconfig/lua${luaversion}.pc"
    ln -s "$out/lib/pkgconfig/lua.pc" "$out/lib/pkgconfig/lua${lib.replaceStrings [ "." ] [ "" ] luaversion}.pc"
  '';

  meta = {
    homepage = "http://www.lua.org";
    description = "Powerful, fast, lightweight, embeddable scripting language";
    longDescription = ''
      Lua combines simple procedural syntax with powerful data
      description constructs based on associative arrays and extensible
      semantics. Lua is dynamically typed, runs by interpreting bytecode
      for a register-based virtual machine, and has automatic memory
      management with incremental garbage collection, making it ideal
      for configuration, scripting, and rapid prototyping.
    '';
    license = lib.licenses.mit;
    platforms = lib.platforms.unix;
  };
};
in self
