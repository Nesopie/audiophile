import Header from './header';
import Footer from './footer';
import Forms from './forms';
import CheckoutSummary from './checkoutSummary';

const Checkout = (): JSX.Element => {
    return(
        <div>
            <Header category='plain'/>
            <Forms />
            <CheckoutSummary />
            <Footer />
        </div>
    );
}

export default Checkout;