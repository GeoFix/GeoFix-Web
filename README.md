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
    <img src="https://img.shields.io/github/workflow/status/GeoFix/GeoFix-Web/deploy?label=Deployment" />
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
- 🌐 [Upgrade static geographical data](#-Upgrade-static-geographical-data)
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

## 🌐 Upgrade static geographical data

static geographical data are extracted from openstreetmap, via [http://overpass-turbo.eu/](http://overpass-turbo.eu/)

### project file

You can find in assets :
- _bycicle rent_ : [bicycle_rental.geojson](/GeoFix/GeoFix-Web/blob/master/src/assets/bicycle_rental.geojson)
- _bycicle store_ : [bicycle_repair_station.geojson](/GeoFix/GeoFix-Web/blob/master/src/assets/bicycle_repair_station.geojson)
- _bycicle repair station_ : [store_bicycle.geojson](/GeoFix/GeoFix-Web/blob/master/src/assets/store_bicycle.geojson)

### upgrade data

[http://overpass-turbo.eu/](http://overpass-turbo.eu/) enable to export openStreetMap data to geoJson

For project we focus on
  - ["shop"="bicycle"](https://wiki.openstreetmap.org/wiki/FR:Tag:shop%3Dbicycle)
  - ["amenity"="bicycle_repair_station"](https://wiki.openstreetmap.org/wiki/FR:Tag:amenity%3Dbicycle_repair_station)
  - ["amenity"="bicycle_rental"](https://wiki.openstreetmap.org/wiki/FR:Tag:amenity%3Dbicycle_rental)

For overpass-turbo use a query like :

~~~~
[out:json];
{{geocodeArea:rennes}}->.searchArea;
(
  node["shop"="bicycle"](area.searchArea);
  way["shop"="bicycle"](area.searchArea);
  relation["shop"="bicycle"](area.searchArea);
);
out center;
~~~~

with :
- **rennes** is the city, you can use bretagne for region
- **"shop"="bicycle"** is the type of data to search
  - ["shop"="bicycle"](https://wiki.openstreetmap.org/wiki/FR:Tag:shop%3Dbicycle) for [store_bicycle.geojson](/GeoFix/GeoFix-Web/blob/master/src/assets/store_bicycle.geojson)
  - ["amenity"="bicycle_repair_station"](https://wiki.openstreetmap.org/wiki/FR:Tag:amenity%3Dbicycle_repair_station) for [bicycle_repair_station.geojson](/GeoFix/GeoFix-Web/blob/master/src/assets/bicycle_repair_station.geojson)
  - ["amenity"="bicycle_rental"](https://wiki.openstreetmap.org/wiki/FR:Tag:amenity%3Dbicycle_rental) for [bicycle_rental.geojson](/GeoFix/GeoFix-Web/blob/master/src/assets/bicycle_rental.geojson)
- **out center;** is used to get only point

Then execute with '_Executer_' then use '_Exporter_' and choose '_GeoJSON_' and update the file

## ‍💻 Authors

- Quentin Machard [@qmachard](https://github.com/qmachard)
- Mireille Campourcy - [@mcampourcy](https://github.com/mcampourcy)
- Arnaud Jolly
- Charles Hardy

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details.
