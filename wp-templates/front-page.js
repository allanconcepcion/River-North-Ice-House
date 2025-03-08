import { useQuery, gql } from "@apollo/client";
import * as MENUS from "constants/menus";
import { Layout, Blocks } from "features"; // Blocks eventually
import { NavigationMenu } from "components";
import {
  BLOG_INFO_FRAGMENT,
  SITE_SETTINGS_FRAGMENT,
  SEO_FRAGMENT,
} from "fragments";

export default function Component() {
  const { data, loading, error } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { page, headerMenuItems, footerMenuItems, mobileMenuItems, siteSettings } = data;
  const { seo, title, flexibleContent } = page;
  const { blocks } = flexibleContent;
  const {
    address,
    customAddressLabel,
    phoneNumber,
    logo,
    mapEmbedLink,
    logoAlt,
    cta,
    email,
    closed,
    hours,
  } = siteSettings.siteSettings;

  return (
    <Layout
      headerMenuItems={headerMenuItems}
      mobileMenuItems={mobileMenuItems}
      siteSettings={siteSettings}
      seo={seo}
      logo={logo}
      mapEmbed={mapEmbedLink}
      logoAlt={logoAlt}
      cta={cta}
      phoneNumber={phoneNumber}
      address={address}
      customAddressLabel={customAddressLabel}
      closed={closed}
      hours={hours}
    >
      <Blocks blocks={blocks} />
    </Layout>
  );
}

Component.query = gql`
  query HomePage(
    $headerLocation: MenuLocationEnum!
    $footerLocation: MenuLocationEnum!
    $asPreview: Boolean = false
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    siteSettings {
      ...SiteSettingsFragment
    }

    page(id: "/", idType: URI, asPreview: $asPreview) {
      id
      title
      seo {
        ...SEOFragment
      }
      flexibleContent {
        ...BlocksFragment
      }
    }
    headerMenuItems: menuItems(
      where: { location: $headerLocation }
      first: 50
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    mobileMenuItems: menuItems(
      where: { location: $footerLocation }
      first: 50
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
  ${BLOG_INFO_FRAGMENT}
  ${SITE_SETTINGS_FRAGMENT}
  ${NavigationMenu.fragments.entry}
  ${Blocks.fragments.entry}
  ${SEO_FRAGMENT}
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
