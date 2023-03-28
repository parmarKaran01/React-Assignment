import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./config/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateCard from "./components/CreateCard";
import MainPage from "./components/MainPage";
import EditPage from "./components/EditPage";
import { QueryClient, QueryClientProvider } from "react-query";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "createCard",
        element: <CreateCard />,
      },
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "editCard/:id",
        element: <EditPage />,
      },
    ],
  },
]);

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={appRouter}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </RouterProvider>
      </QueryClientProvider>
    </Provider>
  </>
);
