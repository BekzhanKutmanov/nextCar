"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import ProductCard from "../components/productCard/ProductCard";
import Favorite from "../favorites/page";
import Cart from "../cart/page";

export default function ProductList({ list }) {
    const [productList, setProductList] = useState(list);
    const [startState, setStartState] = useState([]);
    const [flStart, setFlStart] = useState(false);

    const [brandSelect, setBrandSelect] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [price, setPrice] = useState({ priceTo: '', priceAfter: '' });
    const [carYear, setCarYear] = useState({ yearTo: '', yearAfter: '' });
    const [filteredResult, setFilteredResult] = useState([]);

    const [visible, setVisible] = useState(false);

    const cartLength = useSelector((state) => state.cartState.data.length);
    const router = useRouter();

    useEffect(() => {
        // console.log(list);
        setProductList(list);
        handleBrand(list);
    }, [list]);

    useEffect(() => { //подготовка к стартовому отображению
        const result = [];
        for (let i = 0; i < list.length && result.length < 6; i++) {
            result.push(list[i]);
        }
        if (startState.length < 6) {
            setStartState(result);
        }
    }, [list]);

    useEffect(() => {
        console.log(filteredResult);
    }, [filteredResult]);

    // functions
    function handleBrand(list) {
        const brands = list.map((item) => {
            return item.carName
        });
        // console.log(brands);
        const uniqBrands = [...new Set(brands)];
        setBrandSelect(uniqBrands);
    }

    // filter
    function filter() {
        setFilteredResult(prev => prev = productList.filter((product) => {
            return checkPrice(product) && checkYear(product) && checkSelected(product);
            // return checkYear(product) && checkSelected(product);
        }));
        setFlStart(true);
    }

    function checkSelected(product) {
        if (!selectedBrand) {
            console.log('brand ne uchavstvuet');
            return true;
        } else {
            console.log('brand uchavstvuet');
            if (product.carName === selectedBrand) {
                return true;
            }
        }
    };

    function checkYear(product) {
        // console.log(carYear.yearTo.length, carYear.yearAfter.length);

        if (carYear.yearTo.length < 1 && carYear.yearAfter.length < 1) {
            console.log('year ne uchavstvuet');
            return true;
        }
        else {
            console.log('year uchavstvuet');
            if (carYear.yearTo?.length < 1 && carYear.yearAfter?.length > 1) {
                if (carYear.yearAfter >= product.year) {
                    return true;
                }
            } else if (carYear.yearAfter?.length < 1 && carYear.yearTo?.length > 1) {
                if (carYear.yearTo <= product.year) {
                    return true;
                }
            } else {
                if (carYear.yearTo <= product.year && carYear.yearAfter >= product.year) {
                    return true;
                }
            }
        }
    };

    function checkPrice(product) {
        // console.log(price.priceTo.length, carYear.priceAfter.length);

        if (price.priceTo.length < 1 && price.priceAfter.length < 1) {
            console.log('price ne uchavstvuet');
            return true;
        }
        else {
            console.log('price uchavstvuet');
            if (price.priceTo?.length < 1 && price.priceAfter?.length > 1) {
                if (price.priceAfter >= product.price) {
                    return true;
                }
            } else if (price.priceAfter?.length < 1 && price.priceTo?.length > 1) {
                if (price.priceTo <= product.price) {
                    return true;
                }
            } else {
                if (price.priceTo <= product.price && price.priceAfter >= product.price) {
                    return true;
                }
            }
        }
    };

    // favorites
    function goToFavorites() {
        router.push('/favorites');
    }

    return (
        <>
            <h1>Интернет магазин</h1>

            <div>
                <button onClick={goToFavorites}>Избранные товары</button>
            </div>

            <div>
                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                >
                    <option value="">Без марки</option>
                    {brandSelect.map((opt, idx) => {
                        return <option key={idx} value={opt}>{opt}</option>
                    })}
                </select>

                <div>
                    <input
                        type="number"
                        placeholder="Цена от 0"
                        value={price?.priceTo}
                        onChange={(e) => {
                            setPrice(prev => ({ ...prev, priceTo: e.target.value }));
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Цена до 0"
                        value={price?.priceAfter}
                        onChange={(e) => {
                            setPrice(prev => ({ ...prev, priceAfter: e.target.value }));
                        }}
                    />
                </div>

                <div>
                    <input
                        type="number"
                        placeholder="Год от 0"
                        value={carYear?.yearTo}
                        onChange={(e) => {
                            setCarYear(
                                prev => ({ ...prev, yearTo: e.target.value })
                            )
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Год до 0"
                        value={carYear?.yearAfter}
                        onChange={(e) => {
                            setCarYear(
                                prev => ({ ...prev, yearAfter: e.target.value })
                            )
                        }}
                    />
                </div>
            </div>
            <button onClick={() => filter()}>Поиск</button>

            {<Favorite />}
            <Button label={`Корзина ${cartLength}`} icon="pi pi-external-link" onClick={() => setVisible(true)} />

            <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                position="right"
                style={{ width: '30vw', backgroundColor: "white" }}
                modal
                pt={{ mask: { style: { backgroundColor: "rgba(0, 0, 0, 0.5)", alignItems: "start" } } }}
            >
                <Cart />
                <Button label="Закрыть" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            </Dialog>

            {
                flStart ?
                    <div style={{ display: 'flex', flexWrap: "wrap" }}> {
                        filteredResult.length > 0 ? filteredResult.map((product) => {
                            return <ProductCard key={product.id} forProduct={product} />
                        }) : <h3>pusto</h3>}</div>
                    :
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}> {
                        startState.length > 0 && startState.map((product) => {
                            return <ProductCard key={product.id} forProduct={product} />
                        })}</div>
            }
        </>
    );
};