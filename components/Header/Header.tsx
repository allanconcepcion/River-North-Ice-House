import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { NavigationMenu } from "components/NavigationMenu";
import { useCycle, useScroll } from "framer-motion";
import { AcfLink, MediaItem, MenuItem, Acf_GoogleMap } from "graphql";
import { useEffect, useRef, useState } from "react";
import flatListToHierarchical from "utilities/flatListToHierarchical";
import { FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";

export interface HeaderProps {
  menuItems: MenuItem[];
  mobileMenuItems: MenuItem[];
  logo: MediaItem;
  logoAlt: MediaItem;
  cta: AcfLink;
  hours: {
    days: string;
    openHours: string;
  }[];
  address: Acf_GoogleMap;
  customAddressLabel: string;
  phoneNumber: AcfLink;
}

const Header = ({ menuItems, mobileMenuItems, logo, logoAlt, cta, hours, phoneNumber, address, customAddressLabel }: HeaderProps) => {
  const [open, cycleOpen] = useCycle(false, true);
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      // If latest is greater than height of header, set isScrolledPast to true
      if (latest > 0) {
        setIsScrolledPast(true);
      } else {
        setIsScrolledPast(false);
      }
    });
  }, [scrollY]);

  return (
    <header
      className={`${
        isScrolledPast ? `shadow-md` : ``
      } body-font sticky top-0 z-30 max-h-fit bg-off-white font-sans text-gray-600 transition-shadow`}
      ref={ref}
    >
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-center p-4 md:justify-between">
        <div
          className={`hidden md:flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          {/* Logo */}
          {logo ? (
            <Link rel="icon" href={`/`} >
              <FeaturedImage image={logo} className={`mb-4 w-28 md:mb-0`} />
            </Link>
          ) : (
            <a
              href="https://noisytrumpet.com"
              className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
            >
              {`NT Headless Site Template`}
            </a>
          )}
        </div>
        {/* CTA */}
        
        <div className={`w-full md:w-[80%] flex flex-col md:items-end justify-center gap-4 md:gap-6`}>
          <div className={`hidden w-full md:flex flex-row flex-wrap items-center justify-end gap-4 md:gap-x-8 lg:gap-x-16`}>
            <div className={`flex flex-row gap-2 text-black`}>
              <p className={`font-sans text-sm`}>Open</p>
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
                  <div key={index} className={`[&:not(:last-of-type)]:pr-2 [&:not(:last-of-type)]:border-r-[1px] border-black`}>
                    <p key={index} className={`font-sans text-sm font-bold capitalize`}>
                      {dayRange}
                      <span className={`ml-3 font-normal`}>{hour.openHours}</span>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className={`flex flex-row flex-wrap items-center justify-end gap-4 md:gap-x-8 lg:gap-x-16`}>
              <div className={`flex flex-row justify-start items-center gap-4`}>
                <FaPhoneAlt className={`text-orange`} />
                <div className={`text-sm`}>
                  <Button type={`blk-text`} href={`tel:${phoneNumber?.url}`}>
                    {phoneNumber?.title}
                  </Button>
                </div>
              </div>
              <Button
                className={`text-sm`}
                type={`blk-text`}
                href={`https://www.google.com/maps/search/?api=1&query=${address?.streetAddress}&query_place_id=${address?.placeId}`}
                target="_blank"
              >
                {address?.streetAddress}
              </Button>
            </div>
          </div>
          <div className={`md:hidden w-full flex flex-row flex-wrap items-center justify-between px-2 pb-2 gap-4 border-b-[1px] border-black`}>
            <div className={`flex flex-row justify-start items-center gap-4`}>
              <FaPhoneAlt className={`text-orange`} />
              <div className={`text-sm`}>
                <Button type={`org-text`} href={`tel:${phoneNumber?.url}`}>
                  {phoneNumber?.title}
                </Button>
              </div>
            </div>
            <Button
              className={`text-sm`}
              type={`org-text`}
              href={`https://www.google.com/maps/search/?api=1&query=${address?.streetAddress}&query_place_id=${address?.placeId}`}
              target="_blank"
            >
              {address?.streetAddress}
            </Button>
          </div>
          <div className={`flex flex-col md:flex-row md:flex-wrap items-center justify-center`}>
            {/* Navigation Menu */}
            <NavigationMenu
              menuItems={flatListToHierarchical(menuItems)}
              mobileMenuItems={flatListToHierarchical(mobileMenuItems)}
              logo={logo}
              isOpen={open}
              type="primary"
              toggleOpen={() => cycleOpen()}
              hours={hours}
            />
            {cta ? (
              <Button type={`org-circled`} className={`hidden md:flex ml-4 min-[830px]:ml-8`} href={cta.url ?? ``}>
                {cta.title}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
