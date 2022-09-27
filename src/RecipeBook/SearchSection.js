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
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div />
          <SetQuery onChange={setQuery} />
        </div>
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
    <>
      <input
        type="text"
        value={query}
        placeholder="Enter text to search"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key.includes("Enter")) {
            onChange(query);
          }
        }}
        style={{ flexGrow: 1, fontSize: "1.2em", margin: "0.1em" }}
      />
      <input
        onClick={() => onChange(query)}
        style={{
          flexGrow: 1,
          fontSize: "1.2em",
          margin: "0.1em",
          background: "var(--abn-light-yellow)",
          border: "none",
        }}
        type="submit"
        value="Search"
      />
    </>
  );
}

function Results({ query, recipeId, setRecipe, scrollToRecipe }) {
  const { data: matchingRecipes } = useQuery(["search", { s: query }]);
  if (!query) {
    return null;
  }
  return (
    <div style={{ padding: "1em" }}>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5em",
          justifyContent: "center",
          padding: 0,
        }}
      >
        {matchingRecipes?.map((recipe) => (
          <li
            key={recipe["strMeal"]}
            style={{
              background:
                recipeId === recipe["idMeal"]
                  ? "var(--abn-light-yellow)"
                  : "var(--abn-light-green)",
              border:
                recipeId === recipe["idMeal"]
                  ? "2px solid var(--abn-light-yellow)"
                  : "2px solid var(--abn-light-green)",
              color: "white",
              cursor: "pointer",
              listStyleType: "none",
              width: "100px",
            }}
            onClick={() => {
              scrollToRecipe();
              setRecipe(recipe);
            }}
          >
            <img
              alt=""
              src={recipe["strMealThumb"]}
              style={{ width: "100%" }}
            />
            <span style={{ padding: "0.1em" }}>{recipe["strMeal"]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
