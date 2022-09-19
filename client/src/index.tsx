import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";
import ProductPage from "./components/productPage";
import ProductsPage from "./components/productsPage";
import Checkout from "./components/checkout";
import LoginPage from "./components/loginPage";
import "./index.css";
import helper from "./utils/helper";
import { userReducer } from "./reducers/user";

export const store = createStore(userReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <helper.OnLoadWrapper>
            <BrowserRouter basename="/">
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
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                </Routes>
            </BrowserRouter>
        </helper.OnLoadWrapper>
    </Provider>,
    document.getElementById("root")
);
