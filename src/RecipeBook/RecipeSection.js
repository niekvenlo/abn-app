export function RecipeSection({ recipe }) {
  if (!recipe) {
    return "loading";
  }

  return (
    <div className="recipe-wrapper">
      <div>
        <h1 className="recipe-header">{recipe["strMeal"]}</h1>
        {getTags(recipe)}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <img
          alt={recipe["strMeal"]}
          className="recipe-hero-image"
          src={recipe["strMealThumb"]}
        />
        {getIngredients(recipe)}
        {getInstructions(recipe)}
        {recipe["strSource"] && (
          <small className="recipe-source">
            From:{" "}
            <a href={recipe["strSource"]} target="_blank" rel="noreferrer">
              {recipe["strSource"]}
            </a>
          </small>
        )}
      </div>
    </div>
  );
}

function getInstructions(recipe) {
  return (
    <p className="recipe-instructions">
      {recipe["strInstructions"].replace(/[\n\r]+/g, "\n\n")}
    </p>
  );
}

function getIngredients(recipe) {
  const entries = Object.entries(recipe).filter((entry) => entry[1]);
  const ingredients = entries
    .filter((entry) => entry[0].includes("strIngredient"))
    .map((entry) => entry[1]);
  const measures = entries
    .filter((entry) => entry[0].includes("strMeasure"))
    .map((entry) => entry[1]);
  return (
    <div className="recipe-ingredients">
      <div className="recipe-ingredients-container">
        <h3 className="recipe-ingredients-header">Ingredients</h3>
        <ul className="recipe-ingredients-list">
          {ingredients.map((_, idx) => (
            <li key={`${ingredients[idx]}${measures[idx]}${idx}`}>
              <span>{ingredients[idx]}</span> <span>({measures[idx]})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function getTags(recipe) {
  const tags = recipe["strTags"]?.split(/, ?/) ?? [];
  const allTags = [recipe["strArea"], recipe["strCategory"], ...tags].filter(
    (o) => o
  );
  if (allTags.length < 1) {
    return null;
  }
  const deduped = [...new Set(allTags)];
  return (
    <ul className="recipe-tags">
      {deduped.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}
