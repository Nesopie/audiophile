import HamburgerIcon from "./assets/shared/tablet/icon-hamburger.svg";
import CartIcon from './assets/shared/desktop/icon-cart.svg'
import './_styles/header.css';

const Header = () => {
    return (
        <header>
            <div>
                <img src={HamburgerIcon} />
            </div>
            <h1>audiophile</h1>
            <div>
                <img src={CartIcon} />
            </div>
        </header>
    )    
}

export default Header;