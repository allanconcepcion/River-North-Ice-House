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
  title: string;
  description: string;
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


const AccordionBlock = ({
  i,
  expanded,
  setExpanded,
  title,
  description,
}: AccordionProps) => {
  const isOpen = i === expanded;

  const isMobile = useMediaQuery(`(max-width: 768px)`);

  return (
    <>
        <motion.div
          initial={false}
          animate={{
            fontWeight: isOpen ? "400" : "400",
          }}
          onClick={() => setExpanded(isOpen ? false : i)}
          className={`px-4 py-6 flex flex-row justify-between items-center w-full transition duration-300 ease-in-out cursor-pointer border-b-[1px] border-[#ABABAB]`}
        >
          <h3 className={`font-sans text-xl`}>{title}</h3>
          {isOpen ? (
            <FaMinus className={`relative right-0 text-sm ml-2 min-w-[14px]`} />
          ) : (
            <FaPlus className={`relative right-0 text-sm ml-2 min-w-[14px]`} />
          )}
        </motion.div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={variants}
              transition={{ duration: 0.4, ease: "easeInOut"}}
              className={`border-b-[1px] border-[#ABABAB]`}
            >
              <Content
                content={description}
                className={`font-sans p-4`}
              />
            </motion.section>
          )}
        </AnimatePresence>
    </>
  );
};

export default AccordionBlock;