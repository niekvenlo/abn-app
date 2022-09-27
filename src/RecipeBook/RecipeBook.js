import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RecipeSection } from "./RecipeSection";
import { SearchSection } from "./SearchSection";

export function RecipeBook() {
  const { data: randomRecipes } = useQuery(["random"]);
  const randomRecipe = randomRecipes?.[0];
  const [recipe, setRecipe] = useState();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyItems: "stretch",
      }}
    >
      <div style={{ flex: 0, backgroundColor: "var(--abn-light-green)" }}>
        <SearchSection setRecipe={setRecipe} />
      </div>
      <div style={{ flex: 1, backgroundColor: "var(--abn-light-yellow)" }}>
        <RecipeSection recipe={recipe || randomRecipe} />
      </div>
    </div>
  );
}
