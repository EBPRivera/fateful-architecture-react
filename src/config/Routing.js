import { Routes, Route } from "react-router-dom";

import Characters from "../containers/Characters";
import Home from "../containers/Home";
import FillerPage from "../containers/FillerPage";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import Character from "../containers/Character";
import CharacterNew from "../containers/CharacterNew";
import CharacterEdit from "../containers/CharacterEdit";
import Skills from "../containers/Skills";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/new" element={<CharacterNew />} />
      <Route path="/characters/:name" element={<Character />} />
      <Route path="/characters/:name/edit" element={<CharacterEdit />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/filler-page" element={<FillerPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Routing;
