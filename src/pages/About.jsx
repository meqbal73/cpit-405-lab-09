export default function About() {
  return (
    <section className="card">
      <h1>About</h1>
      <p>
        Recipe Finder is a React app made for CPIT-405 Lab 9. It uses the Spoonacular API to search
        for recipes and show their ingredients, instructions and images.
      </p>
      <ul>
        <li><code>/recipes/complexSearch</code> — search recipes (fetch on button click with useState)</li>
        <li><code>/recipes/&#123;id&#125;/information</code> — recipe details (fetch with useEffect on page load)</li>
      </ul>
    </section>
  );
}
