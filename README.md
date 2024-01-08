# POC AI Sketch

#### Prerequisite

- Node >= v18.12.0

#### Development

```bash
npm i && npm run dev
```

#### Deployment

Sketch drawing using [fabric](https://fabricjs.com/) and required _canvas_ to be installed. By default, binaries for macOS, Linux and Windows will be downloaded.

```bash
npm install --build-from-source
```

If you don't have a supported OS or processor architecture, or you use `--build-from-source`, the module will be compiled on your system. This requires several dependencies, including Cairo and Pango, so you need to install those on the target machine or included to Docker.
