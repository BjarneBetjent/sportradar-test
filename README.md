## Run app

- Clone repo
- Install dependencies:
  `npm install`
- Run the dev app:
  `npm run dev`
- To run the unit tests:
  `npm run test:unit`
- Run unit test with coverage:
  `npm run coverage`

## Notes / Assumptions

- Team name needs to be at least two characters
- To simplify, I'm using the _timeStarted_ variable of a game as the indentifier. Assuming this is always unique. Because of this, some functions have the option to pass in the timestamp for games, to allow for easy testing
- Not doing a check for validity of the user input in the score change boxes, assuming the user always enters a valid number
- There's not been written any tests for the svelte components
