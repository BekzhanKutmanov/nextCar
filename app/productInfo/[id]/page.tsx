"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts } from "../../servise/api";
import FavoriteButton from "@/app/components/favoriteButton/FavoriteButton";
import CartButton from "@/app/components/cartButton/CartButton";

export default function ProductInfo() {
    const [products, setProducts] = useState([]);
    const [info, setInfo] = useState({});
    const [product, setProduct] = useState({});

    const params = useParams();
    const paramsId = params.id;

    useEffect(() => { // получение массива из сервера
        async function test() {
            const forProducts = await getProducts();
            console.log(forProducts);
            setProducts(forProducts);
        }
        test();
    }, []);

    useEffect(() => {
        console.log(products, paramsId);
        if (paramsId && products.length > 0) {
            console.log('gotovo');
            products.forEach((item) => {
                if (item.id === paramsId) {
                    console.log(item);
                    setProduct(item);
                    const obj = {
                        carName: item.carName,
                        yaer: item.year,
                        color: item.color,
                        price: item.price
                    }
                    setInfo(obj);
                }
            });
        } else {
            console.log("Проблема с получением Ид , массива из сервера");
        }
    }, [products]);

    return (
        <>
            <h1>Product info</h1>

            <div>
                {info?.carName && info.carName}
            </div>
            <div>
                {info?.year && info.year}
            </div>
            <div>
                {info?.color && info.color}
            </div>
            <div>
                {info?.price && info.price}
            </div>
            <FavoriteButton product={product && product}/>
            <CartButton product={product && product}/>
        </>
    );
};