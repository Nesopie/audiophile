import { useSelector } from 'react-redux';

import HamburgerIcon from "./assets/shared/tablet/icon-hamburger.svg";
import CartIcon from './assets/shared/desktop/icon-cart.svg'
import './_styles/header.css';
import CartSummary from './cartSummary';
import { RootState } from '../index';

const Header = ({ category }: {category: string | undefined }) => {
    let { quantity }: { quantity: number } = useSelector((state: RootState) => {
        return state.reduce((previous, next) => {
            return {quantity: previous.quantity + next.quantity};
        }, { quantity: 0});
    });

    const toggleSummaryDisplay = () => {
        const cartSummary: Element | null = document.querySelector('.cart-summary');
        const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
        const mainDiv = document.querySelector('#root > div');
        if(!cartSummary) return;
        if(cartSummary?.classList.contains('show-cart-summary')) {
            cartSummary.classList.remove('show-cart-summary');
            cartSummary.classList.add('hide-cart-summary');
            if(mainDiv) mainDiv.classList.remove('blur');
        }else {
            cartSummary.classList.remove('hide-cart-summary');
            cartSummary.classList.add('show-cart-summary');
            if(mainDiv) mainDiv.classList.add('blur');
        }
    }

    return (
        <header id={`${category !== undefined? 'black-header': ""}`}>
            <div>
            <div>
                    <img src={HamburgerIcon} />
                </div>
                <h1>audiophile</h1>
                <div className="cart-icon">
                    <img src={CartIcon} onClick={toggleSummaryDisplay}/>
                    { quantity && quantity > 0 ? <div className="cart-items">{ quantity }</div> : null }
                    <CartSummary />
                </div>
            </div>
            { category ? category !== "plain" ? <span>{category.toUpperCase()}</span> : null : null}
        </header>
    );    
}

export default (Header);