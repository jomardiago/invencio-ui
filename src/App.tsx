import { Suspense } from "react";
import { useRoutes } from "react-router";
import { Loading } from "@carbon/react";
import routes from "~react-pages";
import MainLayout from "./layouts/main/MainLayout";
import AppLayout from "./layouts/app/AppLayout";

function App() {
  return (
    <MainLayout>
      <AppLayout>
        <Suspense fallback={<Loading />}>{useRoutes(routes)}</Suspense>
      </AppLayout>
    </MainLayout>
  );
}

export default App;
