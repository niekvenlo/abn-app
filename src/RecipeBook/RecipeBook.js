import { useQuery } from "@tanstack/react-query";
import { RecipeSection } from "./RecipeSection";
import { SearchSection } from "./SearchSection";

export function RecipeBook() {
  const { data } = useQuery(["random"]);
  const displayRecipe = data?.[0];
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
        <SearchSection />
      </div>
      <div style={{ flex: 1, backgroundColor: "var(--abn-light-yellow)" }}>
        <RecipeSection recipe={displayRecipe} />
      </div>
    </div>
  );
}
