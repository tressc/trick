import "./App.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  gsap.registerPlugin(useGSAP);

  const square = useRef<HTMLDivElement>(null);
  const home = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLImageElement>(null);
  const front = useRef<HTMLImageElement>(null);

  const { contextSafe } = useGSAP({ scope: square });

  const onClick = contextSafe(() => {
    // if (!home.current) return;
    // if (!square.current) return;
    // const homeX = home.current.getBoundingClientRect().left;
    // const homeY = home.current.getBoundingClientRect().top;
    // const squareX = square.current.getBoundingClientRect().left;
    // const squareY = square.current.getBoundingClientRect().top;
    // gsap.to(square.current, {
    //   x: (squareX - homeX) * -1,
    //   y: (squareY - homeY) * -1,
    //   rotation: "+=180",
    // });

    if (!front.current || !back.current) return;
    const tl = gsap.timeline();
    tl.fromTo(
      back.current,
      { rotationY: 0 },
      { rotationY: 90, ease: "power1.easeIn", duration: 0.2 }
    ).fromTo(
      front.current,
      {
        rotationY: -90,
      },
      { rotationY: 0, ease: "power1.easeOut", duration: 0.2 }
    );
  });

  return (
    <>
      <div className="flex justify-around w-svw">
        <div ref={home} className="bg-blue-500 w-24 h-24" />
        {/* <div className="w-[100px] h-[144px] bg-[url(/individuals/club/1_club.png)]" /> */}
        <div className="absolute w-[100px] h-[144px] perspective-normal transform-3d">
          <img
            ref={front}
            className="absolute"
            src="/individuals/club/1_club.png"
            alt="club"
          />
          <img
            ref={back}
            className="absolute"
            src="/individuals/card back/card_back.png"
            alt="card back"
          />
        </div>
        <div className="bg-red-500 w-24 h-24" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <button className="m-5" onClick={onClick}>
          Click me
        </button>
        <div ref={square} className="bg-red-500 w-12 h-12"></div>
      </div>
    </>
  );
}

export default App;
