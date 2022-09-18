import { Link } from "react-router-dom";

import Button from "./button";
import "./_styles/carousel.css";

const Carousel = (): JSX.Element => {
    return (
        <section className="carousel">
            <div>
                <div className="carousel-about">
                    <span id="carousel-text">New product</span>
                    <span id="carousel-product">XX99 Mark II Headphones</span>
                    <span id="carousel-description">
                        Experience natural, lifelike audio and exceptional build
                        quality made for the passionate music enthusiast.
                    </span>
                    <Link to={`products/headphones/xx99-mark-two-headphones`}>
                        <Button
                            buttonLabel="SEE PRODUCT"
                            buttonColor="orange"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Carousel;
