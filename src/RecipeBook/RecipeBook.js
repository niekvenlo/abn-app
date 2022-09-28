import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { RecipeSection } from "./RecipeSection";
import { SearchSection } from "./SearchSection";

export function RecipeBook() {
  const scrollRef = useRef();
  const scrollToRecipe = () =>
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  const [recipeId, setRecipeId] = useState();

  const { data: randomRecipes } = useQuery(["random"]);
  const randomRecipe = randomRecipes?.[0];

  return (
    <div className="recipe-book">
      <div style={{ flex: 0 }}>
        <SearchSection
          recipeId={recipeId}
          setRecipeId={setRecipeId}
          scrollToRecipe={scrollToRecipe}
        />
      </div>
      <div ref={scrollRef} style={{ flex: 1, minHeight: "100vh" }}>
        <RecipeSection recipeId={recipeId} randomRecipe={randomRecipe} />
      </div>
    </div>
  );
}
