import "./_styles/homepage.css";
import Header from "./header";
import Carousel from "./carousel";
import ProductCategory from "./productCategory";
import ProductDisplay from "./productDisplay";
import BestGear from "./bestGear";

import Footer from "./footer";

const Homepage = (): JSX.Element => {
    return (
        <div
            style={{ position: "relative" }}
            className="page"
        >
            <Header category={undefined} />
            <Carousel />
            <div className="homepage">
                <ProductCategory />
                <ProductDisplay />
                <BestGear />
                <Footer />
            </div>
        </div>
    );
};

export default Homepage;
