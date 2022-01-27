import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import heroMobile from  './assets/home/mobile/image-header.jpg';
import heroTablet from './assets/home/tablet/image-header.jpg';
import heroDesktop from './assets/home/desktop/image-hero.jpg';

import Button from './button'
import './_styles/carousel.css';

const Carousel = (): JSX.Element => {
    const isMobile = useMediaQuery({maxWidth: 620});
    const isTablet = useMediaQuery({maxWidth: 768});

    return (
        <section className="carousel">
            <div>
                {/* <img src={isMobile ? heroMobile : isTablet ? heroTablet : heroDesktop} /> */}
                <div className="carousel-about">
                    <span id="carousel-text">New product</span>
                    <span id="carousel-product">XX99 Mark II Headphones</span>
                    <span id="carousel-description">Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</span>
                    <Link
                        to={`products/headphones/xx99-mark-two-headphones`}
                    >
                        <Button buttonLabel="SEE PRODUCT" buttonColor="orange" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Carousel;