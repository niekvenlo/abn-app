import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function SearchSection({ recipeId, setRecipe, scrollToRecipe }) {
  const [query, setQuery] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "1em",
          background: "var(--abn-light-green)",
          padding: "0.2em",
        }}
      >
        <SetQuery onChange={setQuery} />
      </div>
      <Results
        query={query}
        recipeId={recipeId}
        setRecipe={setRecipe}
        scrollToRecipe={scrollToRecipe}
      />
    </div>
  );
}

function SetQuery({ onChange }) {
  const [query, setQuery] = useState("");
  return (
    <div className="recipe-query">
      <div />
      <input
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key.includes("Enter")) {
            onChange(query);
          }
        }}
        placeholder="e.g. fish"
        type="search"
        value={query}
      />
      <input
        onClick={() => onChange(query)}
        title="search"
        type="submit"
        value="🔍"
      />
    </div>
  );
}

function Results({ query, recipeId, setRecipe, scrollToRecipe }) {
  const { data: matchingRecipes } = useQuery(["search", { s: query }]);
  if (!query) {
    return null;
  }
  return (
    <div className="recipe-search-results">
      {matchingRecipes?.length > 0 ? (
        <ul>
          {matchingRecipes.map((recipe) => (
            <li
              key={recipe["strMeal"]}
              className={recipeId === recipe["idMeal"] ? "selected" : ""}
              onClick={() => {
                scrollToRecipe();
                setRecipe(recipe);
              }}
            >
              <img alt="" src={`${recipe["strMealThumb"]}/preview`} />
              <span>{recipe["strMeal"]}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="recipe-search-results-no-results">
          {matchingRecipes ? `No results for "${query}"` : `Searching...`}
        </div>
      )}
    </div>
  );
}
