import { Suspense } from "react";
import { useRoutes } from "react-router";
import { Loading } from "@carbon/react";
import routes from "~react-pages";
import MainLayout from "./layouts/main/MainLayout";
import AppLayout from "./layouts/app/AppLayout";
import ToastNotification from "./common/components/toastNotification/ToastNotification";

function App() {
  return (
    <MainLayout>
      <ToastNotification />
      <AppLayout>
        <Suspense fallback={<Loading />}>{useRoutes(routes)}</Suspense>
      </AppLayout>
    </MainLayout>
  );
}

export default App;
