import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const favoriteSlice = createSlice({
    name: "favoriteState",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            // console.log(action.payload);
            state.data.push(action.payload);
        },
        removeFavorite: (state, action) => {
            // console.log(state);
            const updFavorites = state.data.filter((product)=> product.obj.id != action.payload);
            state.data = [...updFavorites];
        }
    }
});

export const {addFavorite, removeFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;