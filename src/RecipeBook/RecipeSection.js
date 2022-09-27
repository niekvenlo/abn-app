export function RecipeSection({ recipe }) {
  if (!recipe) {
    return "loading";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1em",
        maxWidth: 800,
      }}
    >
      <div>
        <h1 style={{ fontSize: "2.2em", margin: "0.2em 0" }}>
          {recipe["strMeal"]}
        </h1>
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
          src={recipe["strMealThumb"]}
          style={{ width: "min(100%, 400px)", flexGrow: 2 }}
        />
        {getIngredients(recipe)}
        {getInstructions(recipe)}
        {recipe["strSource"] && (
          <small>
            From:{" "}
            <a href={recipe["strSource"]} target="_blank">
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
    <p style={{ whiteSpace: "pre-line" }}>
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
    <div
      style={{
        flexGrow: 1,
        maxWidth: "600px",
        paddingTop: "1em",
      }}
    >
      <div
        style={{
          border: "1.5px solid var(--abn-light-green)",
          boxShadow: "4px 4px 1px var(--abn-light-yellow)",
          padding: "1em",
          margin: "1em",
        }}
      >
        <h3
          style={{
            background: "var(--abn-light-green)",
            color: "white",
            margin: "0.2em 0 -1em 0",
            transform: "translateY(-150%)",
            padding: "0.1em 1em 0.1em 1em",
            width: "fit-content",
          }}
        >
          Ingredients
        </h3>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {ingredients.map((_, idx) => (
            <li key={ingredients[idx]}>
              <span>{ingredients[idx]}</span>{" "}
              <span style={{ fontStyle: "italic" }}>({measures[idx]})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function getTags(recipe) {
  const tags = recipe["strTags"]?.split(/, ?/).filter((o) => o);
  if (!tags || tags.length < 1) {
    return null;
  }
  return (
    <ul style={{ listStyle: "none", margin: "0 0 0.5em 0", padding: 0 }}>
      {tags?.map((tag) => (
        <li
          key={tag}
          style={{
            background: "var(--abn-light-yellow)",
            display: "inline",
            fontSize: "0.8em",
            margin: "0.2em",
            padding: "0.2em",
          }}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
