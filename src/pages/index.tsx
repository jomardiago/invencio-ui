import { useEffect } from "react";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return null;
}

export default HomePage;
