#!/usr/bin/env

nix-shell -p 'python3.withPackages(ps: with ps; [ mutagen ])'
