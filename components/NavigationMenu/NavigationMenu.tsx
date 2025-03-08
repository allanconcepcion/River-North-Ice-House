import { gql } from "@apollo/client";
import { MenuItem } from "graphql";
import Link from "next/link";
import { AnimatePresence, m, LazyMotion } from "framer-motion";
import { itemVariants, sideVariants } from "./Fragments/variants";
import { MenuButton } from "./Fragments/MenuButton";
import { FeaturedImage } from "components/FeaturedImage";
const loadFeatures = () =>
  import("utilities/framerFeatures.js").then((res) => res.default);

interface NavigationMenuProps {
  menuItems: MenuItem[] | undefined;
  mobileMenuItems?: MenuItem[];
  logo?: any;
  className?: string;
  type?: "primary" | "secondary";
  isMobile?: boolean;
  isOpen?: boolean;
  direction?: "vertical" | "horizontal";
  toggleOpen?: () => void;
  hours?: {
    days: string;
    openHours: string;
  }[];
}

const NavigationMenu = ({
  menuItems,
  mobileMenuItems,
  logo,
  className,
  type = "primary",
  direction = "horizontal",
  isMobile,
  isOpen,
  hours,
  toggleOpen,
}: NavigationMenuProps) => {
  if (!menuItems) {
    return null;
  }

  return (
    <>
      <LazyMotion features={loadFeatures}>
        <AnimatePresence>
          <MenuButton
            className={`absolute left-8 ${
              isOpen ? `top-16` : `top-16`
            } z-50 border-2 rounded-full border-black p-3 md:hidden cursor-pointer`}
            isOpen={isOpen}
            onClick={toggleOpen}
            lineProps={{ strokeLinecap: "round" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            width="16"
            height="16"
            strokeWidth="3"
            color="#323232"
          />
          {logo && (
            <Link rel="icon" href={`/`} >
              <FeaturedImage image={logo} className={`flex md:hidden mb-2 w-full max-h-[80px]`} />
            </Link>
          )}
          {isOpen && (
            <m.aside
              initial={{ width: 0 }}
              animate={{
                width: 300,
              }}
              exit={{
                width: 0,
                transition: { delay: 0.7, duration: 0.3 },
              }}
              className={`mt-8 z-50 flex flex-col h-screen items-center gap-12`}
            >
              <m.nav
                className={`bottom-100 font-heading left-4 z-40 flex flex-col items-center gap-6 text-lg font-semibold md:flex-row md:gap-0`}
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                {mobileMenuItems ? (
                  <>
                    {mobileMenuItems.map(({ path, label }) => (
                      <m.div
                        key={path}
                        whileHover={{ scale: 1.1 }}
                        variants={itemVariants}
                      >
                        <Link
                          href={path ?? "/"}
                          className={`mr-5 hover:text-orange ${
                            type === "primary" ? "text-black" : "text-white"
                          } transition duration-300 ease-in-out`}
                        >
                          {label}
                        </Link>
                      </m.div>
                    ))}
                  </>
                ) : (
                  <>
                    {menuItems.map(({ path, label }) => (
                      <m.div
                        key={path}
                        whileHover={{ scale: 1.1 }}
                        variants={itemVariants}
                      >
                        <Link
                          href={path ?? "/"}
                          className={`mr-5 hover:text-orange ${
                            type === "primary" ? "text-black" : "text-white"
                          } transition duration-300 ease-in-out`}
                        >
                          {label}
                        </Link>
                      </m.div>
                    ))}
                  </>
                )}
                <m.div variants={itemVariants} className={`flex flex-row flex-wrap justify-center gap-2 text-black`}>
                  <p className={`font-sans text-[16px]`}>Open</p>
                  {hours && hours.map((hour, index) => {
                    const days = hour.days;
                    const dayList = new Array(days).join(',').replace(/,/g, ', ');

                    let dayRange = '';
                      if(dayList.includes('mon') && dayList.includes('tue') && dayList.includes('wed') && dayList.includes('thur')) {
                        dayRange = 'Mon - Thur';
                      } else if(dayList.includes('fri') && dayList.includes('sat') && dayList.includes('sun')) {
                        dayRange = 'Fri - Sun';
                      } else if(dayList.includes('sat') && dayList.includes('sun')) {
                        dayRange = 'Sat - Sun';
                      } else {
                        dayRange = dayList;
                      }
                    return (
                      <div key={index}className={`[&:not(:last-of-type)]:pr-2 [&:not(:first-of-type):not(:last-of-type)]:border-r-[1px] border-black`}>
                        <p key={index} className={`font-sans text-[16px] font-bold capitalize`}>
                          {dayRange}
                          <span className={`ml-3 font-normal`}>{hour.openHours}</span>
                        </p>
                      </div>
                    );
                  })}
                </m.div>
              </m.nav>
            </m.aside>
          )}
        </AnimatePresence>
      </LazyMotion>
      <nav className={`font-sans left-4 hidden flex-col text-lg md:relative md:flex ${direction === "horizontal" ? `md:flex-row items-center gap-4` : `gap-4`} font-semibold`}>
        {menuItems.map(({ path, label }) => (
          <Link
            key={path}
            href={path ?? "/"}
            className={`mr-5 hover:text-orange ${
              type === "primary" ? "text-black" : "text-white"
            } transition duration-300 ease-in-out`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default NavigationMenu;

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
