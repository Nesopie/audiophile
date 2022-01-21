import imageHeader from  './assets/home/mobile/image-header.jpg'
import Button from './button'
import './_styles/carousel.css';

const Carousel = (): JSX.Element => {
    return (
        <section className="carousel">
            <div>
                <img src={imageHeader} />
            </div>
            <div className="carousel-about">
                <span id="carousel-text">New product</span>
                <span id="carousel-product">XX99 Mark II Headphones</span>
                <span id="carousel-description">Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</span>
                <Button buttonLabel="SEE PRODUCT" buttonColor="orange"/>
            </div>
        </section>
    );
}

export default Carousel;