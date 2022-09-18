import ZX9Card from "./zx9HomepageCard";
import ZX7Card from "./zx7HomepageCard";
import YX1Card from "./yx1HomepageCard";
import yx1Mobile from "./assets/home/mobile/image-earphones-yx1.jpg";
import yx1Tablet from "./assets/home/tablet/image-earphones-yx1.jpg";
import yx1Desktop from "./assets/home/desktop/image-earphones-yx1.jpg";
import { useMediaQuery } from "react-responsive";
import "./_styles/productDisplay.css";

const ProductDisplay = (): JSX.Element => {
    const isMobile = useMediaQuery({ maxWidth: 480 });
    const isTablet = useMediaQuery({ maxWidth: 824 });

    return (
        <section className="product-display">
            <ZX9Card />
            <ZX7Card />
            <div className="yx1">
                <img
                    src={
                        isMobile ? yx1Mobile : isTablet ? yx1Tablet : yx1Desktop
                    }
                />
                <YX1Card />
            </div>
        </section>
    );
};

export default ProductDisplay;
