# Accomodation Search

## Techincal Coding Test

This project has a simple setup with an api, hooked up to MongoDB and a frontend piece initiated with create-react-app.

## Install and run

### API

Navigate to the `/api` folder

```
$ cd api
```

Install all dependancies

```
$ yarn install
```

Create a new `.env` file and request the required env vars.

Run the `api` server

```
$ yarn dev
```

_Note: This project uses `yarn`, but if you don't have yarn installed, feel free to use `npm`_

### Client

Navigate to the `/client` folder

```
$ cd api
```

Install all dependancies

```
$ yarn install
```

Run the `client` server

```
$ yarn start
```

_Note: This project uses `yarn`, but if you don't have yarn installed, feel free to use `npm`_

Visit http://localhost:3000

## Task at hand

When the project is up and running, you schould see a search-bar on the screen. This one is currently hooked up to the `/hotels` endpoint.
When you type in a partial string that is part of the name of the hotel, it should appear on the screen.
Ie. type in `resort` and you should see some Hotels where the word `resort` is present.

You will also see 2 headings called **"Countries"** and **"Cities"**.

The assignement is to build a performant way to search for Hotels, Cities or Countries.
Partial searches will be fine. Hotels will need to filterable by location as well.
Ie. The search `uni` should render

- Hotels that are located in the United States, United Kingdom or have the workd `uni` in the hotel name.
- Countries that have `uni` in their name Ie. United States, United Kingdom
- No Cities as there is no match

<img src="./assets/search-example.png" width="400px" />

Clicking the close button within the search field should clear out the field and results.

### Database structure

#### Hotels Collection

```json
[
  {
    "chain_name": "Samed Resorts Group",
    "hotel_name": "Sai Kaew Beach Resort",
    "addressline1": "8/1 Moo 4 Tumbon Phe Muang",
    "addressline2": "",
    "zipcode": "21160",
    "city": "Koh Samet",
    "state": "Rayong",
    "country": "Thailand",
    "countryisocode": "TH",
    "star_rating": 4
  },
  {
    /* ... */
  }
]
```

#### Cities Collection

```json
[
  { "name": "Auckland" },
  {
    /* ... */
  }
]
```

#### Countries Collection

```json
[
  {
    "country": "Belgium",
    "countryisocode": "BE"
  },
  {
    /* ... */
  }
]
```
