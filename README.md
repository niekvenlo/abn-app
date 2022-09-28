# ABN RECIPE APP

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). By default, this does not support TypeScript, which is a shame. I typically do use TypeScript, but it wasn't really necessary here, so this is pure JSX.

I installed two additional dependencies:

- `npm install @tanstack/react-query`, to manage server state;
- `npm install use-query-params`, to manage query string state in the url. (I did not get around to actually implementing the url state.)

I did not use a CSS-in-JS library, although of course typically I would in practical apps. I liked using Chakra UI, but didn't think it would a good idea to confuse this
project by adding additional dependencies.
I extracted much of the styling to App.css in the end, mostly to remove ugly (and bad) `style={{}}` blocks.

The MealDb API is awful, and I hope ABN internally uses much better interfaces.

I did not include any unit tests in this project. There wasn't really anything _to_ write unit tests for. In practice, I would probably want to use Storybook snapshots to ensure the components remain visually consistent over time.

The RecipeSection Component uses helper functions to generate JSX. These helpers are stateless, but extracting the logic seemed sensible.
The SearchSection Component uses several sub-Components. I did not put these in separate files, as they are relatively small, and will not be reused. But I wouldn't mind extracting if that's preferable.

I didn't really include comments in the code. Mostly because the code doesn't feel finished. I don't have great justifications for some of the decisions I made.

I am _not_ a designer, but I look forward to working with someone is.

Thanks for reading. Have a cookie: 🍪
