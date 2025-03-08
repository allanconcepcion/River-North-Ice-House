import { motion, useAnimation } from "framer-motion";
import useMediaQuery from "utilities/useMediaQuery";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import clsx from "clsx";
import React from "react";

interface CarouselProps {
  className?: string;
  items: any[];
  renderSlide: (item: any, index: number) => JSX.Element;
  arrows?: boolean;
  numNgroups?: number;
}

const Carousel = ({
  className,
  items,
  renderSlide,
  arrows,
  numNgroups,
}: CarouselProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const mathNum = (numNgroups || 1) > 1 ? 2 : 1;

  const controls = useAnimation();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const isEven = items.length % 2 == 0;
  const isOdd = items.length % 2 !== 0;
  let numSlides= 0;
  if (isMobile && isOdd && items.length > 1) {
    numSlides = items.length * 2;
  } else {
    numSlides = items.length;
  }
  const itemsLength = numSlides / (isMobile ? mathNum : numNgroups || 1);

  const itemsSplitIntoGroups = items.reduce((acc, curr, index) => {
    const groupIndex = Math.floor(
      index / (isMobile ? mathNum : numNgroups || 1),
    );
    const group = acc[groupIndex] || [];
    group.push(curr);
    acc[groupIndex] = group;
    return acc;
  }, [] as any[]);

  const grpNum = isOdd && isMobile ? (itemsSplitIntoGroups.length * 1.5) : itemsSplitIntoGroups.length;

  console.log("itemsSplitIntoGroups", itemsSplitIntoGroups.length, "numSlides", numSlides, "grpNum", grpNum);


  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    controls.start({
      x: -index * 100 + "%",
    });
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    } else {
      goToSlide(grpNum - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide < grpNum - 1) {
      goToSlide(currentSlide + 1);
    } else {
      goToSlide(0);
    }
  };

  return (
    <>
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <motion.div
          className="relative w-full h-full"
          initial={{ x: 0 }}
          animate={controls}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div
            className={`flex h-full  gap-4 md:gap-8 lg:px-12`}
            style={{ width: `${itemsLength * 100}%` }}
          >
            {items.map((item, index) => renderSlide(item, index))}
            {isMobile && isOdd && items.map((item, index) => renderSlide(item, index))}
          </div>
        </motion.div>
      </div>

      <div className={`${grpNum === 1 && `hidden` } absolute min-w-[50%] w-[99%] left-0 flex gap-6 list-none justify-between items-center p-0`}>
        {arrows && (
          <>
            <button
              className="relative bottom-0 left-0 top-0 z-[1] flex w-[10%] items-center justify-center border-0 bg-white p-0 text-center text-black transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-teal hover:no-underline hover:outline-none focus:text-black focus:no-underline focus:outline-none motion-reduce:transition-none"
              type="button"
              onClick={prevSlide}
            >
              <PiCaretLeftBold className="inline-block h-8 w-8" />
              {/* <span className="inline-block h-8 w-8">
                <svg
                  className="h-6 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 16"
                  width="18"
                  height="14"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.665.182.107 6.74l-.002.003A.366.366 0 0 0 0 6.996V7a.37.37 0 0 0 .107.258l6.558 6.559a.365.365 0 1 0 .517-.517L1.247 7.364H16.84a.365.365 0 0 0 0-.73H1.247L7.182.697a.364.364 0 0 0 0-.517.366.366 0 0 0-.517 0Z"
                  />
                </svg>
              </span> */}
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Previous
              </span>
            </button>
          </>
        )}
        {/* <div>
          {itemsSplitIntoGroups &&
            itemsSplitIntoGroups.map((_: any, index: number) => {
              const buttonClass = clsx(
                "mx-2 h-[15px] w-[15px] flex-initial cursor-pointer rounded-full hover:bg-primary-light hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-colors transition-shadow ease-in-out motion-reduce:transition-none",
                index === currentSlide
                  ? "bg-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                  : "bg-slate shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)]",
              );
              return (
                <button
                  key={index}
                  type="button"
                  className={buttonClass}
                  aria-current={index === currentSlide ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                ></button>
              );
            })}
        </div> */}
        {arrows && (
          <>
            <button
              className="relative bottom-0 right-0 top-0 z-[1] flex w-[10%] items-center justify-center border-0 bg-white p-0 text-center text-black transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-teal hover:no-underline hover:outline-none focus:text-black focus:no-underline focus:outline-none motion-reduce:transition-none"
              type="button"
              onClick={nextSlide}
            >
              <PiCaretRightBold className="inline-block h-8 w-8" />
              {/* <span className="inline-block h-6 w-8">
                <svg
                  className="h-6 w-8 -scale-x-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 16"
                  width="18"
                  height="14"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.665.182.107 6.74l-.002.003A.366.366 0 0 0 0 6.996V7a.37.37 0 0 0 .107.258l6.558 6.559a.365.365 0 1 0 .517-.517L1.247 7.364H16.84a.365.365 0 0 0 0-.73H1.247L7.182.697a.364.364 0 0 0 0-.517.366.366 0 0 0-.517 0Z"
                  />
                </svg>
              </span> */}
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Next
              </span>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Carousel;
