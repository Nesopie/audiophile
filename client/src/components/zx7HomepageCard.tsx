import zx7Mobile from './assets/home/mobile/image-speaker-zx7.jpg';
import zx7Tablet from './assets/home/tablet/image-speaker-zx7.jpg';
import zx7Desktop from './assets/home/desktop/image-speaker-zx7.jpg';
import Button from './button'
import { useMediaQuery } from 'react-responsive';

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
                    <Button 
                        buttonLabel='SEE PRODUCT'
                        buttonColor='transparent'
                    />
                </div>
            </div>
        </section>
    )
}

export default ZX7Card;