"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "@/app/store/favoriteSlice";
import { addFavorites, deleteFavorites } from "@/app/servise/api";

export default function FavoriteButton({ product }) {
    const isFavorite = useSelector((state) => state.favoriteState.data);

    let forFvr = true;
    function stateEvent() {
        isFavorite.forEach((item) => {
            if (item.obj.id === product.id) {
                forFvr = item.fl;
            }
        });
    }
    stateEvent();

    const [favoriteFl, setFavoriteFl] = useState(forFvr);
    const [fvrStyle, setFvrStyle] = useState(favoriteFl ? { color: 'white', text: 'Добавить в избранное' } : { color: 'green', text: 'Удалить из избранног' });

    const dispatch = useDispatch();

    useEffect(() => {
        stateEvent();
    }, [isFavorite]);

    useEffect(() => {
        setFavoriteFl(forFvr);
    }, [forFvr]);

    useEffect(() => {
        setFvrStyle(favoriteFl ? { color: 'white', text: 'Добавить в избранное' } : { color: 'green', text: 'Удалить из избранног' });
    }, [favoriteFl]);

    function handleFavorite() {
        // console.log(product);
        setFavoriteFl(!favoriteFl);

        if (favoriteFl) {
            console.log('add');
            dispatch(addFavorite({ obj: product, fl: !favoriteFl }));
            addFavorites(product);
        } else {
            console.log('remowe');
            deleteFavorites(product.id);
            dispatch(removeFavorite(product.id));
        }
    }

    return (
        <>
            <button style={{ backgroundColor: fvrStyle.color }}
                onClick={handleFavorite}>
                {fvrStyle.text}
            </button>
        </>
    );

};