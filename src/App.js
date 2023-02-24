import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendCartData, fetchCartData } from './store/cart-actions';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const dispatchFn = useDispatch();
  const isCartVisible = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatchFn(sendCartData(cart));
  }, [cart, dispatchFn])

  useEffect(() => {
    console.log('fetched')
    dispatchFn(fetchCartData())
  }, [dispatchFn])

  return (
    <>
      {notification && <Notification title={notification.title} message={notification.message} status={notification.status}/>}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
