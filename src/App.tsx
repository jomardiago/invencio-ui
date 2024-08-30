import { Suspense } from "react";
import { useRoutes } from "react-router";
import routes from "~react-pages";
import MainLayout from "./layouts/main/MainLayout";

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
    </MainLayout>
  );
}

export default App;
