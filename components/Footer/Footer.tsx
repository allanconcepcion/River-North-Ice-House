import { Button } from "components/Button";
import { FeaturedImage } from "components/FeaturedImage";
import { NavigationMenu } from "components/NavigationMenu";
import Link from "next/link";
import { AcfLink, Acf_GoogleMap, MediaItem, MenuItem } from "graphql";
import { FaFacebookF, FaInstagram, FaTiktok, FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export interface FooterProps {
  logo: MediaItem;
  menuItemsHeader: MenuItem[];
  // menuItemsFooter: MenuItem[];
  phoneNumber: AcfLink;
  address: Acf_GoogleMap;
  customAddressLabel: string;
  mapEmbed: string;
  email: AcfLink;
  cta: AcfLink;
  hours: {
    days: string;
    openHours: string;
  }[];
  closed: any;
}

const Footer = ({
  logo,
  menuItemsHeader,
  // menuItemsFooter,
  phoneNumber,
  mapEmbed,
  address,
  customAddressLabel,
  email,
  cta,
  hours,
  closed,
}: FooterProps) => {

  const isClosed = closed && closed[0] !== 'none';

  return (
    <div className={`bg-off-white pt-8`}>
    <footer className={`bg-tan font-sans text-black`}>
      <div
        className={`max-w-[1300px] mx-auto flex flex-col flex-wrap md:flex-row md:justify-between`}
      >
        {/* Logo */}
        {/* <div
          className={`flex flex-row flex-wrap items-center justify-center md:justify-start`}
        >
          {logo ? (
            <FeaturedImage image={logo} className={`mb-4 w-32 md:mb-0`} />
          ) : (
            <a
              href="/"
              className="title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0"
            >
              {`River North IceHouse`}
            </a>
          )}
        </div> */}
        <div className={`flex flex-wrap px-12 sm:px-8 py-8 w-full lg:w-[60%]`}>
          <div className={`w-full flex flex-col sm:flex-row gap-6 items-center justify-between mb-6`}>
            <p className={`max-md:text-center font-heading text-4xl font-bold uppercase tracking-tight`}>Let’s Be Friends</p>
            <div className={`flex flex-row gap-4`}>
              <a className={`text-teal hover:text-orange p-2 bg-white rounded-full border-[1px] border-teal hover:border-orange transition duration-300 ease-in-out`} href={`https://www.facebook.com/RiverNorthIceHouse`} target="_blank">
                <FaFacebookF className={``} />
              </a>
              <a className={`text-teal hover:text-orange p-2 bg-white rounded-full border-[1px] border-teal hover:border-orange transition duration-300 ease-in-out`} href={`https://www.tiktok.com/@rivernorthicehouse`} target="_blank">
                <FaTiktok className={``} />
              </a>
              <a className={`text-teal hover:text-orange p-2 bg-white rounded-full border-[1px] border-teal hover:border-orange transition duration-300 ease-in-out`} href={`https://www.instagram.com/rivernorthicehouse/`} target="_blank">
                <FaInstagram className={``} />
              </a>
            </div>
          </div>
          {/* Business Info */}
          <div className={`w-full max-sm:mx-auto sm:w-[60%] flex flex-col justify-center items-start gap-8 max-sm:border-b-[1px] sm:border-r-[1px] border-[#ABABAB] sm:pr-8 max-sm:pb-8`}>
            <div className={`flex flex-row justify-start items-start gap-4`}>
              <FaClock className={`text-orange mt-2`} />
              <div className={``}>
                <div className={`flex flex-col w-[280px]`}>
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
                      <div key={index} className={`w-fit px-2`}>
                        <p key={index} className={`font-sans font-bold capitalize w-fit`}>
                          {dayRange}
                          <span className={`ml-3 font-normal`}>{hour.openHours}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
                {isClosed && <p className={`font-sans font-bold uppercase`}>Closed {closed}</p>}
              </div>
            </div>

            <div className={`flex flex-row justify-start items-start gap-4`}>
              <FaMapMarkerAlt className={`text-orange mt-2`} />
              <div className={``}>
                <Button
                  className={`font-sans`}
                  type={`blk-text`}
                  href={`https://www.google.com/maps/search/?api=1&query=${address?.streetAddress}&query_place_id=${address?.placeId}`}
                  target="_blank"
                >
                  {address?.streetAddress}
                  <br />
                  <span  className={`font-normal`}>{address?.city}, {address?.state} {address?.postCode}</span>
                </Button>
              </div>
            </div>

            <div className={`flex flex-row justify-start items-start gap-4`}>
              <FaPhoneAlt className={`text-orange mt-2`} />
              <div className={``}>
                <Button className={`font-sans`} type={`blk-text`} href={`tel:${phoneNumber?.url}`}>
                  {phoneNumber?.title}
                </Button>
              </div>
            </div>
          </div>
          {/* Menu */}
          <div className={`w-full max-sm:mx-auto sm:w-[40%] flex flex-col justify-center pl-5 sm:pl-8 max-sm:pt-8`}>
            <nav className={`font-sans left-4 relative flex flex-col text-base gap-4 font-bold`}>
              {menuItemsHeader.map(({ path, label }) => (
                <Link
                  key={path}
                  href={path ?? "/"}
                  className={`mr-5 hover:text-orange text-black transition duration-300 ease-in-out`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            {/* <NavigationMenu menuItems={menuItemsHeader} type="primary" direction="vertical" className={``} /> */}
            {/* {cta ? (
              <Button className={`ml-4`} type="secondary" href={cta.url ?? ``}>
                {cta.title}
              </Button>
            ) : null} */}
          </div>
        </div>
        {/* Map */}
        <div className={`w-full lg:w-[40%]`}>
          <iframe
            className={`grayscale hover:grayscale-0 transition duration-300 ease-in-out`}
            style={{ width: `100%`, height: `400px` }}
            loading="lazy"
            allowFullScreen
            title={`River North IceHouse Map`}
            src={`${mapEmbed ? mapEmbed : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3474.6958309889947!2d-98.48609798880857!3d29.4376851751314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865cf5f7f733883b%3A0xbc1224fac18aec4d!2s317%20W%20Jones%20Ave%2C%20San%20Antonio%2C%20TX%2078215!5e0!3m2!1sen!2sus!4v1714422840704!5m2!1sen!2sus'}`}
          />
        </div>
      </div>
    </footer>
    <div className={`bg-off-white text-black text-center p-4 font-sans flex flex-col sm:flex-row justify-center gap-2`}>
      <p className={``}>
        ©{new Date().getFullYear()} River North Icehouse. All rights reserved.
      </p>
      <p className={`hidden sm:block`}>|</p>
      <p>Website by <a className={`hover:text-orange transition duration-300 ease-in-out`} href="https://concepcion.work" target="_blank">Concepcion Work</a></p>
    </div>
    </div>
  );
};

export default Footer;
