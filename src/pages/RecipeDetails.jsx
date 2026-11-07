import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRecipe } from "../api";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch the recipe when the page loads
  useEffect(() => {
    setLoading(true);
    setError("");
    getRecipe(id)
      .then((data) => setRecipe(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="muted">Loading recipe...</p>;

  if (error) {
    return (
      <div>
        <p className="error">{error}</p>
        <Link to="/">Back to search</Link>
      </div>
    );
  }

  const steps = recipe.analyzedInstructions?.[0]?.steps || [];

  return (
    <article className="details">
      <button className="back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>{recipe.title}</h1>

      <div className="info">
        <span>⏱ {recipe.readyInMinutes} min</span>
        <span>🍽 {recipe.servings} servings</span>
        {recipe.vegetarian && <span>🥦 Vegetarian</span>}
        {recipe.glutenFree && <span>Gluten free</span>}
      </div>

      {recipe.image && <img className="details-img" src={recipe.image} alt={recipe.title} />}

      <div className="details-body">
        <section>
          <h2>Ingredients</h2>
          <ul>
            {recipe.extendedIngredients.map((ing, i) => (
              <li key={`${ing.id}-${i}`}>{ing.original}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Instructions</h2>
          {steps.length > 0 ? (
            <ol>
              {steps.map((s) => (
                <li key={s.number}>{s.step}</li>
              ))}
            </ol>
          ) : recipe.instructions ? (
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
          ) : (
            <p className="muted">No instructions available for this recipe.</p>
          )}
        </section>
      </div>

      {recipe.sourceUrl && (
        <p>
          Source: <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">{recipe.sourceName || recipe.sourceUrl}</a>
        </p>
      )}
    </article>
  );
}
