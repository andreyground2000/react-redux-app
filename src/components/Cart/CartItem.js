import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const dispatchFn = useDispatch();
  const { title, quantity, total, price, id } = props.item;

  const handlePlus = () => {
    dispatchFn(cartActions.addItem({
      id,
      price,
      title,
    }))
  };

  const handleMinus = () => {
    dispatchFn(cartActions.removeItem(id))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleMinus}>-</button>
          <button onClick={handlePlus}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
