import HamburgerIcon from "./assets/shared/tablet/icon-hamburger.svg";
import CartIcon from './assets/shared/desktop/icon-cart.svg'
import './_styles/header.css';

const Header = ({ category }: {category: string | undefined}) => {
    return (
        <header id={`${category !== undefined? 'black-header': ""}`}>
            <div>
                <div>
                    <img src={HamburgerIcon} />
                </div>
                <h1>audiophile</h1>
                <div>
                    <img src={CartIcon} />
                </div>
            </div>
            { category ? <span>{category.toUpperCase()}</span> : null }
        </header>
    )    
}

export default Header;