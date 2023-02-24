import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      message: 'Sending cart data...',
      title: 'Sending'
    }));

    const sendRequest = async () => {
      const response = await fetch('https://react-redux-app-db287-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      });
  
      if (!response.ok) {
        throw new Error('Error on send cart items');
      }
    };

    try {
      await sendRequest()
      dispatch(uiActions.showNotification({
        status: 'success',
        message: 'Data successfully saved',
        title: 'Success!'
      }));
    } catch {
      dispatch(uiActions.showNotification({
        status: 'error',
        message: 'It has been error on save data',
        title: 'Error!'
      }));
    }
  }
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch('https://react-redux-app-db287-default-rtdb.firebaseio.com/cart.json')

      if (!response.ok) {
        throw new Error('Error on get data for cart');
      }

      const responseData = await response.json();
      
      return responseData;
    }

    try {
      const fetchedItems = await sendRequest();
      dispatch(cartActions.setFetchedCartData(fetchedItems));
    } catch {
      dispatch(uiActions.showNotification({
        status: 'error',
        message: 'It has been error on fetching data',
        title: 'Error!'
      }));
    }
  }
} 