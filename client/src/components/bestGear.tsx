import bestGear from './assets/shared/mobile/image-best-gear.jpg'
import './_styles/bestGear.css';

const BestGear = (): JSX.Element => {
    return (
        <section className="best-gear">  
            <img src={bestGear} />
            <article>
                <div>
                    <p>BRINGING YOU THE</p>
                    <p><span>BEST</span> AUDIO GEAR</p>
                </div>
                <div>
                    Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
                    earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
                    rooms available for you to browse and experience a wide range of our products. Stop by our store 
                    to meet some of the fantastic people who make Audiophile the best place to buy your portable 
                    audio equipment.
                </div>
            </article>
        </section>
    )
}

export default BestGear;