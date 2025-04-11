import { useState, useEffect } from "react";

import audio from "../../assets/fiesta.mp3";

const useFiesta = () => {
  const [fiestaMode, setFiestaMode] = useState(false);
  const [fiestaAudio] = useState(new Audio(audio as string));

  useEffect(() => {
    const playAudio = async () => {
      if (fiestaMode) {
        fiestaAudio.loop = true;
        fiestaAudio.volume = 0.2;
        await fiestaAudio.play().catch((error: unknown) => {
          console.error("Error playing audio:", error);
        });
      } else {
        fiestaAudio.pause();
        fiestaAudio.currentTime = 0; // Reset the audio to the beginning
      }
    }

    void playAudio();
  }, [fiestaMode, fiestaAudio]);

  return {
    fiestaMode,
    setFiestaMode,
  }
}

export default useFiesta;