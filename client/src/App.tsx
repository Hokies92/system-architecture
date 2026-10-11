import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Wiki from "@/pages/wiki";
import Stepwise from "@/pages/stepwise";
import NewSystem from "@/pages/new-system";
import SavedSystems from "@/pages/saved-systems";
import Encapsulator from "@/pages/encapsulator";
import Modulator from "@/pages/modulator";
import Ingestion from "@/pages/ingestion";

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/">
        {user ? <Dashboard /> : <Login />}
      </Route>
      <Route path="/dashboard">
        {user ? <Dashboard /> : <Redirect to="/" />}
      </Route>
      <Route path="/wiki">
        {user ? <Wiki /> : <Redirect to="/" />}
      </Route>
      <Route path="/stepwise">
        {user ? <Stepwise /> : <Redirect to="/" />}
      </Route>
      <Route path="/new-system">
        {user ? <NewSystem /> : <Redirect to="/" />}
      </Route>
      <Route path="/saved-systems">
        {user ? <SavedSystems /> : <Redirect to="/" />}
      </Route>
      <Route path="/encapsulator">
        {user ? <Encapsulator /> : <Redirect to="/" />}
      </Route>
      <Route path="/modulator">
        {user ? <Modulator /> : <Redirect to="/" />}
      </Route>
      <Route path="/ingestion">
        {user ? <Ingestion /> : <Redirect to="/" />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
