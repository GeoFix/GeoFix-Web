<p align="center">
  <a href="https://github.com/GeoFix/GeoFix-Web">
    <img alt="GeoFix" src="./public/logo512.png" width="60" />
  </a>
</p>

<h1 align="center">
  GeoFix
</h1>

<p align="center">
  Who has never ended up with a punctured wheel, forced to return on foot?<br>
  See the Prototype : <a href="https://geofix-4e08e.firebaseapp.com/" target="_blank">
    https://geofix-4e08e.firebaseapp.com/
  </a>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
  </a>
  <a href="https://github.com/GeoFix/GeoFix-Web/actions">
    <img src="https://img.shields.io/github/workflow/status/GeoFix/GeoFix-Web/Deploy%20to%20Firebase?label=Deployment" />
  </a>
</p>

## ✨ The GeoFix Project

This project uses geocaching philosophy to make available fixing tools for bicycles.

The goal ? To hide and boxes with tiny and useful tools, and provide an app to retrieve and unlock them in case of need.

To discover more about Geocaching philosophy : [Wikipedia](https://en.wikipedia.org/wiki/Geocaching)

## Table of contents

- ✨ [The GeoFix Project](#-the-geofix-project)
- 🚀 [Quick Start](#-quick-start)
- 💫 [Deploy](#-deploy)
- ⚙️ [Available Scripts](#-available-scripts)
- 💻 [Authors](#-authors)
- 📝 [Licence](#-license)

## 🚀 Quick Start

1. Clone the project

    ```bash
    $ git clone https://github.com/GeoFix/GeoFix-Web.git GeoFix
    $ cd GeoFix
    ```

1. Install dependencies

    ```bash
    $ yarn install
    ```
   
1. Configure Firebase

   ```bash
   $ cp .env.dist .env
   ```
   
   Complete informations from your Firebase Application relative to the [Configuration Documentation](https://firebase.google.com/docs/web/setup?authuser=0#config-object)

1. Start your app

    ```bash
    $ yarn start
    ```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## 💫 Deploy

This application is provided by [Firebase](https://firebase.google.com/)

1. Install Firebase CLI

   ```bash
   $ npm install -g firebase-tools
   ```
   
1. Login into Firebase Console

   ```bash
   $ firebase login
   ```
   
1. Initialize Firebase Hosting

   ```bash
   $ firebase init
   ```

1. Build application

   ```bash
   $ yarn build
   ```

1. Deploy application

   ```bash
   $ firebase deploy
   ```

## ⚙️ Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Build application in production mode into `/build` folder

## ‍💻 Authors

- Quentin Machard [@qmachard](https://github.com/qmachard)
- Mireille Campourcy - [@mcampourcy](https://github.com/mcampourcy)
- Arnaud Jolly
- Charles Hardy

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details
