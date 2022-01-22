import zx7 from './assets/home/mobile/image-speaker-zx7.jpg'
import Button from './button'

import './_styles/zx7HomepageCard.css'

const ZX7Card = (): JSX.Element => {
    return (
        <section className="zx7-card">
            <div>
                <img src={zx7} />
                <div className="text">
                    <div>ZX7 SPEAKER</div>
                    <Button 
                        buttonLabel='SEE PRODUCT'
                        buttonColor='transparent'
                        handleClick={() => {}}
                    />
                </div>
            </div>
        </section>
    )
}

export default ZX7Card;