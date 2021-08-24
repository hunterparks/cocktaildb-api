# The Cocktail DB API Wrapper

A NodeJS/Express API for The Cocktail DB.

## Running this Project

1. Clone this repository
2. Run `npm install`
3. Run `npm run start`

## Developing this Project

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`

For tests/coverage, run: `npm run test`

## Future Enhancements

* 🔐 Authentication
* 🔤 Error localization
* 🚗 Rate/speed limiting
* 💫 Allow multi-dimensional filtering
* 🧼 Parameter/query sanatization
* 🕵️‍♂️ Provide pagination limit/skip in response
* 🔽 Download/reorganize The Cocktail DB data
    * 🔀 Get random cocktails from local store
    * 💹 Track popular cocktails (not implemented)
    * 🆕 Track latest cocktails (not implemented)
    * 🥫 More robust storage of custom cocktails
* 💵 Cache calls to The Cocktail DB
* 🧪 Test 'sad' paths for API
* 👨‍💻 ESLINT for enforcing coding standards
* 📓 CI/CD - run tests, report coverage

## Key Technologies

* NodeJS/Express (Runtime/API framework)
* Swagger/OpenAPI (API Documentation)
* Testing
    * Mocha (Test framework)
    * Chai (Assertion framework)
    * Instanbul (nyc - Mocha coverage tool)

## Implementation

### API Wrapper

Base URL: `http://localhost:5000/api/json/v1`

* `/cocktails`
    * `?q=<name>` Search cocktail by name
    * `/<id>` Lookup fill cocktail details by id
        * `/preview` Drink thumbnails (100x100 pixels)
    * `/random` Lookup a random cocktail
        * `/<count>` Lookup a selection of up to 100 random cocktails
    * `?firstLetter=a` List all cocktails by first letter
    *  `?ingredients=Gin` or `?ingredients=Vodka,Dry_Vermouth` Search by ingredient (supports CSL)
    * `?type=Alcoholic` or `?type=Non_Alcoholic` Filter by alcoholic
    * `?category=Ordinary_Drink` or `?category=Cocktail` Filter by Category
    * `?glass=Cocktail_glass` or `?glass=Champagne_flue` Filter by glass
* `/ingredients` List the ingredients
    * `?q=<name>` Search ingredient by name
    * `/id` Lookup ingredient by id
        * `/preview` Ingredient thumbnails (700x700 pixels)
            * `/small` (100x100 pixels)
            * `/medium` (350x350 pixels)
* `/categories` List the categories
* `/glasses` List the glasses
* `/alcoholic_filters` List the alcoholic filters
* `/custom_cocktails`
    * `GET` List all custom cocktails
    * `POST` Create a new custom cocktail
        * `{ "name": "New cocktail", "ingredients": [ "one", "two" ]}`
    * `/<id>`
        * `GET` List specific custom cocktail by id
        * `PUT` Update a custom cocktail
            * `{ "name": "New name" }`
            * `{ "ingredients": [ "one", "two", "new three" ]}`
        * `DELETE` Delete a custom cocktail

📝 _Note_: More documentation details can be found at `/docs`

### Stock API

Base URL: `https://www.thecocktaildb.com/api/json/v1/1`
* Search cocktail by name: `/search.php?s=<name>`
* List all cocktails by first letter: `/search.php?f=a`
* Search ingredient by name: `/search.php?i=vodka`
* Lookup full cocktail details by id: `/lookup.php?i=11007`
* Lookup ingredient by ID: `/lookup.php?iid=552`
* Lookup a random cocktail: `/random.php`
* Search by ingredient: `/filter.php?i=Gin` or `/filter.php?i=Vodka`
* Filter by alcoholic: `/filter.php?a=Alcoholic` or `/filter.php?a=Non_Alcoholic`
* Filter by Category: `/filter.php?c=Ordinary_Drink` or `/filter.php?c=Cocktail`
* Filter by Glass: `/filter.php?g=Cocktail_glass` or `/filter.php?g=Champagne_flute`
* List the categories, glasses, ingredients or alcoholic filters:
    * `/list.php?c=list`
    * `/list.php?g=list`
    * `/list.php?i=list`
    * `/list.php?a=list`
* Drink thumbnails
    * Add /preview to the end of the cocktail image URL:
    * `/images/media/drink/vrwquq1478252802.jpg/preview` (100x100 pixels)
* Ingredient Thumbnails
    * `/images/ingredients/gin-Small.png` (100x100 pixels)
    * `/images/ingredients/gin-Medium.png` (350x350 pixels)
    * `/images/ingredients/gin.png` (700x700 pixels)

### Goal

The goal is to create a modern API that displays and interacts with data from [The Cocktail DB](https://thecocktaildb.com/). Using this data, you will create a wrapper API, that abstracts the ability to paginate, cross-ingredient filter, and create new cocktails.

### API Requirements

_Functionality_

* Must clone current API functionalities - filter on category/name/ingredient/etc
* Must allow ... of new cocktails to be delivered to consumers of the API
    * Creation
    * Reading
    * Updating
    * Deletion
* Pagination
* Cross-ingredient filter

_Technical_

* Use latest/relevant backend languages/frameworks/libraries (NodeJS/Express)
* Adhear to common API standard (REST, Graph)
* Must be executable in delivery form
* Use and model further actions off of the API provided at [The Cocktail DB API](https://www.thecocktaildb.com/api.php)

_Testing_

* Should have an executable testbed, with some testing code coverage

_Notes_

* Persistence method is up to implementer
* Authentication optional