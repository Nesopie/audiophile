import cash from "./assets/shared/desktop/cash.svg";

import "./_styles/cashOnDelivery.css";

const CashOnDelivery = (): JSX.Element => {
    return (
        <section className="cash-on-delivery">
            <img src={cash} />
            <article>
                The 'Cash on Delivery' option enables you to pay in cash when
                our delivery courier arrives at your residence. Just make sure
                your address is correct so that your order will not be
                cancelled.
            </article>
        </section>
    );
};

export default CashOnDelivery;
