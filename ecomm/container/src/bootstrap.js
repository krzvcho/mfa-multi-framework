import { mount as mountProducts } from 'productsApp/ProductsBootstrap';
import { mount as mountCart } from 'cartApp/CartBootstrap';

mountProducts(document.querySelector('#remote-products'));
mountCart(document.querySelector('#remote-cart'));
