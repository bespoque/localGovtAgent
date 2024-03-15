import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import SliderContent from "./sliderContent";

export default function Home() {
  const myArray = ["landing", "landing-1", "landing-2", "landing-3"];
  const numberOfLoops = 10;

  const loopOverArray = () => {
    const loops = [];
    for (let i = 0; i < numberOfLoops; i++) {
      const items = myArray.map((item, index) => (
        <p key={index}>
          Item {index + 1}: {item}
        </p>
      ));

      loops.push(
        <div key={i}>
          <h2>Loop {i + 1}:</h2>
          {items}
        </div>
      );
    }
    return loops;
  };

  return (
    <div>
      <Carousel
        autoPlay
        interval={15000}
        infiniteLoop
        showThumbs={false}
        showArrows={false}
        showStatus={false}
      >
        {myArray.map((item, index) => (
          <div key={index} className={`${item} min-h-screen/30`}>
            <SliderContent />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
