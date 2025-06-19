import { useEffect, Suspense, lazy } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProducts } from "./features/products/productSlice";
import { fetchAllProducts } from "./features/products/fetchProduct";
import { Toaster } from "sonner";

import Header from "./components/Header/Index";
import Footer from "./components/Footer/Index";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home/Index"));
const Products = lazy(() => import("./pages/Products/Index"));
const ProductDetails = lazy(() => import("./pages/ProductDetails/Index"));
const Cart = lazy(() => import("./pages/Cart/Index"));
const Contact = lazy(() => import("./pages/Contact/Index"));
const Categories = lazy(() => import("./pages/Categories/Index"));
const ClaimRefund = lazy(() => import("./pages/ClaimRefund/Index"));
const Blog = lazy(() => import("./pages/Blog/Index"));
const Account = lazy(() => import("./pages/Accounts/Index"));
const Checkout = lazy(() => import("./pages/Checkout/Index"));
const PaymentPage = lazy(() => import("./pages/Checkout/PaymentPage"));
const OrderSuccessPage = lazy(
  () => import("./pages/Checkout/OrderSuccessPage"),
);
const Accessories = lazy(() => import("./pages/Accessories/Index"));
const Sell = lazy(() => import("./pages/Sell/Index"));
const Faq = lazy(() => import("./pages/Faq/Index"));
const Benefits = lazy(() => import("./pages/Benefits/Index"));
const RefurbedProcess = lazy(() => import("./pages/RefurbedProcess/Index"));
const Sustainability = lazy(() => import("./pages/Sustainability/Index"));
const ProductConditions = lazy(() => import("./pages/ProductConditions/Index"));

const App = () => {
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
    location.pathname,
  );

  return (
    <>
      <Toaster position="bottom-right" />
      {!shouldHideHeaderFooter && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/products" element={<Products />} />
          <Route path="/p/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/c/:category" element={<Categories />} />
          <Route path="/claim_refund" element={<ClaimRefund />} />
          <Route path="/blog" element={<Blog CurrentView="list" />} />
          <Route path="/blog/admin" element={<Blog CurrentView="admin" />} />
          <Route path="/account" element={<Account />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/refurbed-process" element={<RefurbedProcess />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/product-conditions" element={<ProductConditions />} />
        </Routes>
      </Suspense>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default App;
