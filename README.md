# CalamariCrew

## Getting started

Make sure you have npm installed. If you do not, download [here](https://www.npmjs.com/get-npm).

Clone the repository and download dependencies by running
### `npm install`

***

### `npm run build`

It will build the app by compiling the typescript files into javascript files and recursively placing them into the `src/js` directory.

(Note: Step will fail if the `src/ts` is empty.)

### `npm test`

It will run all the unit tests in the `test` directory. The test files have to end with the extension `(test|spec).(ts|tsx|js)` in order to be picked up by jest.