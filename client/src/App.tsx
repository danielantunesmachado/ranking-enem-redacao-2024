import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SchoolProfile from "./pages/SchoolProfile";
import GeneralAnalysis from "./pages/GeneralAnalysis";
import SchoolComparison from "./pages/SchoolComparison";
import About from "./pages/About";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/escola/:id"} component={SchoolProfile} />
      <Route path={"/analise-geral"} component={GeneralAnalysis} />
      <Route path={"/comparacao"} component={SchoolComparison} />
      <Route path={"/sobre"} component={About} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
