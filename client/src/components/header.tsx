import { useSelector } from 'react-redux';

import HamburgerIcon from "./assets/shared/tablet/icon-hamburger.svg";
import CartIcon from './assets/shared/desktop/icon-cart.svg'
import './_styles/header.css';
import { RootState } from '../index';

const Header = ({ category }: {category: string | undefined }) => {
    let { quantity }: { quantity: number } = useSelector((state: RootState) => {
        return state.reduce((previous, next) => {
            return {quantity: previous.quantity + next.quantity};
        }, { quantity: 0});
    });

    return (
        <header id={`${category !== undefined? 'black-header': ""}`}>
            <div>
                <div>
                    <img src={HamburgerIcon} />
                </div>
                <h1>audiophile</h1>
                <div className="cart-icon">
                    <img src={CartIcon} />
                    { quantity && quantity > 0 ? <div className="cart-items">{ quantity }</div> : null }
                </div>
            </div>
            { category ? category !== "plain" ? <span>{category.toUpperCase()}</span> : null : null}
        </header>
    );    
}

export default (Header);