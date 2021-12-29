import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger/src";
import cart, {loadCartFromLocalStorage, subscribeToStore} from "./slice/cartSlice";

const buildStore = () => {
    const store = configureStore({
        reducer: {
            cart
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