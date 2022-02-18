type Product = {
    name: string,
    sku: string,
    price: number
}

export const getProduct = function():Product {
    return {
        name: "My Product",
        sku: "ABC123",
        price: 10.99
    }
}

export const getPrice = function():void {}