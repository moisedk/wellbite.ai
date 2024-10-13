import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

const DetectBarcode = () => {
  const [image, setImage] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    // Initialize Quagga when component mounts
    if (!scanning) return; // Only initialize when scanning starts
    Quagga.init({
      inputStream: {
        type: "LiveStream",
        target: document.querySelector("#interactive") // target element
      },
      decoder: {
        readers: ["code_128_reader"] // Add more readers as needed
      }
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Quagga initialized");
      Quagga.start();
    });

    // Cleanup function to stop Quagga on component unmount or scanning stop
    return () => {
      if (scanning) {
        Quagga.stop();
      }
    };
  }, [scanning]); // Re-run useEffect when scanning state changes

  const scanBarcode = () => {
    if (!scanning) {
      setScanning(true);
      // You can potentially add logic here to display a message while scanning
    } else {
      setScanning(false);
      Quagga.stop();
    }
  };

  const handleDetectedBarcode = (data) => {
    console.log("Barcode detected:", data);
    // Process the detected barcode data here (e.g., send it to your server)
    setScanning(false); // Stop scanning after detection
  };

  useEffect(() => {
    // Register a listener for detected barcode data when scanning is enabled
    if (scanning) {
      Quagga.onDetected(handleDetectedBarcode);
    } else {
      Quagga.offDetected(handleDetectedBarcode); // Unregister listener when not scanning
    }

    return () => {
      Quagga.offDetected(handleDetectedBarcode); // Cleanup listener on unmount
    };
  }, [scanning]); // Re-run useEffect when scanning state changes

  return (
    <section className="bg-blue-100 place-items-center flex justify-center">
      <div id="interactive" className="w-[20%] h-[20%] border border-gray-600 flex justify-center items-center">
        {scanning ? (
          <p></p>
        ) : (
        <button className="font-futura bg-green-500 px-6 py-4 text-lg text-white rounded-xl" onClick={scanBarcode}>Scan Barcode</button>
        )}
        </div>
    </section>
  );
};

export default DetectBarcode;