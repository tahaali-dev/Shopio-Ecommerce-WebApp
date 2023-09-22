import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Layout from "./Components/Layout/Layout";
import Aboutpage from "./Pages/AboutPage/Aboutpage";
import Contactpage from "./Pages/ContactPage/Contactpage";
import PolicyPage from "./Pages/PolicyPage/PolicyPage";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/dashboard/Dashboard";
import ProductPage from "./Pages/ProductPage/ProductPage";
import SingleProductPage from "./Pages/SingleProduct/SingleProductPage";
//Imports ----------------

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<Layout />}>
          <Route path="/aboutpage" element={<Aboutpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allproduct" element={<ProductPage />} />
          <Route path="/singleproduct/:slug" element={<SingleProductPage />} />
          <Route path="/contactpage" element={<Contactpage />} />
          <Route path="/policypage" element={<PolicyPage />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
