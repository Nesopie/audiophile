import { Images, Includes } from "../types";
import Button from "./button";
import ItemCounter from "./itemCounter";
import { useState } from "react";
import { store } from "../index";

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
    gallery: Array<string | undefined>
}): JSX.Element => {
    const [ quantity, setQuantity ] = useState<number>(1);

    const handleAddToCard = () => {
        const newProduct = {
            imagePath: imagePaths.mobile,
            name,
            price,
            quantity
        }

        store.dispatch({
            type: 'ADD',
            newProduct
        });

        console.log(store.getState());
    }

    return (
        <section className="product-overview">
            <div>
                <img src={require(`${imagePaths.mobile}`)}/>
                <div>
                    <div>
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
                    <div>
                        <div>
                            <h3>FEATURES</h3>
                            <p>{ features }</p>
                        </div>
                        <div>
                            <h3>IN THE BOX</h3>
                            <ul>
                                {includes.map((item) => {
                                    return(
                                        <li>
                                            <div id="bullets">{item.quantity}x</div>
                                            <div>{item.item}</div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="gallery">
                        {gallery.map((galleryImage) => {
                            return <img src={require(`${galleryImage}`)} />
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductOverview;