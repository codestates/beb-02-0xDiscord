# 0XDiscord &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-reques)

0xDiscord is a web3 oriented rewarding community project.

## Requirements 

### ui server
```bash
# npm install
curl -O -L https://npmjs.org/install.sh

# nvm node version manager install (recommend)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# node version 16
nvm install 16
nvm use 16
```

### api server

1. **python install**

    https://www.python.org/downloads/

2. **development environment**

    pip v22.0.3
    python v3.9



## Start

### ui server

```bash
cd ui

npm ci
npm run start


# if you need configuration

cd ui/src/config/config.json
vi config.json
```


### api server


```bash
cd api

## package install
pip insatll -r requirements.txt


## configuration before start
cd api/config

### db configuration
cd api/config
vi db_secrets.json

### web3 configuration
cd api/config
vi web3_secrets.json

## api server start
uvicorn main:app --reload
```

#### api server document

```bash
## server start
uvicorn main:app --reload

## view document open 
open serverurl:port/docs

```


#### Process
![example](https://github.com/codestates/beb-02-0xDiscord/blob/main/examples/example.png)


### License
React is [MIT licensed](./LICENSE)
