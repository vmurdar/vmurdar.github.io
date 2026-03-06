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

// 1. Get the raw glob object (which contains the file paths as keys)
const imageModules = import.meta.glob(
  "../assets/carousel/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
) as Record<string, AstroImageModule>;

// 2. Map the entries to an object containing both the src and a cleaned alt string
const images = Object.entries(imageModules).map(([path, mod]) => {
  // Extract filename: "../assets/carousel/my-photo.jpg" -> "my-photo"
  const fileName = path.split('/').pop()?.split('.')[0] || "Carousel image";
  // Clean up: "my-photo" -> "my photo"
  const altText = fileName.replace(/[-_]/g, ' ');

  return {
    src: mod.default.src,
    alt: altText
  };
});

export const Carousel: React.FC = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000 })]
  );

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700">
        <p className="text-zinc-500">
          No images currently in carousel
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
        {images.map((img, index) => (
          <div className="embla__slide flex-[0_0_100%] relative" key={index}>
            <div className="aspect-video bg-zinc-900">
              <img
                src={img.src}
                // FIX: Using the dynamic alt text derived from the filename
                alt={img.alt}
                className="w-full h-full object-contain"
                // Optimization: Eager load the first image for LCP, lazy load others
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};