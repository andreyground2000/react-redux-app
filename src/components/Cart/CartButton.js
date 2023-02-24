import { uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const dispatchFn = useDispatch();

  const toggleButton = () => {
    dispatchFn(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleButton}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQty}</span>
    </button>
  );
};

export default CartButton;
