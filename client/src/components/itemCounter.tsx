import './_styles/itemCounter.css';

const ItemCounter = ({ quantity, setQuantity} : { quantity: number, setQuantity: any }): JSX.Element => {
    const increment = () => {
        setQuantity(quantity + 1);
    }

    const decrement = () => {
        if(quantity == 1) return;
        setQuantity(quantity - 1);
    }

    return (
        <div className="item-counter">
            <button onClick={decrement}>-</button>
            <div>{quantity}</div>
            <button onClick={increment}>+</button>
        </div>
    );
}

export default ItemCounter;