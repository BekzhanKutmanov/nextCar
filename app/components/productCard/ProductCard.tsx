"use client";
import { useState, useEffect } from "react";
import ImageSliders from "../imageSlader/imageSliders";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import FavoriteButton from "../favoriteButton/FavoriteButton";
import CartButton from "../cartButton/CartButton";

export default function ProductCard({ forProduct }) {
    const [product, setProduct] = useState(forProduct);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(forProduct);
        // setProduct(forProduct);
    }, [forProduct]);

    return (
        // <Link href={'/productInfo'} onClick={()=> console.log('hi')
        // }>
        <div style={{
            border: 'solid 1px',
            display: 'flex', flexDirection: 'column',
            marginLeft: '5px',
            padding: '3px'
        }}>
            <ImageSliders images={product.images} />
            <h3>{product.carName}</h3>
            <div>
                <p>{product.price}</p>
                <p>{product.year}</p>
            </div>

            <button onClick={() => {
                router.push(`/productInfo/${product.id}`);
                dispatch(addProductInfo(product.id));
            }}>click</button>
            <FavoriteButton product={product}/>
            <CartButton product={product}/>
        </div>
        // </Link>
    );
};