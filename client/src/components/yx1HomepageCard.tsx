import yx1Mobile from './assets/home/mobile/image-earphones-yx1.jpg';
import yx1Tablet from './assets/home/tablet/image-earphones-yx1.jpg';
import yx1Desktop from './assets/home/desktop/image-earphones-yx1.jpg';
import { useMediaQuery } from 'react-responsive';

import Button from './button';

import './_styles/yx1HomepageCard.css'

const YX1Card = (): JSX.Element => {
    const isMobile = useMediaQuery({ maxWidth: 480 });
    const isTablet = useMediaQuery({ maxWidth: 824 });

    return (
        <section className="yx1-card">
            <div>
                <img src={isMobile ? yx1Mobile : isTablet ? yx1Tablet : yx1Desktop} />
                <div>
                    <div>YX1 EARPHONES</div>
                    <Button 
                        buttonLabel='SEE PRODUCT'
                        buttonColor='transparent'
                    />
                </div>
            </div>
        </section>
    )
}

export default YX1Card;