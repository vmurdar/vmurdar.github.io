import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface CarouselProps {
  images: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700">
        <p className="text-zinc-500">No images found in public/carousel</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-700 shadow-lg" ref={emblaRef}>
      <div className="flex">
        {images.map((src, index) => (
          <div className="flex-[0_0_100%] min-w-0 relative aspect-video bg-black" key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="block w-full h-full object-contain"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
