import { useState, useEffect } from "react";

// статья про хук useWindowSize https://usehooks.com/useWindowSize/
export const useWindowSize = () => {

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

// const [width, setWidth] = useState(window, innerWidth);
// useEffect(() => {
//   let timeoutId = null;

//   const resizeListener = () => {
//     clearTimeout(timeoutId);
//     // change width from the state object after 150 milliseconds
//     timeoutId = setTimeout(() => setWidth(window, innerWidth), 150);
//   };
//   window.addEventListener('resize', resizeListener);

//   return () => {
//     window.removeEventListener('resize', resizeListener);
//   };
// }, []);