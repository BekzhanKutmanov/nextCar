import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoriteReducer from "./favoriteSlice";
import cartReducer from "./cartSlice";

const favoritePersistConfig = {
    key: "favoriteState",
    storage, // localStorage
};

const persistedFavoriteReducer = persistReducer(favoritePersistConfig, favoriteReducer);

const cartPersistConfig = {
    key: "cartState",
    storage, // localStorage
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
    reducer: { 
        favoriteState: persistedFavoriteReducer,
        cartState: persistedCartReducer,
    },
});

export const persistor = persistStore(store);