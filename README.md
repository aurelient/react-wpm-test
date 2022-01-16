# Fork from Max's React Typing Speed WPM Test

Original link: https://maximo-react-wpm-test.netlify.com

## How to use

## Basic component structure

### `App`

State:

- time: Time remaining on typing test
- wordsList: List of words user has to type
- wordsTyped: Number of words user has typed during test
- testActive: boolean condition stating whether test is currently in session
- testLoading: boolean condition stating whether API data is being fetched

While test is active, renders:

- `Timer` component
- `Form` component

While test is fetching data, renders:

- Loader animation

While test is not active, renders:

- Typing speed test rules
- `Start-Button` component
- User's WPM based on most recent test taken

### `Timer`

Props:

- time: Time remaining on typing test

Renders:  
Time remaining on test

### `Form`

Props:

- wordsList: List of words user has to type
- incrementWordsTyped: Function which increments wordsTyped by 1
- wordsTyped: Number of words user has typed during test

State:

- input: Input user has typed in
- wordToType: Current word user has to type to be counted towards wordsTyped
- wordsBefore: All words before the current word that has to be typed
- wordsAfter: All words after the current word that has to be typed

Renders:  
Words to be typed along with current word that must be typed. Also renders the form for the user to type in during the test.

### `Start-Button`

Props:

- startTest: Function to trigger start of test

Renders:
Button which when clicked triggers start of test

## Where do the words come from?

Words are fetched from free, third-party REST API called [Bacon Ipsum](https://baconipsum.com/json-api/).

At the start of each test, the `Start-Button` component calls the `startTest()` function in the `App` component. This sets the state of `App` into a loading state and remains that way until the data has been fetched and formatted properly. Fetch API is used and data fetched is in JSON format.

## What about styling?

SCSS file is converted to CSS using VS Code extension [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass). Loader animation based off of [W3School's loader](https://www.w3schools.com/howto/howto_css_loader.asp)

#

_Taken from Create React App documentation:_

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
