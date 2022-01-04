# cockpit-enclave
[![Cockpit Enclave Build](https://github.com/enclave-networks/cockpit-enclave/actions/workflows/cockpit-enclave-build.yml/badge.svg)](https://github.com/enclave-networks/cockpit-enclave/actions/workflows/cockpit-enclave-build.yml)

Cockpit plugin for Enclave

## Development
After cloning this repo please run the command below to pull the `lib` folder into the `src` directory.

```bash
git fetch --depth=1 https://github.com/cockpit-project/cockpit.git 253; \
git checkout --force FETCH_HEAD -- pkg/lib; \
git reset -- pkg/lib; \
mv pkg/lib src/ && rmdir -p pkg
```

Once you've run the above command you should be able to run `npm run build` and you'll generate a `/dist` folder which can be copied to `.local/share/cockpit/enclave` for testing if you'd like a better experience run `ln -s $PWD /dist ~/.local/share/cockpit/enclave` then you can call `npm run watch` and any change you make will be reflected in cockpit upon refresh.