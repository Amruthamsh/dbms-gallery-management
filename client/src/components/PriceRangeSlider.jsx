import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../PriceRangeSlider.css";

const PriceRangeSlider = ({ onChange }) => {
  const [priceRange, setPriceRange] = useState([0, 100000]); // Initial price range

  const handleSliderChange = (newRange) => {
    setPriceRange(newRange);
    // Pass the new price range to the parent component or perform any other action
    onChange(newRange);
  };

  return (
    <div className="price-range-slider-container">
      <p>
        Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        <Slider
          className="custom-slider"
          range
          min={1000}
          max={100000}
          step={100}
          defaultValue={priceRange}
          onChange={handleSliderChange}
        />
      </p>
    </div>
  );
};

export default PriceRangeSlider;
