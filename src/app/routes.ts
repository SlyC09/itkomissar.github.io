import { createBrowserRouter, redirect } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Books } from "./pages/Books";
import { Principy } from "./pages/Principy";
import { Post } from "./pages/Post";
import { Sozdayu } from "./pages/Sozdayu";
import { Motiviruju } from "./pages/Motiviruju";
import { Razmyshlyayu } from "./pages/Razmyshlyayu";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "thinking", Component: Razmyshlyayu },
      { path: "creating", Component: Sozdayu },
      { path: "reading", Component: Books },
      { path: "motivating", Component: Motiviruju },
      { path: "principles", Component: Principy },
      { path: "about", Component: About },
      { path: "razmyshlyayu", loader: () => redirect("/thinking") },
      { path: "sozdayu", loader: () => redirect("/creating") },
      { path: "books", loader: () => redirect("/reading") },
      { path: "motiviruju", loader: () => redirect("/motivating") },
      { path: "principy", loader: () => redirect("/principles") },
      { path: ":slug", Component: Post },
      { path: "*", Component: NotFound },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});
