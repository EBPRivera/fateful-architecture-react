import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Routing from "./config/Routing";
import StoreProvider from "./config/StoreProvider";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <BrowserRouter>
          <NavigationBar />
          <Routing />
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
