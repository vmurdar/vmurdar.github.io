import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
interface AstroImageModule {
  default: {
    src: string;
    width: number;
    height: number;
    format: string;
  };
}

const imageModules = import.meta.glob(
  "../assets/carousel/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
) as Record<string, AstroImageModule>;

const images: string[] = Object.values(imageModules).map(
  (mod) => mod.default.src
);

export const Carousel: React.FC = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000 })]
  );

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700">
        <p className="text-zinc-500">
          No images found in src/assets/carousel
        </p>
      </div>
    );
  }

return (
  <div
    className="embla overflow-hidden rounded-xl shadow-lg"
    ref={emblaRef}
  >
    <div className="embla__container flex">
      {images.map((src, index) => (
        <div
          className="embla__slide flex-[0_0_100%] relative"
          key={index}
        >
      <div className="aspect-video bg-zinc-900">
        <img
          src={src}
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-contain"
          loading={index === 0 ? "eager" : "lazy"}
        />
      </div>
        </div>
      ))}
    </div>
  </div>
);
};