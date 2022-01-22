import React from 'react';
import Header from './header';
import Carousel from './carousel';
import ProductCategory from './productCategory';
import ProductDisplay from './productDisplay';
import BestGear from './bestGear';
import Footer from './footer';

import './_styles/homepage.css';

const Homepage = (): JSX.Element => {
    return (
        <div style={{position: "relative"}}>
            <Header category={undefined}/>
            <Carousel />
            <div className="homepage">
                <ProductCategory />
                <ProductDisplay />
                <BestGear />
                <Footer />
            </div>
        </div>
    );
}

export default Homepage;