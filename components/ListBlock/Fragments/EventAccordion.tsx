import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMinus, FaPlus } from "react-icons/fa";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import { Content } from "components/Content";
import Image from "next/image";
import useMediaQuery from "utilities/useMediaQuery";

interface AccordionProps {

  i: any;
  expanded: any;
  setExpanded: any;
  listDirection: boolean;
  featuredImage: any;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  coverText: string;
  eventSummery: string;
}


const variants = {
    open: {
      opacity: 1,
      height: "auto",
      filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
    },
    collapsed: {
      opacity: 0,
      height: 0,
      filter: "drop-shadow(0 0 #0000)",
    },
  };


const EventAccordion = ({
  i,
  expanded,
  setExpanded,
  listDirection,
  featuredImage,
  eventTitle,
  eventDate,
  eventTime,
  coverText,
  eventSummery
}: AccordionProps) => {
  const isOpen = i === expanded;

  const isMobile = useMediaQuery(`(max-width: 768px)`);

  const imageProps = {
    src: featuredImage?.sourceUrl || "",
    alt: featuredImage?.altText || eventTitle || "",
    // width: featuredImage?.node.mediaDetails?.width || 0,
    // height: featuredImage?.node.mediaDetails?.height || 0,
  };

  return (
    <>
      <div>
        <motion.div
          initial={false}
          animate={{
            marginBottom: isOpen ? "0" : "1rem",
          }}
          onClick={() => setExpanded(isOpen ? false : i)}
          className={`relative bg-white flex ${(listDirection || isMobile) ? 'flex-col' : 'flex-row'} w-full gap-4 drop-shadow-md`}
        >
          <div className={`${(listDirection || isMobile) ? 'w-full min-h-[200px] h-[13vw] max-h-[300px]' : 'w-full md:w-[30%]'} relative flex items-center overflow-hidden`}>
            <Image
              className={``}
              {...imageProps}
              fill={true}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={`relative grid ${(listDirection || isMobile) ? 'w-full' : 'w-full md:w-[70%] grid-cols-2'} p-8`}>
            <div className={`flex flex-col`}>
              {eventDate && <p className={`font-sans text-lg sm:text-xl text-black uppercase mb-2`}>{eventDate}</p>}
              {eventTitle && <h3 className={`font-heading text-xl ${(listDirection || isMobile) ? 'sm:text-2xl' : 'sm:text-3xl'} font-bold text-black uppercase mb-2`}>{eventTitle}</h3>}
              {eventTime && <p className={`font-sans text-lg sm:text-xl text-black uppercase mb-2`}>{eventTime}</p>}
            </div>
            <div className={`flex flex-col ${(listDirection || isMobile) ? '' : 'sm:items-end justify-between'}`}>
              {coverText && <p className={`font-sans text-lg sm:text-xl text-orange font-bold uppercase mb-2`}>{coverText}</p>}
              {eventSummery &&
                <div className={`flex flex-row items-center justify-center gap-3 font-bold text-teal font-sans text-md uppercase hover:text-orange hover:cursor-pointer transition duration-300 ease-in-out ${(listDirection || isMobile) ? 'mt-4' : ''}`}>
                  {isOpen ? (
                    <>
                      <p className={``}>View Less</p>
                      <PiCaretUpBold className={`relative ml-2 text-lg`} />
                    </>
                  ) : (
                    <>
                      <p className={``}>Learn More</p>
                      <PiCaretDownBold className={`relative ml-2 text-lg`} />
                    </>
                  )}
                </div>
              }
            </div>
          </div>
        </motion.div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={variants}
              transition={{ duration: 0.4, ease: "easeInOut"}}
              className={`bg-white mb-4`}
            >
              <Content
                content={eventSummery}
                className={`font-sans p-4`}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default EventAccordion;