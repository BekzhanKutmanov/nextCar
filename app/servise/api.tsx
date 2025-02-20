
export async function getProducts() {
    try {
        const response = await fetch(`https://679e48fa946b0e23c0630932.mockapi.io/cars`)
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log("Ошибка при получении главного массива " + err);
        return [];
    }
};

                        // favorites

export async function addFavorites(product) {
    await fetch(`https://679e48fa946b0e23c0630932.mockapi.io/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            product
        )
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log("Ошибка при добавлении избранного товара " + error))
}

export async function deleteFavorites(delId) {
    console.log('Удаление ID:', delId);

    const apiGet = await getFavorites();

    let resultId = '';
    if (apiGet) {
        apiGet.forEach((item) => {
            if (item.id === delId) {
                console.log(item.id);

                resultId = item.productId;
            }
        })
    }

    if (resultId) {
        try {
            const response = await fetch(`https://679e48fa946b0e23c0630932.mockapi.io/favorites/${resultId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Ошибка при удалении: ${response.status}`);
            }

            console.log(`Продукт с ID ${delId} удален`);
        } catch (error) {
            console.error("Ошибка при удалении избранного товара:", error);
        }
    }
}

export async function getFavorites() {
    try {
        const response = await fetch(`https://679e48fa946b0e23c0630932.mockapi.io/favorites`);
        const data = await response.json();
        console.log(`Товар избранных ${data}`);
        return data;
    } catch (error) {
        console.error("Ошибка при получении избранных товаров:", error);
        return [];
    }
}

// carts
export async function addCarts(product) {
    await fetch(`https://67b2ececbc0165def8cf2c8a.mockapi.io/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            product
        )
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log("Ошибка при добавлении в корзину " + error))
}

export async function deleteCarts(delId) {
    console.log('Удаление ID:', delId);

    const apiGet = await getCarts();

    let resultId = '';
    if (apiGet) {
        apiGet.forEach((item) => {
            if (item.id === delId) {
                console.log(item.id);

                resultId = item.productId;
            }
        });
    }

    if (resultId) {
        try {
            const response = await fetch(`https://67b2ececbc0165def8cf2c8a.mockapi.io/cart/${resultId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Ошибка при удалении: ${response.status}`);
            }

            console.log(`Продукт с ID ${delId} удален`);
        } catch (error) {
            console.error("Ошибка при удалении товара в корзине:", error);
        }
    }
}

export async function getCarts() {
    try {
        const response = await fetch(`https://67b2ececbc0165def8cf2c8a.mockapi.io/cart`);
        const data = await response.json();
        console.log(`Корзина ${data}`);
        return data;
    } catch (error) {
        console.error("Ошибка при получении корзины:", error);
        return [];
    }
}