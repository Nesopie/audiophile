import { Gallery, Images, Includes } from "../types";
import { useState } from "react";
import uniqid from 'uniqid';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from "react-redux";

import { store } from "..";
import Button from "./button";
import ItemCounter from "./itemCounter";
import userService from "../services/users";

import './_styles/productOverview.css';

const ProductOverview = ({ 
    imagePaths,
    newProduct,
    name,
    description,
    price,
    features,
    includes,
    gallery
 }: { 
    imagePaths: Images,
    newProduct: Boolean, 
    name: string, 
    description: string,
    price: string, 
    features: string, 
    includes: Array<Includes>,
    gallery: Gallery
}): JSX.Element => {
    const [ quantity, setQuantity ] = useState<number>(1);
    const isMobile = useMediaQuery({ maxWidth: 480 });
    const isTablet = useMediaQuery({ maxWidth: 824 });
    const dispatch = useDispatch();

    const handleAddToCard = () => {
        const newProduct = {
            imagePath: imagePaths.mobile,
            name,
            price,
            quantity
        }
        const cart = store.getState().cart;
        let index = -1;

        cart.forEach((cartItem, idx) => {
            if(cartItem.name === name)
                index = idx;
        });
        index === -1  
        ? dispatch(userService.addCartItem(newProduct))
        : dispatch(userService.changeQuantity(index, quantity));
    }

    let galleryImages = [];
    galleryImages.push(isMobile ? gallery.first.mobile   : isTablet ? gallery.first.tablet   : gallery.first.desktop)
    galleryImages.push(isMobile ? gallery.third?.mobile  : isTablet ? gallery.third?.tablet  : gallery.third?.desktop)
    galleryImages.push(isMobile ? gallery.second?.mobile : isTablet ? gallery.second?.tablet : gallery.second?.desktop)

    return (
        <section className="product-overview">
            <div>
                <div>
                    <div>
                        <img src={require(`${isMobile ? imagePaths.mobile : isTablet ?  imagePaths.tablet : imagePaths.desktop}`)}/>
                        <div className='product-brief'>
                            {newProduct ? <div className="new-product">NEW PRODUCT</div> : null}
                            <h2>{ name }</h2>
                            <p>{ description }</p>
                            <div>$ { price }</div>
                            <div className="product-events">
                                <ItemCounter quantity={quantity} setQuantity={setQuantity}/>
                                <Button 
                                    buttonLabel="ADD TO CART"
                                    buttonColor="orange"
                                    handleClick={handleAddToCard}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="product-about">
                            <h3>FEATURES</h3>
                            <p>{ features }</p>
                        </div>
                        <div className="product-about in-the-box">
                            <h3>IN THE BOX</h3>
                            <ul>
                                {includes.map((item) => {
                                    return(
                                        <li key={uniqid()}>
                                            <div id="bullets">{item.quantity}x</div>
                                            <div>{item.item}</div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="gallery">
                        <div>
                            <img src={require(`${galleryImages[0]}`)}/>
                            <img src={require(`${galleryImages[2]}`)}/>
                        </div>
                            <img src={require(`${galleryImages[1]}`)}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductOverview;