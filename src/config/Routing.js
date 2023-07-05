import { Routes, Route } from "react-router-dom";

import Home from "../containers/Home";
import FillerPage from "../containers/FillerPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/filler-page" element={<FillerPage />} />
    </Routes>
  );
};

export default Routing;
