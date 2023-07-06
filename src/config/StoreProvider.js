import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import userReducer from "../features/user";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
