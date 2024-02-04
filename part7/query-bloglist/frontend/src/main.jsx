import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoggedUserContextProvider } from "./contexts/LoggedUserContext.jsx";
import { NotificationContextProvider } from "./contexts/NotificationContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <LoggedUserContextProvider>
        <App />
      </LoggedUserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
