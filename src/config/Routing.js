import { Routes, Route } from "react-router-dom";

import Home from "../containers/Home";
import FillerPage from "../containers/FillerPage";
import Login from "../containers/Login";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/filler-page" element={<FillerPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Routing;
