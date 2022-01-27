import { useMediaQuery } from 'react-responsive'

import zx9Mobile from './assets/product-zx9-speaker/mobile/image-category-page-preview.png';
import zx9Desktop from './assets/home/desktop/image-speaker-zx9.png';
import Button from './button';

import './_styles/zx9HomepageCard.css';

const ZX9Card = (): JSX.Element => {
    const isMobile = useMediaQuery({ maxWidth: 824});
    const isDesktop = useMediaQuery({ minWidth: 824});

    return (
        <section className='zx9-card'>
            <div>
                <img src={isMobile ? zx9Mobile : zx9Desktop} />
            </div>
            <div className='zx9-card-description'>
                <h1>
                    <div>ZX9</div> <div>SPEAKER</div>
                </h1>
                <div>
                    Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                </div>
                <Button 
                    buttonLabel='SEE PRODUCT' 
                    buttonColor='black'
                />
            </div>
        </section>
    );
}

export default ZX9Card;