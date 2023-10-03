import Navbar from "../../Components/Navbar/Navbar";
import SlideProducts from "../../Components/SlideProducts/SlideProducts";
import ImageSlider from "../../Components/Slider/ImageSlider";
import Category from "../../Components/categories/Category";
import Footer from "../../Components/footer/Footer";
import ProductSection from "./ProductSection";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="min-height-80">
        <ImageSlider />
        <Category />
        <ProductSection />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
