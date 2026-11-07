## Lab 9 - Recipe Finder (Working with APIs in React.js)
Lab description: [https://cpit405.gitlab.io/labs/lab-9/](https://cpit405.gitlab.io/labs/lab-9/)

Search for recipes using the [Spoonacular API](https://spoonacular.com/food-api) and view the details
of each recipe (image, ingredients and instructions).

- `fetch` + `useState` when the user clicks **Search** (`/recipes/complexSearch`)
- `fetch` + `useEffect` when the details page loads (`/recipes/{id}/information`)
- React Router for Home, Recipe details and About pages

### API key
Put your Spoonacular API key in `src/config.js`:
```js
export const API_KEY = "PASTE_YOUR_API_KEY_HERE";
```

Run:
```
npm install
npm run dev
```
