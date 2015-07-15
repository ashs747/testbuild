## Setup
- `npm install`
- 'gulp'

## Test
- `npm test`

## The differences we need to be aware of in terms of code structure
- The config is now a normal JS module instead of a global
- Better separation of code:
    - `model` folder for reusable model logic in pure JS
    - Dedicated vendor specific folders e.g. A `react` folder for all React specific components, a `reflux` folder for stores and actions

## The differences we need to be aware of when coding
- Unit testing. We're using:
    - Mocha - the testing framework that allows us to define the test suites which it then finds and executes
    - Chai - the assertion library which executed the actual tests
    - jsdom - a tool for DOM simulation (rendering to a fake DOM to check the outcome)
    - Rewire for mocking
- We need to stop using jQuery completely, that means using:
    - A separate standalone NPM module for ajax requests instead of $.ajax
    - ES6 promises instead of $.Deferred
    - ES6 Object.assign instead of $.extend
- We need to use all available ES6 features. More notably:
    - Swapping out the Node.js (CommonJS) style of loading modules (i.e. JS files loading other JS files) with using ES6 imports
    - Using classes where applicable, such as with React components
