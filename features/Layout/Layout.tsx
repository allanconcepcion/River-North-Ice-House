import { Main } from "features/Main"; // SEO
import {
  AcfLink,
  Acf_GoogleMap,
  MediaItem,
  MenuItem,
  PostTypeSeo,
  RootQueryToMenuItemConnection,
} from "graphql";
import { SEO } from "features/SEO";
import { Analytics } from "@vercel/analytics/react"

import { Header, Footer } from "components";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-sans",
});
export interface LayoutProps {
  children: React.ReactNode;
  headerMenuItems: RootQueryToMenuItemConnection;
  mobileMenuItems: RootQueryToMenuItemConnection;
  title: string;
  description: string;
  logo: MediaItem;
  logoAlt: MediaItem;
  logoWhite: MediaItem;
  seo: PostTypeSeo;
  cta: AcfLink;
  phoneNumber: AcfLink;
  mapEmbed: string;
  address: Acf_GoogleMap;
  customAddressLabel: string;
  email: AcfLink;
  closed: boolean;
  hours: {
    days: string;
    openHours: string;
  }[];
}

const Layout = ({
  children,
  headerMenuItems,
  mobileMenuItems,
  cta,
  title,
  description,
  seo,
  logo,
  logoAlt,
  mapEmbed,
  phoneNumber,
  address,
  customAddressLabel,
  email,
  closed,
  hours,
}: LayoutProps) => {
  return (
    <>
      <SEO seo={seo} />
      <Analytics />
      <div className={`${outfit.variable}`}>
        <Header
          menuItems={headerMenuItems.nodes}
          mobileMenuItems={mobileMenuItems.nodes}
          logo={logo}
          logoAlt={logoAlt}
          cta={cta}
          hours={hours}
          address={address}
          phoneNumber={phoneNumber}
          customAddressLabel={customAddressLabel}
        />
        <Main className={`main flex flex-col gap-8 bg-off-white overflow-x-hidden`}>{children}</Main>
        <Footer
          menuItemsHeader={headerMenuItems.nodes}
          cta={cta}
          phoneNumber={phoneNumber}
          logo={logo}
          mapEmbed={mapEmbed}
          address={address}
          customAddressLabel={customAddressLabel}
          email={email}
          closed={closed}
          hours={hours}
        />
      </div>
    </>
  );
};

export default Layout;
