import ZX9Card from './zx9HomepageCard';
import ZX7Card from './zx7HomepageCard';
import YX1Card from './yx1HomepageCard';
import yx1 from './assets/home/mobile/image-earphones-yx1.jpg';

import './_styles/productDisplay.css';

const ProductDisplay = (): JSX.Element => {
    return (
        <section className='product-display'> 
            <ZX9Card />
            <ZX7Card />
            <img src={yx1} />
            <YX1Card />
        </section>
    );
}

export default ProductDisplay;