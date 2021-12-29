import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger/src";
import cart, {loadCartFromLocalStorage, subscribeToStore} from "./slice/cartSlice";
import user from "./slice/userSlice";

const buildStore = () => {
    const store = configureStore({
        reducer: {
            cart, user
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
        preloadedState: {
            cart: loadCartFromLocalStorage()
        }
    });

    subscribeToStore(store);

    return store;
}

const store = buildStore();

export default store;