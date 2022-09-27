import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecipeBook } from "./RecipeBook/RecipeBook";
import { defaultQueryFunction } from "./lib/defaultQueryFunction";
import "./App.css";

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
