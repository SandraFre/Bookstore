import {createSlice} from "@reduxjs/toolkit";
import {addLocalStorage, getLocalStorage} from "../../storage/localStorage";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const book = action.payload;
            const existingBook = state.find(b => b.id === book.id);
            if (existingBook) {
                existingBook.count++;
            } else {
                book.count = 1;
                state.push(book);
            }
        },
        removeFromCart(state, {payload: id}) {
            return state.filter(b => b.id !== id);
        }
    }
});

let prevCart = [];
const subscribeToStore = (store) =>{
    store.subscribe(()=>{
        const cart = store.getState().cart;
        if (prevCart != cart){
            addLocalStorage('cart', cart);
            prevCart = cart;
        }
    })
}

const loadCartFromLocalStorage=()=>getLocalStorage('cart') || [];

export default cartSlice.reducer;
export const {addToCart, removeFromCart} = cartSlice.actions;
export {subscribeToStore, loadCartFromLocalStorage}