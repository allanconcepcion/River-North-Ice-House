import { gql } from "@apollo/client";
import { Page_Flexiblecontent_Blocks_ListBlock } from "graphql";
import { MEDIA_ITEM_FRAGMENT } from "fragments";
import { useState } from "react";
import Image from "next/image";
import { Content } from "components/Content";
import useMediaQuery from "utilities/useMediaQuery";
import AccordionBlock from "./Fragments/Accordion";
import EventAccordion from "./Fragments/EventAccordion";

interface ListBlockProps extends Page_Flexiblecontent_Blocks_ListBlock {
  className?: string;
}

const ListBlock = ({
  className,
  sectionId,
  preTitle,
  title,
  content,
  listType,
  listDirection,
  events,
  accordions,
}: ListBlockProps) => {
  const [expanded, setExpanded] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);

  const isMobile = useMediaQuery(`(max-width: 768px)`);

  const isEvents = listType === "events";
  const isAccordions = listType === "accordions";

  const graphicBgProps = {
    src: "/graphic-bg.svg",
    alt: "graphic background",
    // width: 993,
    // height: 612,
  };
  const eventImgProps = {
    src: "/event-img.jpg",
    alt: "",
    // width: featuredImage?.node.mediaDetails?.width || 0,
    // height: featuredImage?.node.mediaDetails?.height || 0,
  };

  return (
    <section id={`${sectionId ?? ``}`} className={`${className ?? ``} ${sectionId ? `scroll-mt-[180px]` : ``} relative flex flex-col md:my-16`}>
        <div className={`relative bg-tan flex flex-col max-w-[1000px] mx-auto`}>
            <div className={`relative z-[2] flex flex-col px-4 pt-12 pb-36`}>
                {preTitle && <h3 className={`font-sans text-xl sm:text-2xl text-black text-center uppercase mb-4`}>{preTitle}</h3>}
                {title && <h2 className={`font-heading text-2xl sm:text-5xl font-bold text-black text-center uppercase`}>{title}</h2>}
            </div>
            <div className={`absolute w-full h-full flex items-center overflow-hidden`}>
              <Image
                className={``}
                {...graphicBgProps}
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
        </div>
        {isEvents && (
          <>
          {events ? (
          <div className={`relative z-[2] max-w-[1300px] w-full mx-auto px-4 -mt-20 ${listDirection ? 'grid grid-cols-1 md:grid-cols-3' : 'flex flex-col'}`}>
            {events && events.map((event, index) => {
              // @ts-ignore
              const { eventTitle, useDateRange, eventDate, eventEndDate, eventTime, coverText, eventSummery, eventImage } = event?.events;

              const formattedStartDate = new Date(eventDate).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"});
              const shortendStartDate = new Date(eventDate).toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"});
              const formattedEndDate = new Date(eventEndDate).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"});
              const yearStartDate = new Date(eventDate).toLocaleDateString('en-us', { year:"numeric"});
              const yearEndDate = new Date(eventEndDate).toLocaleDateString('en-us', { year:"numeric"});

              let startDateRange = "";
              if (yearStartDate === yearEndDate) {
                startDateRange = shortendStartDate;
              } else {
                startDateRange = formattedStartDate;
              }

              const formattedDateRange = startDateRange + " - " + formattedEndDate;

              return ( 
              <EventAccordion
                key={index}
                i={index}
                expanded={eventOpen}
                setExpanded={setEventOpen}
                listDirection={listDirection ?? false}
                featuredImage={eventImage}
                eventTitle={eventTitle}
                eventDate={useDateRange ? formattedDateRange : formattedStartDate}
                eventTime={eventTime}
                coverText={coverText}
                eventSummery={eventSummery}
              />
            )})}
          </div>
        ) : (
          <div className={`relative z-[2] max-w-[1300px] w-full mx-auto px-4 -mt-20 flex flex-col`}>
            <div
                className={`relative bg-white flex flex-col md:flex-row w-full gap-4 drop-shadow-md`}
              >
                <div className={`${isMobile ? 'w-full min-h-[200px] h-[13vw] max-h-[300px]' : 'w-full md:w-[35%]'} relative flex items-center overflow-hidden`}>
                  <Image
                    className={``}
                    {...eventImgProps}
                    fill={true}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={`relative grid ${isMobile ? 'w-full' : 'w-full md:w-[65%]'} p-8`}>
                  <div className={`flex flex-col`}>
                    <p className={`font-sans text-lg sm:text-xl text-black uppercase mb-2`}>Live Music Coming Soon</p>
                    <h3 className={`font-heading text-xl sm:text-2xl font-bold text-black uppercase mb-2`}>Stay Tuned for<br />Our Grand Opening</h3>
                    <p className={`font-sans text-lg sm:text-xl text-black uppercase mb-2`}>Follow Us <a className={``} href="https://www.instagram.com/rivernorthicehouse/" target="_blank">@RIVERNORTHICEHOUSE</a></p>
                  </div>
                </div>
              </div>
          </div>
        )}
        </>
        )}
        {isAccordions && accordions && (
          <div className={`relative z-[2] max-w-[1000px] w-full mx-auto -mt-20 bg-off-white flex flex-col px-4`}>
            {accordions && accordions.map((accordion, index) => (
              <AccordionBlock
                key={index}
                i={index}
                expanded={expanded}
                setExpanded={setExpanded}
                title={accordion?.title as string}
                description={accordion?.content as string}
              />
            ))}
          </div>
        )}
    </section>
  );
};

export default ListBlock;


ListBlock.fragments = {
  entry: gql`
    fragment ListBlockFragment on Page_Flexiblecontent_Blocks_ListBlock {
      __typename
      sectionId
      preTitle
      title
      content
      listType
      listDirection
      accordions {
        title
        content
      }
      events {
        ... on Event {
          events {
            eventTitle
            useDateRange
            eventDate
            eventEndDate
            eventTime
            coverText
            eventSummery
            eventImage {
              ...MediaItemFragment
            }
          }
        }
      }
    }
    ${MEDIA_ITEM_FRAGMENT}
    
  `,
};