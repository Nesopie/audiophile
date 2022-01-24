import { useSelector, useDispatch } from 'react-redux';
import { RootState, State, store } from '../index';
import Button from './button';
import CartSummaryItemCounter from './CartSummaryItemCounter';
import { createContext, useContext, useEffect, useState } from 'react';
import './_styles/cartSummary.css';

export const ProductsContext = createContext<any>([]);

const removeCategoryFromName = (name: string): string => {
    if(name.includes("Headphones"))
        return name.replace("Headphones", "");
    if(name.includes("Earphones"))
        return name.replace("Earphones", "");
    if(name.includes("Speakers"))
        return name.replace("Speakers", "");
    return name;
}

const CartSummary = (): JSX.Element => {
    const [ cartProducts, setCartProducts ] = useState<Array<State>>(useSelector((state: RootState) => state));
    const value = { cartProducts, setCartProducts }

    const getTotal = (): number => {
        let total: number = 0;
        cartProducts.forEach((cartProduct: State) => {
            total += (+cartProduct.quantity * +cartProduct.price);
        });

        return total;
    }

    useEffect(() => {
        console.log("hi");
    }, [cartProducts])

    return(
        <ProductsContext.Provider value={value}>
            <div className="cart-summary">
                <div>
                    <h2>CART({cartProducts.length})</h2>
                    <button>Remove all</button>
                </div>
                {cartProducts.map((cartProduct: State, index: number) => {
                    return (
                        <div className='summary-products'>
                            <div>
                                <img src={require(`${cartProduct.imagePath}`)} /> 
                                <div>
                                    <div>{removeCategoryFromName(cartProduct.name)}</div>
                                    <div>$ {cartProduct.price}</div>
                                </div>
                            </div>
                            <CartSummaryItemCounter
                                index={index}
                            />
                        </div>
                    )
                })}
                <div className="total">
                    <div>TOTAL</div>
                    <div>$ {getTotal()}</div>
                </div>
                <Button 
                    buttonLabel="CHECKOUT"
                    buttonColor="orange"
                />
            </div>
        </ProductsContext.Provider>
    );
}

export default CartSummary;