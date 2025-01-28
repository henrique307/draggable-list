import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState } from "react";
import { Reorder, useDragControls } from "motion/react";

function App() {
  const [emblaActive, setEmblaActive] = useState(true);
  const [itens, setItens] = useState([1, 2, 3, 4, 5, 6]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchSlides: false,
    watchDrag: emblaActive,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  function handleEmblaState() {
    setEmblaActive((state) => !state);
  }

  return (
    <Reorder.Group
      values={itens}
      onReorder={setItens}
      axis="x"
      ref={emblaRef}
    >
      <div className="flex gap-5 select-none">
        {itens.map((item) => (
          <Item item={item} key={item} handleEmblaState={handleEmblaState} />
        ))}
      </div>
      {/* <div
          className="embla__prev absolute top-0 h-full bg-slate-900 opacity-45 w-5"
          onMouseEnter={emblaActive ? undefined : scrollPrev}
        ></div>
        <div
          className="embla__next absolute top-0 h-full bg-slate-900 opacity-45 w-5 right-0"
          onMouseEnter={emblaActive ? undefined : scrollNext}
        ></div> */}
    </Reorder.Group>
  );
}

interface ItemProps {
  item: number;
  handleEmblaState: () => void;
}

function Item({ item, handleEmblaState }: ItemProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
    >
      <div className="m-5 bg-slate-200 rounded-md p-3 aspect-256/383 min-w-[200px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-lg bold">Item {item}</h1>
          <div
            onMouseEnter={handleEmblaState}
            onMouseOut={handleEmblaState}
            className="w-5 h-5 bg-amber-400 cursor-grab reorder-handle"
            onPointerDown={(e) => controls.start(e)}
          />
        </div>
        <article className="text-sm text-gray-800 line-clamp-8 bold">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
          similique incidunt beatae error, impedit sequi omnis eum. Sit
          dignissimos incidunt dolore eveniet magni ratione dolorum, aut
          molestiae, sint accusamus explicabo.
        </article>
      </div>
    </Reorder.Item>
  );
}

export default App;
