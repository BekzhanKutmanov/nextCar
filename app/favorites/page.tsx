"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFavorites, deleteFavorites } from "../servise/api";
import { removeFavorite } from "../store/favoriteSlice";
import { useDispatch } from "react-redux";

export default function Favorite() {
    const localValue = useSelector((state) => state.favoriteState.data);

    const [favorites, setFavorites] = useState(localValue);

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(localValue);
        setFavorites(localValue);
    }, [localValue]);

    useEffect(() => {
        async function getFavorite() {
            const apiFavorites = await getFavorites();
            if (apiFavorites) {
                console.log('Верно можно добавлять');
                // console.log(apiFavorites);
                const forResponse = [];
                apiFavorites.forEach((item) => {
                    forResponse.push({obj:item});
                });
                console.log(forResponse);
                setFavorites(forResponse);
            } else {
                console.log('результат фалс пока добавлять нельзя');
            }
        }
        getFavorite();
    }, []);

    useEffect(() => {
        console.log(favorites);
    }, [favorites]);

    //functions
    function handleDelete(productId){
        dispatch(removeFavorite(productId));
        deleteFavorites(productId);
    }

    return (
        <>
            <h1>Favorite</h1>
            {favorites.map((item) => {
                return <div key={item.obj.id}>
                    <div>{item.obj.carName}</div>
                    <button onClick={() => handleDelete(item.obj.id)}>delete</button>
                </div>
            })}
        </>
    );
};