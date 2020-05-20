# Velocity Raptor Chrome Extension

## Setup / Running the Extension

* Make sure you have npm installed. If you do not, download [here](https://www.npmjs.com/get-npm).

* From the base directory, install all dependencies using the following

### `npm install`

* Now to run, go ahead and run with the following command:

### `npm start *`

* Now open up Google Chrome, and navigate to [chrome://extensions/](chrome://extensions/)

* On the top-left corner, click "Load Unpacked".
* When prompted, select the directory of the cloned repository
* Now, a raptor icon should appear on the top right corner.
* Click the icon to open the extension!

(Note: Step will fail if the `src/ts` is empty.)

# Development 

### `npm run lint`

It will run ESLint across all the typecript and javascript files found in the root folder that are not whitelisted on `.eslintignore`.

It will run HTMLHint across all the HTML files found in the root folder.

It will run StyleLint (CSS Linter) across all CSS files found in the root folder.

### `npm test`

It will run all the unit tests in the `test` directory. The test files have to end with the extension `(test|spec).(ts|tsx|js)` in order to be picked up by jest.
