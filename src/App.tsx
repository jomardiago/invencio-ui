import { Suspense } from "react";
import { useRoutes } from "react-router";
import { Loading } from "@carbon/react";
import routes from "~react-pages";
import MainLayout from "./layouts/main/MainLayout";

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>{useRoutes(routes)}</Suspense>
    </MainLayout>
  );
}

export default App;
