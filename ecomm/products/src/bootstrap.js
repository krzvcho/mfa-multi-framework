import faker from 'faker';


export function generateProducts(count = 30) {
    let products = '';
    for (let i = 0; i < count; i++) {
        products += `<div>!!${faker.commerce.productName()}</div>`;
    }
    return products;
}

const mount = (el) => {
    const productsList = generateProducts(30);

    el.innerHTML = productsList;
};

if( process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#dev-products');
    if (el) {
        //probably in isolation
        console.log('Mounting products in dev mode');
        mount(el);
    }
}

export { mount };