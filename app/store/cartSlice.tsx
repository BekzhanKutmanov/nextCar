import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const cartSlice = createSlice({
    name: 'cartState',
    initialState,
    reducers: {
        addCart: (state, action) => {
            console.log(action.payload);
            state.data.push(action.payload);
        },
        removeCart: (state, action) => {
            const updCarts = state.data.filter((product) => product.cart.id != action.payload);
            state.data = [...updCarts];
        }
    }
});

export const {addCart, removeCart} = cartSlice.actions;
export default cartSlice.reducer;