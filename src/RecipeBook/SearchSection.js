import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function SearchSection({ recipeId, setRecipeId, scrollToRecipe }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const setCategoryAndResetQuery = (string) => {
    setCategory(string);
    setQuery("");
  };
  const setQueryAndResetCategory = (string) => {
    setCategory("");
    setQuery(string);
  };

  return (
    <div style={{ background: "var(--abn-light-green)" }}>
      <div className="recipe-query">
        <h1
          style={{
            paddingLeft: "0.5em",
            margin: 0,
          }}
        >
          The ABN AMRO Guide to Global Flavours
        </h1>
        <div>
          <input
            onChange={(e) => setQueryAndResetCategory(e.target.value)}
            placeholder="e.g. fish"
            type="search"
            value={query}
          />{" "}
        </div>
      </div>
      <Categories category={category} setCategory={setCategoryAndResetQuery} />
      <Results
        category={category}
        query={query}
        recipeId={recipeId}
        setRecipeId={setRecipeId}
        scrollToRecipe={scrollToRecipe}
      />
    </div>
  );
}

function Categories({ category, setCategory }) {
  const { data: categories } = useQuery(["list", { c: "list" }]);
  const categoryStrings = categories?.map((cat) => cat["strCategory"]) ?? [];

  return (
    <div className="recipe-categories">
      {categoryStrings.map((cat) => (
        <button
          className={category === cat ? "selected" : ""}
          key={cat}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function Results({ category, query, recipeId, setRecipeId, scrollToRecipe }) {
  const { data: matchingQuery = [] } = useQuery(["search", { s: query }]);
  const { data: matchingCategory = [] } = useQuery(["filter", { c: category }]);
  if (!query && !category) {
    return null;
  }
  const results = [...matchingCategory, ...matchingQuery];
  return (
    <div className="recipe-search-results">
      {results?.length > 0 ? (
        <ul>
          {results.map((recipe) => (
            <li
              key={recipe["strMeal"]}
              className={recipeId === recipe["idMeal"] ? "selected" : ""}
              onClick={() => {
                scrollToRecipe();
                setRecipeId(recipe["idMeal"]);
              }}
            >
              <img alt="" src={`${recipe["strMealThumb"]}/preview`} />
              <span>{recipe["strMeal"]}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="recipe-search-results-no-results">
          {results ? `No results for "${query}"` : `Searching...`}
        </div>
      )}
    </div>
  );
}
