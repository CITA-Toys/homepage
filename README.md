# Nervos Webpage

Code of [nervos.org](https://www.nervos.org/)


## Init Project

```bash
bundle
```

## Run project

```bash
yarn start
bundle exec middleman server
```

## Build

```bash
yarn build
bundle exec middleman build
```

you can upload `build` directory to sever and serve it.

## Deploy

```bash
build exec rake build
```

this command will push `build` dir to `build` branch, you can server this branch files.
