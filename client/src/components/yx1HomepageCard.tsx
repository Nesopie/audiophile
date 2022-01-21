import yx1 from './assets/home/mobile/image-earphones-yx1.jpg'
import Button from './button';

import './_styles/yx1HomepageCard.css'

const YX1Card = (): JSX.Element => {
    return (
        <section className="yx1-card">
            <div>
                <img src={yx1} />
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