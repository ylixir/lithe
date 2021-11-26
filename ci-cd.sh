#!/usr/bin/env -S nix shell -f default.nix -i -c bash

function lumen-double-build {
  # once to make sure code generator is in sync with codebase
  make --always-make --directory=lumen
  # once more to make sure that code generated is in sync with codebase
  make --always-make --directory=lumen
}

function lumen-hash {
  sha256sum -b lumen/bin/*
}

function lumen-is-fresh {
  og_hash="$(lumen-hash)"
  echo OG Hash is
  echo "$og_hash"

  echo Building lumen...
  lumen-double-build
  if [ "$?" -ne 0 ]
  then
    echo Could not build lumen
    return 1
  fi

  fresh_hash="$(lumen-hash)"
  echo Fresh Hash is
  echo "$fresh_hash"

  if [ "$og_hash" = "$fresh_hash" ]
  then
    echo The hashes match
    return 0
  else
    echo The hashes don not match
    return 1
  fi
}

function lumen-passes {
  make --directory=lumen test
}

command="$1"
shift
"$command" "$@"
