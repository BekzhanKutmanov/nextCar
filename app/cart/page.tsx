"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCart } from "../store/cartSlice";
import { deleteCarts, getCarts } from "../servise/api";

export default function Cart() {
    const forCart = useSelector((state) => state.cartState.data);

    const [cart, setCart] = useState(forCart);
    const [totalPrice, setTotalPrice] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        async function getCart() {
            const apiCart = await getCarts();
            if (apiCart) {
                console.log('Верно можно добавлять в корзину');
                // console.log(apiCart);
                const forResponse = [];
                apiCart.forEach((item) => {
                    forResponse.push({ cart: item });
                });
                console.log(forResponse);
                setCart(forResponse);
            } else {
                console.log('результат фалс пока добавлять нельзя');
            }
        }
        getCart();
    }, []);

    useEffect(() => {
        console.log(forCart);
        setCart(forCart);
    }, [forCart]);

    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.cart.price, 0);
        setTotalPrice(total);
    }, [cart]);

    // functions
    function handleDelete(cartId) {
        dispatch(removeCart(cartId));
        deleteCarts(cartId);
    }

    return (
        <>
            <h1>Cart</h1>
            {cart.map((item) => {
                return <div key={item.cart.id} style={{ display: "flex", alignItems: "center", columnGap: "5px", marginBottom: "5px" }}>
                    <div>
                        <div><img style={{ width: '140px' }} src={item.cart.images[0]} alt="carImg" /></div>
                        <div>{item.cart.carName}</div>
                        <div>${item.cart.price}</div>
                        <button
                            style={{ backgroundColor: 'orange' }}
                            onClick={() => handleDelete(item.cart.id)}
                        >Удалить из корзины</button>
                    </div>
                </div>
            })}
            <div>
                <div>
                    price: {totalPrice}
                </div>
                <button>Оформить заказ</button>
            </div>
        </>
    );
};