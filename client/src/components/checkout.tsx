import Header from './header';
import Footer from './footer';
import Forms from './forms';

const Checkout = (): JSX.Element => {
    return(
        <div>
            <Header category='plain'/>
            <Forms />
            <Footer />
        </div>
    );
}

export default Checkout;