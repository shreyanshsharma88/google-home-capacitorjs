import { GoogleContainer } from "./Components";
import { AppThemeProvider } from "./Providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleContainer />
      </QueryClientProvider>
    </AppThemeProvider>
  );
}
export default App;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
