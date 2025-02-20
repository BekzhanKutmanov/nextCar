"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, removeCart } from "@/app/store/cartSlice";
import { addCarts, deleteCarts, getCarts } from "@/app/servise/api";

export default function CartButton({ product }) {
    const isCart = useSelector((state) => state.cartState.data);

    let forCart = false;
    function checkingState() {
        // console.log(isCart);
        isCart.forEach((item) => {
            if (item.cart.id === product.id) {
                forCart = item.fl;
            }
        });
    };
    checkingState();

    const [cartButton, setCartButton] = useState(forCart);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(product);
    }, [product]);

    useEffect(() => {
        checkingState();
    }, [isCart]);

    useEffect(() => {
        setCartButton(forCart);
    }, [forCart]);

    // functions
    function handleCart() {
        const newState = !cartButton;
        setCartButton(!cartButton);
        sendCart(newState);
    }

    async function sendCart(argState) {
        console.log(argState);

        if (argState) {
            console.log('add');

            // if(){

            // }

            dispatch(addCart({ cart: product, fl: argState }));

            try {
                await addCarts(product);
            } catch (err) {
                console.log(`Ошибка при добавлении в корзину ${err}`);
                dispatch(removeCart(product.id));
                await deleteCarts(product.id);
            }
        } else {
            console.log('remowe');
            dispatch(removeCart(product.id));
            deleteCarts(product.id);
        }
    }

    return (
        <>
            <button style={cartButton ? { backgroundColor: 'orange' } : { backgroundColor: 'white' }}
                onClick={handleCart}
            // onClick={() => setCartButton(!cartButton)}
            > {cartButton ? <>Удалить из корзины</> : <>Добавить в корзину</>} </button >
        </>
    )
}