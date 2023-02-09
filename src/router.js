import Cart from "./Pages/Card";
import Home from "./Pages/Home";
import Order from "./Pages/Order";
import Product from "./Pages/Product";
import ProductInfo from "./Pages/ProductInfo";

const routerList = [
    { label: "Trang chủ", path: "/", element: <Home/> },
    { label: "Cửa hàng",path: "/products", element: <Product/> },
    { path: "/products/productDentail", element: <ProductInfo/> },
    { path: "/card", element: <Cart/>},
    { path: "/order", element: <Order/>},

]

export default routerList