let
  pkgs = import ./nix/package-lock.nix;
  lua-wow = import ./nix/lua-wow.nix (pkgs // {
    sourceVersion = {major = "5"; minor = "1"; patch = "1";};
    hash = "661a46c5d513790b9db5f193e48399f54ea534de";
  });
in with pkgs;
[
  # lua5_4
  lua-wow
  gnumake
]
