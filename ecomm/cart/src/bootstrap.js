import faker from 'faker';

const mount = (el) => {
    const cartCounter = faker.datatype.number({ min: 1, max: 1024 });
    if (el) {
        el.innerHTML = 'Count: ' + cartCounter;
    }
};

if( process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#cart-dev-root');
    if (el) {
        mount(el);
    }
}

export { mount };
