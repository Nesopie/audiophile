import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import zx7Mobile from './assets/home/mobile/image-speaker-zx7.jpg';
import zx7Tablet from './assets/home/tablet/image-speaker-zx7.jpg';
import zx7Desktop from './assets/home/desktop/image-speaker-zx7.jpg';
import Button from './button'

import './_styles/zx7HomepageCard.css'

const ZX7Card = (): JSX.Element => {
    const isMobile = useMediaQuery({ maxWidth: 480 });
    const isTablet = useMediaQuery({ maxWidth: 824 });
    
    return (
        <section className="zx7-card">
            <div>
                <img src={isMobile ? zx7Mobile : isTablet ? zx7Tablet : zx7Desktop} />
                <div className="text">
                    <div>ZX7 SPEAKER</div>
                    <Link
                        to="/products/speakers/zx7-speaker"
                    >
                        <Button 
                            buttonLabel='SEE PRODUCT'
                            buttonColor='transparent'
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ZX7Card;