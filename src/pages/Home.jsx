import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchRecipes } from "../api";
import RecipeCard from "../components/RecipeCard";

// keep the last results so going back from details page doesn't lose them
let cache = { query: "", results: [], total: 0 };

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || cache.query);
  const [recipes, setRecipes] = useState(cache.results);
  const [total, setTotal] = useState(cache.total);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(cache.results.length > 0);

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setError("");
    try {
      const data = await searchRecipes(q);
      setRecipes(data.results);
      setTotal(data.totalResults);
      setSearched(true);
      setSearchParams({ q });
      cache = { query: q, results: data.results, total: data.totalResults };
    } catch (err) {
      setError(err.message);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="search-box">
        <h1>Find a recipe</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search recipes, e.g. pasta, chicken, salad..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      {error && <p className="error">{error}</p>}

      {searched && !loading && !error && (
        <p className="muted">
          {recipes.length === 0 ? "No recipes found." : `Showing ${recipes.length} of ${total} results`}
        </p>
      )}

      <div className="grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
