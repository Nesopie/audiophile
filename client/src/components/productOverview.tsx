import { Gallery, Images, Includes, User } from "../types";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Button from "./button";
import ItemCounter from "./itemCounter";
import userService from "../services/users";
import { store } from "..";

import "./_styles/productOverview.css";

const ProductOverview = ({
    imagePaths,
    newProduct,
    name,
    description,
    price,
    features,
    includes,
    gallery,
}: {
    imagePaths: Images;
    newProduct: Boolean;
    name: string;
    description: string;
    price: string;
    features: string;
    includes: Array<Includes>;
    gallery: Gallery;
}): JSX.Element => {
    const [quantity, setQuantity] = useState<number>(1);
    const isMobile = useMediaQuery({ maxWidth: 480 });
    const isTablet = useMediaQuery({ maxWidth: 824 });
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const newProduct = {
            imagePath: imagePaths.mobile,
            name,
            price,
            quantity,
        };

        console.log(store.getState());

        const { cart } = store.getState();
        let index = -1;
        console.log(cart);

        cart.forEach((cartItem, idx) => {
            if (cartItem.name === name) index = idx;
        });

        index === -1
            ? dispatch(userService.addCartItem(newProduct))
            : dispatch(userService.changeQuantity(index, quantity));
    };

    useEffect(() => {
        return () => {
            toast.remove();
        };
    }, []);

    let galleryImages = [];
    galleryImages.push(
        isMobile
            ? gallery.first.mobile
            : isTablet
            ? gallery.first.tablet
            : gallery.first.desktop
    );
    galleryImages.push(
        isMobile
            ? gallery.third?.mobile
            : isTablet
            ? gallery.third?.tablet
            : gallery.third?.desktop
    );
    galleryImages.push(
        isMobile
            ? gallery.second?.mobile
            : isTablet
            ? gallery.second?.tablet
            : gallery.second?.desktop
    );

    return (
        <section className="product-overview">
            <div>
                <div>
                    <div>
                        <img
                            src={require(`${
                                isMobile
                                    ? imagePaths.mobile
                                    : isTablet
                                    ? imagePaths.tablet
                                    : imagePaths.desktop
                            }`)}
                            alt="main product"
                        />
                        <div className="product-brief">
                            {newProduct ? (
                                <div className="new-product">NEW PRODUCT</div>
                            ) : null}
                            <h2>{name}</h2>
                            <p>{description}</p>
                            <div>$ {price}</div>
                            <div className="product-events">
                                <ItemCounter
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                />
                                <Button
                                    buttonLabel="ADD TO CART"
                                    buttonColor="orange"
                                    handleClick={handleAddToCart}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="product-about">
                            <h3>FEATURES</h3>
                            <p>{features}</p>
                        </div>
                        <div className="product-about in-the-box">
                            <h3>IN THE BOX</h3>
                            <ul>
                                {includes.map((item) => {
                                    return (
                                        <li key={uniqid()}>
                                            <div id="bullets">
                                                {item.quantity}x
                                            </div>
                                            <div>{item.item}</div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="gallery">
                        <div>
                            <img
                                src={require(`${galleryImages[0]}`)}
                                alt="gallery 1"
                            />
                            <img
                                src={require(`${galleryImages[2]}`)}
                                alt="gallery 2"
                            />
                        </div>
                        <img
                            src={require(`${galleryImages[1]}`)}
                            alt="gallery 3"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductOverview;
