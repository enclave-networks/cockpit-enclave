# cockpit-enclave
[![Cockpit Enclave Build](https://github.com/enclave-networks/cockpit-enclave/actions/workflows/cockpit-enclave-build.yml/badge.svg)](https://github.com/enclave-networks/cockpit-enclave/actions/workflows/cockpit-enclave-build.yml)

Cockpit plugin for Enclave

## Development
After cloning this repo please run `make` in the repo root to probably build all dev dependencies.

Once you've run `make` you should be able to run `npm run build` and you'll generate a `/dist` folder which can be copied to `.local/share/cockpit/enclave` for testing if you'd like a better experience run `ln -s $PWD /dist ~/.local/share/cockpit/enclave` then you can call `npm run watch` and any change you make will be reflected in the cockpit upon refresh