import { useEffect, Suspense, lazy } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProducts } from "./features/products/productSlice";
import { fetchAllProducts } from "./features/products/fetchProduct";
import { Toaster } from "sonner";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home/Home"));
const Products = lazy(() => import("./pages/Products/Products"));
const ProductDetails = lazy(() =>
  import("./pages/ProductDetails/ProductDetails")
);
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Categories = lazy(() => import("./pages/Categories/Categories"));
const ClaimRefund = lazy(() => import("./pages/ClaimRefund/ClaimRefund"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const Account = lazy(() => import("./pages/Accounts/Account"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const PaymentPage = lazy(() => import("./pages/Checkout/PaymentPage"));
const OrderSuccessPage = lazy(() =>
  import("./pages/Checkout/OrderSuccessPage")
);
const Accessories = lazy(() => import("./pages/Accessories/Accessories"));
const Sell = lazy(() => import("./pages/Sell/Sell"));
const Faq = lazy(() => import("./pages/Faq/Faq"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllProducts();
        console.log("Data coming: ", data);
        dispatch(setProducts(data));
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [dispatch]);

  const location = useLocation();
  const hideHeaderFooterRoutes = ["/cart"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <>
      <Toaster position="bottom-right" />
      {!shouldHideHeaderFooter && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/p/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/c/:category" element={<Categories />} />
          <Route path="/claim_refund" element={<ClaimRefund />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/account" element={<Account />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/accessories" element={<Accessories />} />
        </Routes>
      </Suspense>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
