let
  pkgs = import ./nix/package-lock.nix;
in with pkgs;
stdenv.mkDerivation {
  name = "lithe";
  buildInputs = import ./default.nix;
}
