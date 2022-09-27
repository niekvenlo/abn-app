import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function SearchSection({ setRecipe }) {
  const [query, setQuery] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      <div style={{ display: "flex", justifyContent: "end", gap: "1em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1em",
          }}
        >
          <div />
          <SetQuery onChange={setQuery} />
        </div>
      </div>
      <Results query={query} setRecipe={setRecipe} />
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
        style={{ flexGrow: 1, fontSize: "1.2em", margin: "0.1em" }}
      />
      <input
        onClick={() => onChange(query)}
        style={{ flexGrow: 1, fontSize: "1.2em", margin: "0.1em" }}
        type="submit"
      />
    </>
  );
}

function Results({ query, setRecipe }) {
  const { data: matchingRecipes } = useQuery(["search", { s: query }]);
  if (!query) {
    return null;
  }
  return (
    <>
      <p>
        Results for "{query}" {matchingRecipes?.length}
      </p>
      <ul>
        {matchingRecipes?.map((recipe) => (
          <li key={recipe["strMeal"]} onClick={() => setRecipe(recipe)}>
            {recipe["strMeal"]}
          </li>
        ))}
      </ul>
    </>
  );
}
