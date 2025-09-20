import { useState } from "react";

export default function Hero() {
  const [isVideo, setIsVideo] = useState(true);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dlgdmu6gq/video/upload/v1755532928/wedsite_zqa7ym.webm"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src="https://res.cloudinary.com/dlgdmu6gq/image/upload/v1756795607/5_uvx5wt.jpg"
          alt="Toroland Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Bottom gradient overlay */}
      {/* <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black via-black/70 to-transparent z-5"></div> */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent z-5"></div>

      {/* All Text at Bottom */}
      <div className="absolute bottom-10 w-full flex flex-col items-center text-center text-white z-10 px-4">
        <h1 className="text-xl md:text-3xl font-bold font-primary mb-3 text-secondary">
          Welcome to Toroland Munnar
        </h1>

        {/* Quote */}
        <p className="italic text-md md:text-xl font-secondary text-accent">
          “Awake to whispers of the forest, rest in conscious elegance.”
        </p>
      </div>
    </section>
  );
}
