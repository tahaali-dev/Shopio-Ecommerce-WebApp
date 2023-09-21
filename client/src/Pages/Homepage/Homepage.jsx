import Navbar from "../../Components/Navbar/Navbar";
import ImageSlider from "../../Components/Slider/ImageSlider";
import Category from "../../Components/categories/Category";
import Footer from "../../Components/footer/Footer";
import CardSection from "../../Components/CardSection/CardSection.jsx"

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="min-height-80">
        <ImageSlider />
        <Category />
        <CardSection/>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
