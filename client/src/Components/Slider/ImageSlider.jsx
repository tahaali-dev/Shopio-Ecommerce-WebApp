import React, { useState, useEffect } from "react";
import "./Slider.css";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ["/thub1.jpg", "/thub2.jpg", "/img3.jpg"];

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 2000);

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
