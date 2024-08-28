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

- Team name needs to be at least two characters, otherwise any character is allowed.
- To simplify, I'm using the _timeStarted_ variable of a game as the indentifier. Assuming this is always unique. Because of this, some functions have the option to pass in the timestamp for games, to allow for easy testing
- There's not been written any tests for the svelte components
