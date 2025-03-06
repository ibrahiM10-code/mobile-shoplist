export function handleSubtotal(contentArray) {
    let totals = []
    for (let i = 0; i < contentArray.price.length; i++) {
        totals.push(contentArray.price[i] * contentArray.quantity[i]);
    }
    const subTotal = totals.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0);
    return subTotal
}

export function prepNewProduct(content, newProduct) {
    content[0].products.push(newProduct.name);
    content[0].price.push(parseInt(newProduct.price));
    content[0].quantity.push(parseInt(newProduct.quantity));
    const newProductContent = {
        products: content[0].products,
        quantity: content[0].quantity,
        price: content[0].price,
        subTotal: handleSubtotal(content[0]),
    };
    return newProductContent
}
