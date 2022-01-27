import { useSelector } from 'react-redux';
import { RootState, State } from '../index';
import Button from './button';
import CartSummaryItemCounter from './CartSummaryItemCounter';
import './_styles/cartSummary.css';
import uniqid from 'uniqid'

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
    const cartProducts = (useSelector((state: RootState) => state));

    const getTotal = (): number => {
        let total: number = 0;
        cartProducts.forEach((cartProduct: State) => {
            total += (+cartProduct.quantity * +cartProduct.price);
        });

        return total;
    }

    return(
        <div className="cart-summary hide-cart-summary">
            <div>
                <h2>CART({cartProducts.reduce((previous,next) => {
                    return { quantity: previous.quantity + next.quantity}
                }, { quantity: 0 }).quantity})</h2>
                <button>Remove all</button>
            </div>
            {cartProducts.map((cartProduct: State, index: number) => {
                return (
                    <div className='summary-products' key={uniqid()}>
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
    );
}

export default CartSummary;