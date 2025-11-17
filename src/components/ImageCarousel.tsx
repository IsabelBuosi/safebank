interface Props {
  images: string[];
}

export default function ImageCarousel({ images }: Props) {
  return (
    <div className="relative overflow-x-auto flex gap-4 snap-x snap-mandatory pb-4">
      {images.map((img, index) => (
        <div key={index} className="snap-center flex-shrink-0 w-11/12">
          <img
            src={img}
            className="rounded-xl w-full object-cover aspect-video"
          />
        </div>
      ))}
    </div>
  );
}
