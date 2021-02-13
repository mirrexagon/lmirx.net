{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    flac
    python3Packages.python
    python3Packages.mutagen
    awscli
  ];
}
