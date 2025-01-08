"use client";

import React, { useRef, useEffect, useState } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Solicitar acceso a la cámara
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("No se pudo acceder a la cámara: " + err.message);
      }
    };

    getVideo();

    return () => {
      // Detener la transmisión al desmontar el componenetes actuales
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="ventana">
      <h1 className="">Capture Video from Camera</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="600"
        style={{ border: "1px solid black", marginTop: "10px" }}
      ></video>
    </div>
  );
}
