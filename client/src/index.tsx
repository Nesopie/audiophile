import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import ProductPage from './components/productPage';
import ProductsPage from './components/productsPage';
import Checkout from './components/checkout';
import './index.css'

export type State = {
    imagePath: string;
    name: string;
    price: number;
    quantity: number;
}

const cartReducer = (state: Array<State> = [], action: any) => {
    switch(action.type) {
        case('ADD') :
            return [...state, action.newProduct]
        case('CHANGE_QUANTITY') :
            const newState: Array<State> = state;
            newState[action.index] = {...newState[action.index], quantity: newState[action.index].quantity + action.change};
            console.log(newState);
            return newState;
        case('DELETE') :
            let newerState: Array<State> = state;
            newerState.splice(action.index, 1);
            return newerState;
        default: 
            return state;
    }
}

export type RootState = ReturnType<typeof cartReducer>;

export const store = createStore(cartReducer);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
        <Routes>
            <Route 
                path="/" 
                element={<App />} 
            />
            <Route 
                path="/products/:category"
                element={<ProductsPage />} 
            />
            <Route
                path="/products/:category/:slug"
                element={<ProductPage />}
            />
            <Route 
                path="/checkout"
                element={<Checkout />}
            />
        </Routes>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);