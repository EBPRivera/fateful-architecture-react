import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import { PersistGate } from "redux-persist/integration/react";

import userReducer from "../features/user";
import guestCharacterReducer from "../features/guestCharacter";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedGuestCharacterReducer = persistReducer(
  persistConfig,
  guestCharacterReducer
);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    guestCharacter: persistedGuestCharacterReducer,
  },
  middleware: [thunk],
});

const persistor = persistStore(store);

const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
