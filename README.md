# blogme-ui

## Dev

```
npm start
```


## Build

```
npm run build
cd build && find . -name '*.map' -delete && tar -cJf ../build.xz .
# Copy and extract build.xz to blogme-deploy/data/ui
```
