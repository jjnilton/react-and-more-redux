import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const PRODUCTS_DATA = [
  {
    id: 1,
    title: "Product 1",
    description: "Description of the Product 1",
    price: 5.99,
  },
  {
    id: 2,
    title: "Product 2",
    description: "Description of the Product 2",
    price: 6.99,
  },
  {
    id: 3,
    title: "Product 3",
    description: "Description of the Product 3",
    price: 7.99,
  },
];

const Products = (props) => {

  const products = PRODUCTS_DATA.map(product => {
    return <ProductItem id={product.id} title={product.title} price={product.price} description={product.description}></ProductItem>
  })

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products}
      </ul>
    </section>
  );
};

export default Products;
