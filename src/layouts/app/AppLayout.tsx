import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useSessionStore from "../../stores/sessionStore";
import { Loading } from "@carbon/react";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { session } = useSessionStore();
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      setIsRendered(true);
    }
  }, [session, navigate]);

  if (!isRendered) return <Loading />;

  return <div>{children}</div>;
}

export default AppLayout;
