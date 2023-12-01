
import React, { useEffect, useRef } from 'react';
import "./App.css";
import { Music } from "./assets";
import Router from './Router';




function App() {
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.error('Playback failed', e);
      });
    }
  };

  useEffect(() => {
    const eventListener = () => playAudio();
    window.addEventListener('click', eventListener);
    return () => {
      window.removeEventListener('click', eventListener);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} loop src={Music} type="audio/mp3" />
      <Router/>
  
  </>
  );
}

export default App;


// import React, { useEffect, useRef } from 'react';
// import "./App.css";
// import Router from "./Router";
// import { Music } from "./assets";

// function App() {
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.play().catch(e => {
//         console.log('Playback failed:', e);
//       });
//     }
//   }, []);

//   return (
//     <>
//       <audio ref={audioRef} autoPlay loop src={Music} type="audio/mp3" />
//       <Router />
//     </>
//   );
// }

// export default App;

