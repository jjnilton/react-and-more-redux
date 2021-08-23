import classes from "./CartButton.module.css";
import { toggleVisibility } from "../../store";
import { useSelector, useDispatch } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const totalItems = items.reduce((a, b) => {
    return a + b.quantity
  }, 0)

  const toggleCartHandler = () => {
    dispatch(toggleVisibility());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
