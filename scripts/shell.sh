#!/usr/bin/env bash

nix-shell -p 'python3.withPackages(ps: with ps; [ mutagen ])'
