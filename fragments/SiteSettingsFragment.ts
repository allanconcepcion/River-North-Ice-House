import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "./MediaItemFragment";

export const SITE_SETTINGS_FRAGMENT = gql`
  fragment SiteSettingsFragment on SiteSettings {
    siteSettings {
      turnOnAnnouncements
      customAddressLabel
      announcements {
        backgroundColor
        content
        ctaType
        cta {
          target
          title
          url
        }
      }
      email {
        target
        title
        url
      }
      cta {
        target
        title
        url
      }
      mapEmbedLink
      address {
        city
        country
        latitude
        longitude
        placeId
        stateShort
        streetAddress
        streetName
        streetNumber
        postCode
        state
      }
      customAddressLabel
      phoneNumber {
        target
        title
        url
      }
      closed
      hours {
        days
        openHours
      }
      logo {
        ...MediaItemFragment
      }
      logoAlt {
        ...MediaItemFragment
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;
