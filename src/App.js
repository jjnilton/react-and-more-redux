import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { useRef } from "react";
import { fetchCartData, sendCartData } from "./store/cart-slice";

function App() {
  const dispatch = useDispatch();
  const cartVisible = useSelector((state) => state.cart.visible);
  const cartChanged = useSelector(state => state.cart.changed);
  const cartItems = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.notification.notification);
  const isInitialMount = useRef(true);

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (cartChanged) {
      dispatch(sendCartData(cartItems))
    }

    
  }, [cartItems, cartChanged, dispatch]);

  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}></Notification>}
    <Layout>
      {cartVisible && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
