<div align="center">
    <a href="https://sheldyn.io">
        <img src="https://github.com/k1ddarkn3ss/kd13_quarantine_pok3r/blob/main/src/assets/img/logo-poker.png">
    </a>
</div>
<div align="center">

[![forthebadge](https://forthebadge.com/images/badges/made-with-crayons.svg)](https://forthebadge.com)
<br />
[![Code Grade](https://www.code-inspector.com/project/19696/score/svg)](https://frontend.code-inspector.com/project/19696/dashboard)
![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/k1ddarkn3ss/graphs/commit-activity) [![Website poker.kd13.dev](https://img.shields.io/website-up-down-green-red/http/poker.k1ddarkn3ss.dev.svg)](http://poker.k1ddarkn3ss.dev/) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/k1ddarkn3ss/kd13_quarantine_pok3r/blob/master/LICENSE)
[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/shadow-dimension/community)

</div>

## Folder Structure

    .
    ├── doc                   # Future Documentation
    ├── dist                  # Build Folder
    ├── api                   # NodeJS MongoDB and ExpressJS/Graphql server folder
    ├── src                   # React App - UI Front end logic
    ├── .prettierrc           # Style Logic Please Follow
    ├── .eslintrc             # Code Rules Please Follow
    ├── .babelrc              # Compile Rules
    ├── package.json          # Project Dependencies
    └── README.md             # Please Leave if you don't know what this is

## Developing

### Platforms

| Platform      | Status     |
| ------------- | ---------- |
| Web           | Developing |
| Native Mobile | Pending    |
| Mac OSX       | Pending    |
| Windows       | Pending    |
| Linux         | Pending    |

#### Built With

- [Node JS](https://nodejs.org/en/)
- [GraphQL](http://graphql.org)
- [Express JS](https://expressjs.com/)
- [Socket IO](https://socket.io/)
- [React](https://reactjs.org/)

#### Clone Project

```shell
cd ./someProjectFolder
git clone https://github.com/k1ddarkn3ss/kd13_quarantine_pok3r.git poker_app
```

<!-- ![git clone https://github.com/supunlakmal/thismypc.git](https://raw.githubusercontent.com/supunlakmal/thismypc/master/doc/gifAnimations/gitClone.gif) -->

This Command will copy a full project to your local environment

## React Project

### Setting up Project

```shell
    cd poker_app
    yarn install
```

<!-- ![Setting up Angular Project](https://raw.githubusercontent.com/supunlakmal/thismypc/master/doc/gifAnimations/angularSetup.gif) -->

### Run Express Server

Run `yarn run serve` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

### Run React App

Run `yarn run dev` for a dev app. Navigate to `http://localhost:1234/`. The app will automatically reload if you change any of the source files.

Run `yarn run build-app` for a production app. Navigate to `http://localhost:${env.PORT}/`. The app will not automatically reload if you change any of the source files.

### Web API

| Web API     | URL              | Description |
| ----------- | ---------------- | ----------- |
| Upload File | /api/upload      | -           |
| Reset Stats | /api/stats/reset | -           |

### Web socket IO

| Socket Name          | Socket      | Type | Description |
| -------------------- | ----------- | ---- | ----------- |
| Demo Socket from Web | joinFromWeb | emit | -           |

## Database

MongoDB use as Database.

## Licensing

The MIT License 2021 Sheldyn

[![forthebadge](https://forthebadge.com/images/badges/powered-by-energy-drinks.svg)](https://forthebadge.com)
