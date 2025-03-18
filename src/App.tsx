import "./App.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  gsap.registerPlugin(useGSAP);

  const square = useRef<HTMLDivElement>(null);
  const home = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: square });

  const onClick = contextSafe(() => {
    if (!home.current) return;
    if (!square.current) return;
    const homeX = home.current.getBoundingClientRect().left;
    const homeY = home.current.getBoundingClientRect().top;
    const squareX = square.current.getBoundingClientRect().left;
    const squareY = square.current.getBoundingClientRect().top;
    gsap.to(square.current, {
      x: (squareX - homeX) * -1,
      y: (squareY - homeY) * -1,
      rotation: "+=180",
    });
  });

  return (
    <>
      <div className="flex justify-around w-svw">
        <div ref={home} className="bg-blue-500 w-24 h-24" />
        <div className="bg-green-500 w-24 h-24" />
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
