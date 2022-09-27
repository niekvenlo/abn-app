export function RecipeSection({ recipe }) {
  if (!recipe) {
    return "loading";
  }
  return (
    <>
      <h1>{recipe["strMeal"]}</h1>
      <p>{recipe["strInstructions"]}</p>
    </>
  );
}
