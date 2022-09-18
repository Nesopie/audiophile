import Header from "./header";
import Footer from "./footer";
import Forms from "./forms";
import CheckoutSummary from "./checkoutSummary";

import "./_styles/checkout.css";

const Checkout = (): JSX.Element => {
    return (
        <div className="checkout-page">
            <Header category="" />
            <div className="checkout-container">
                <Forms />
                <CheckoutSummary>
                    <button
                        type="submit"
                        className={`orange button`}
                        form="checkout"
                    >
                        CONTINUE & PAY
                    </button>
                </CheckoutSummary>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
