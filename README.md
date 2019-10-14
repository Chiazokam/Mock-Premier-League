# Mock-Premier-League

## Travis
[![Build Status](https://travis-ci.org/Chiazokam/Mock-Premier-League.svg?branch=develop)](https://travis-ci.org/Chiazokam/Mock-Premier-League)

## Coveralls
[![Coverage Status](https://coveralls.io/repos/github/Chiazokam/Mock-Premier-League/badge.svg?branch=develop)](https://coveralls.io/github/Chiazokam/Mock-Premier-League?branch=develop)

## Documentation
[Docs](https://documenter.getpostman.com/view/4451044/SVtTyTu2)

## Heroku
[Heroku Url](https://mock-premier-league0.herokuapp.com/)

## Major Technologies and Frameworks Used
- Node/Express
- MongoDB
- Redis for Web Caching
- Mocha and Chai Library
- Docker for containerization
- Linting with ESLint
- CI with Travis
- Code Coverage Report with Coveralls
- Heroku for deployment

## Setting Up
- [x] Clone this repo with `git clone https://github.com/Chiazokam/Mock-Premier-League`
- [x] cd into the created folder
- [x] `.env.example` contains the data that would be needed in the `.env` file. Fill up the necessary data
- [x] Run `docker-compose up`
- [x] Check out the documentation linked above for all the existing endpoints.
- [x] Following the specification on the docs, send requests to endpoints to view the various responses
- [x] Rate Limiting has been set up to manage requests made to the APIs. Set the maximum number of calls and time interval for calls in the environment variables.
