import React from "react";
import { Carousel } from "react-responsive-carousel";
import { carousel_img } from "../constants/carouselData";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //built in css
const Carousel_comp = () => {
  return (
    <div className="z-0 relative">
      <Carousel
        autoPlay={true}
        inifiteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {carousel_img.map((img, index) => (
          <img key={index} src={img} alt="carousel image" />
        ))}
      </Carousel>

      {/* fading div */}
      <div className="h-[7vh] bg-[#201e200d] bg-opacity-90" />
    </div>
  );
};

export default Carousel_comp;
