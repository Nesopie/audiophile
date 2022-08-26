import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import CartIcon from './assets/shared/desktop/icon-cart.svg'
import CartSummary from './cartSummary';
import { RootState } from '../index';

import './_styles/header.css';

const Header = ({ category }: { category: string | undefined }) => {
    const [ showCart, setShowCart ] = useState<boolean>(false);

    let { quantity, username }: { quantity: number, username: string } = useSelector((state: RootState) => {
        return { quantity: state.cart?.reduce((previous, next) => {
            return { quantity: previous.quantity + next.quantity };
        }, { quantity: 0 }).quantity, username: state.username } || { quantity: 0, username: "" };
    });

    return (
        <header id={`${category !== undefined? 'black-header': ""}`}>
            <div>
                <h1>audiophile</h1>
                <nav>
                    <ul>
                        <Link to="/"><li>HOME</li></Link>
                        <Link to="/products/headphones"><li>HEADPHONES</li></Link>
                        <Link to="/products/speakers"><li>SPEAKERS</li></Link>
                        <Link to="/products/earphones"><li>EARPHONES</li></Link>
                    </ul>
                </nav>
                {
                    username === "" ? 
                        <NavLink 
                            to={`/login`}             
                        >
                            <div>login</div>
                        </NavLink> : 
                        <div className="cart-icon">
                        <img src={CartIcon} onClick={() => setShowCart((prev) => !prev)}/>
                        { quantity && quantity > 0 ? <div className="cart-items">{ quantity }</div> : null }
                        <CartSummary 
                            defaultState={showCart}
                            setShowCart={setShowCart}
                        />
                </div>
                }
            </div>
            { category ? category !== "plain" ? <span>{category.toUpperCase()}</span> : null : null}
        </header>
    );    
}

export default (Header);