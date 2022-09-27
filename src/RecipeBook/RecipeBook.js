import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { RecipeSection } from "./RecipeSection";
import { SearchSection } from "./SearchSection";

export function RecipeBook() {
  const scrollRef = useRef();
  const { data: randomRecipes } = useQuery(["random"]);
  const randomRecipe = randomRecipes?.[0];

  const [recipe, setRecipe] = useState();

  const scrollToRecipe = () =>
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyItems: "stretch",
      }}
    >
      <div style={{ flex: 0, backgroundColor: "var(--abn-translucent-green)" }}>
        <SearchSection
          recipeId={recipe["idMeal"]}
          setRecipe={setRecipe}
          scrollToRecipe={scrollToRecipe}
        />
      </div>
      <div ref={scrollRef} style={{ flex: 1, backgroundColor: "white" }}>
        <RecipeSection recipe={recipe || randomRecipe} />
      </div>
    </div>
  );
}
