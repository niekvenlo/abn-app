import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecipeBook } from "./RecipeBook/RecipeBook";
import "./App.css";

// A default query function allows us to simplify API calls,
// for example:
// - `useQuery(['random'])` to fetch a random recipe (array)
// - `useQuery(['search', {f: 'Pie'}])` to fetch recipes matching the string 'Pie'.
async function defaultQueryFunction({ queryKey }) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${queryKey}.php`
  );
  const data = await response.json();
  return data?.meals ?? [];
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFunction,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeBook />
    </QueryClientProvider>
  );
}

export default App;
