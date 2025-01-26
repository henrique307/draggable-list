import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { DragControls, Reorder, useDragControls } from "motion/react";

function App() {
  const [emblaActive, setEmblaActive] = useState(true);
  const [itens, setItens] = useState([1, 2, 3, 4, 5, 6]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchSlides: false,
    watchDrag: emblaActive,
  });

  function handleEmblaState() {
    setEmblaActive((state) => !state);
  }

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  return (
    <div>
      <Reorder.Group
        values={itens}
        onReorder={setItens}
        axis="x"
        // className="flex gap-5 select-none"
        ref={emblaRef}
      >
        <div className="flex gap-5 select-none">
          {itens.map((item, index) => (
            <SlideItem value={item} index={index} key={item} />
          ))}
        </div>
      </Reorder.Group>
    </div>
  );
}

function SlideItem({ ...props }: any) {
  const controls = useDragControls();

  return (
    <Reorder.Item {...props} dragListener={false} dragControls={controls}>
      <div className="m-5 bg-slate-200 rounded-md p-3 aspect-256/383 min-w-[200px]">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-lg bold">
            Item {props.value} - index {props.index}
          </h1>
          <div
            // onMouseEnter={handleEmblaState}
            // onMouseOut={handleEmblaState}
            className="w-5 h-5 bg-amber-400 cursor-grab reorder-handle"
            onPointerDown={(e) => {e.preventDefault();controls.start(e)}}
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
