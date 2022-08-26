import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import ProductPage from './components/productPage';
import ProductsPage from './components/productsPage';
import Checkout from './components/checkout';
import LoginPage from './components/loginPage';
import './index.css';

import { User } from './types';
import helper from './utils/helper';

const userReducer = (state: User = { username: "", cart: [], token: null }, action: any): User => {
    let newState: User = { username: "", cart: [], token: null };
    switch(action.type) {
        case('SET_USER') :
            newState.username = action.username;
            newState.cart = helper.sanitizeCart(action.cart);
            newState.token = action.token;
            localStorage.setItem('user', JSON.stringify(newState));
            return {...newState}
        case('SET_CART'):
            newState = { ...state };
            if(state.username === "" || !state.username) return state;
            newState.cart = action.cart;
            localStorage.setItem('user', JSON.stringify(newState));
            return {...newState};
        case('SET_USER_LS') :
            newState = action.user;
            return { ...newState };
        case('GET_STATE') :
            return state;
        case('RESET_USER'):
            const resetUser = { username: "", cart: [], token: null };
            localStorage.setItem('user', JSON.stringify(resetUser));
            return resetUser;
        default: 
            return state;
    }
}

export type RootState = ReturnType<typeof userReducer>;

export const store = createStore(userReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <helper.OnLoadWrapper>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/" 
                        element={<App />} 
                    />
                    <Route 
                        path="/products/:category"
                        element={<ProductsPage/>} 
                    />
                    <Route
                        path="/products/:category/:slug"
                        element={<ProductPage />}
                    />
                    <Route 
                        path="/checkout"
                        element={<Checkout />}
                    />
                    <Route 
                        path="/login"
                        element={<LoginPage />}
                    />
                </Routes>
            </BrowserRouter>
        </helper.OnLoadWrapper>
  </Provider>,
  document.getElementById('root')
);