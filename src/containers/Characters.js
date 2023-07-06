import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuthorized from "../hooks/useAuthorized";

const Characters = () => {
  const isAuthorized = useAuthorized();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      console.log("User has missing token and id");
      navigate("/");
    }
  });

  return (
    <div id="characters">
      <h1>Characters Page</h1>
    </div>
  );
};

export default Characters;
