import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Routing from "./config/Routing";
import StoreProvider from "./config/StoreProvider";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
