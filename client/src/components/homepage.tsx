import React from 'react';
import Header from './header';
import Carousel from './carousel';
import ProductCategory from './productCategory';
import ProductDisplay from './productDisplay';
import BestGear from './bestGear';
import Footer from './footer';

const Homepage = (): JSX.Element => {
    return (
        <div style={{position: "relative"}}>
            <Header />
            <Carousel />
            <ProductCategory />
            <ProductDisplay />
            <BestGear />
            <Footer />
        </div>
    );
}

export default Homepage;