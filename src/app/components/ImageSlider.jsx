"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"


const images = [
  "/img1.png",
  "/img2.png",
  "/img3.png",
  "/img4.png",
  "/img5.png",
  "/img6.png",
];

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const ImageSlider = () => { 
  gsap.registerPlugin(ScrollTrigger)
   useGSAP(() => {
    gsap.from([".slider"], {
      y: 100,
      // scale:0.7,
      opacity: 0,
      duration: 1,
      
      scrollTrigger:{
        trigger:".slider",
        scroller:"body"
      }
    });
  }, []);
  return (
  <div className="slider max-w-screen-xl mx-auto px-4 pb-5">
  <Slider {...settings}>
    {images.map((src, i) => (
      <div key={i} className="px-2">
        <img
          src={src}
          alt={`slide-${i}`}
          className="w-full h-20 sm:h-20 md:h-20 object-cover rounded-xl"
        />
      </div>
    ))}
  </Slider>
</div>
);
}

export default ImageSlider;
