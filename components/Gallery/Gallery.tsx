import { gql } from "@apollo/client";
import { Page_Flexiblecontent_Blocks_Gallery } from "graphql";
import { MEDIA_ITEM_FRAGMENT } from "fragments";
import clsx from "clsx";
import { FeaturedImage } from "components/FeaturedImage";
import Image from "next/image";
import { Content } from "components/Content";
import useMediaQuery from "utilities/useMediaQuery";
import { Button } from "components/Button";
import Carousel from "./Fragments/Carousel";

interface GalleryProps extends Page_Flexiblecontent_Blocks_Gallery {
  className?: string;
}

const Gallery = ({
  className,
  sectionId,
  variant,
  preTitle,
  title,
  ctas,
  columnCount,
  showCaptions,
  captionPlacement,
  background,
  galleryImages,
}: GalleryProps) => {
    const isMobile = useMediaQuery(`(max-width: 768px)`);

    let colClasses = ``;
    if (columnCount === 1) {
        colClasses = `grid-cols-1`;
    } else if (columnCount === 2) {
        colClasses = `grid-cols-2`;
    } else if (columnCount === 3) {
        colClasses = `grid-cols-2 md:grid-cols-3`;
    } else if (columnCount === 4) {
        colClasses = `grid-cols-2 md:grid-cols-4`;
    } else if (columnCount === 5) {
        colClasses = `grid-cols-2 md:grid-cols-5`;
    } else if (columnCount === 6) {
        colClasses = `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`;
    }

    let captionClasses = ``;
    if (captionPlacement === "below-card") {
        captionClasses = `flex justify-center items-start font-sans text-center p-2 drop-shadow-sm`;
    } else if (captionPlacement === "overly-img") {
        captionClasses = `absolute z-[3] bottom-0 w-full opacity-50 text-white text-center font-heading font-semibold text-[5.5vw] md:max-xl:text-[4vw] xl:text-[3.2rem] leading-[.67]`;
    }

    let bgColor = ``;
    if (background === `tan-graphic`) {
        bgColor = `tan`;
    } else {
        bgColor = background ?? `transparent`;
    }
  const isTanGrapic = background === `tan-graphic`;

  const graphicBgProps = {
    src: "./graphic-bg.svg",
    alt: "graphic background",
    // width: 993,
    // height: 612,
  };

    const renderImageSlide = (galleryImages: any, index: number) => {
        const caption = galleryImages.caption || "";
        const galleryProps = {
          src: galleryImages.sourceUrl || "",
          alt: galleryImages.altText || "",
          width: galleryImages.mediaDetails?.width || 0,
          height: galleryImages.mediaDetails?.height || 0,
        };

        return (
          <div
            key={index}
            className={`relative overflow-hidden w-full justify-center items-center`}
          >
            <Image
              className={`w-full h-full`}
              {...galleryProps}
            //   fill={true}
              loading="eager"
            //   style={{ objectFit: "cover" }}
            />
            {showCaptions && (
                <div className={`${captionClasses}`}>
                    <p>{caption}</p>
                </div>
            )}
          </div>
        );
    };

  return (
    <section id={`${sectionId ?? ``}`} className={`${className ?? ``} ${sectionId ? `scroll-mt-[180px]` : ``} relative flex flex-col`}>
        {(preTitle || title) && (
            <div className={`relative z-[2] max-w-[1300px] w-full mx-auto flex flex-col p-4 -mb-10`}>
                {preTitle && <h3 className={`font-sans text-xl sm:text-2xl text-black md:text-center uppercase mb-4`}>{preTitle}</h3>}
                {title && <h2 className={`font-heading text-xl sm:text-3xl md:text-5xl font-bold text-black text-center uppercase`}>{title}</h2>}
            </div>
        )}
        <div className={`relative flex flex-col bg-${bgColor}`}>
            {(variant === "grid") && (
                <div className={`relative z-[2] max-w-[1300px] mx-auto flex flex-col py-4 px-6 ${(title || preTitle) && `mt-12`}`}>
                    <div className={`grid ${colClasses} gap-y-4 gap-x-8 lg:px-12`}>
                        {galleryImages?.map((galleryImage, index) => {
                            const caption = galleryImage?.caption || "";
                            const imageProps = {
                                src: galleryImage?.sourceUrl || "",
                                alt: galleryImage?.altText || title || "",
                                width: galleryImage?.mediaDetails?.width || 0,
                                height: galleryImage?.mediaDetails?.height || 0,
                            };

                            return(
                                <div key={index} className={`relative overflow-hidden w-full justify-center items-center`}>
                                    <Image
                                        className={``}
                                        {...imageProps}
                                    />
                                {showCaptions && (
                                        <div className={`${captionClasses}`}>
                                            <p>{caption}</p>
                                        </div>
                                    )}
                                </div>
                            ); 
                        })}
                    </div>
                </div>
            )}
            {(variant === "carousel") && (
                <div className={`relative z-[2] max-w-[1300px] mx-auto flex flex-col p-4 ${(title || preTitle) && `mt-12`}`}>
                    <div className={`relative flex justify-center items-center`}>
                        <Carousel
                            items={galleryImages ?? []}
                            renderSlide={renderImageSlide}
                            numNgroups={columnCount || 1}
                            arrows
                        />
                    </div>
                </div>
            )}
            {ctas && (
                <div className="relative z-[2] max-w-[1300px] mx-auto flex gap-4 my-8">
                    {ctas.map((cta, index) => {
                        return (
                            <Button
                                key={index}
                                href={cta?.link?.url ?? `#`}
                                target={cta?.link?.target ?? `_self`}
                                type={cta?.type ?? `default`}
                                className={``}
                            >
                                {cta?.link?.title}
                            </Button>
                        );
                    })}
                </div>
            )}
            {isTanGrapic && (
                <div className={`absolute w-full h-full flex items-center overflow-hidden`}>
                    <Image
                        className={``}
                        {...graphicBgProps}
                        fill={true}
                        style={{ objectFit: "cover" }}
                    />
                </div>
            )}
        </div>
    </section>
  );
};

export default Gallery;


Gallery.fragments = {
  entry: gql`
    fragment GalleryFragment on Page_Flexiblecontent_Blocks_Gallery {
        __typename
        sectionId
        variant
        preTitle
        title
        ctas {
            type
            link {
                title
                url
                target
            }
        }
        columnCount
        showCaptions
        captionPlacement
        background
        galleryImages {
            ...MediaItemFragment
        }
    }
    ${MEDIA_ITEM_FRAGMENT}
  `,
};
