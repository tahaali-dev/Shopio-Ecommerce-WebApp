import React, { useState, useEffect } from "react";
import "./Slider.css";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/img1.png", "/img2.png", "/img3.png", "/img4.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 3000);

    // Clear the interval on unmount to prevent memory leaks
    return () => clearInterval(timer);
  }, [currentIndex, images.length]);

  return (
    <div className="image-slider">
      <img src={images[currentIndex]} alt={`Image ${currentIndex}`} />
    </div>
  );
};

export default ImageSlider;
