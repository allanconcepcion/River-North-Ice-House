import { gql } from "@apollo/client";
import { Page_Flexiblecontent_Blocks_TextImage } from "graphql";
import { MEDIA_ITEM_FRAGMENT } from "fragments";
import clsx from "clsx";
import { FeaturedImage } from "components/FeaturedImage";
import Image from "next/image";
import { Content } from "components/Content";
import useMediaQuery from "utilities/useMediaQuery";
import { Button } from "components/Button";

interface GalleryTypeProps extends Page_Flexiblecontent_Blocks_TextImage {
  className?: string;
}

const GalleryType = ({
  className,
  preTitle,
  title,
  subtitle,
  content,
  ctas,
  makeTitleExtraLarge,
  imageLayout,
  largestImage,
  secondImage,
  verticalImage,
}: GalleryTypeProps) => {
  const isMobile = useMediaQuery(`(max-width: 640px)`);


  const lgImageProps = {
    src: largestImage?.sourceUrl || "",
    alt: largestImage?.altText || title || "",
    width: largestImage?.mediaDetails?.width || 0,
    height: largestImage?.mediaDetails?.height || 0,
  };

  const secImageProps = {
    src: secondImage?.sourceUrl || "",
    alt: secondImage?.altText || title || "",
    width: secondImage?.mediaDetails?.width || 0,
    height: secondImage?.mediaDetails?.height || 0,
  };

  const vertImageProps = {
    src: verticalImage?.sourceUrl || "",
    alt: verticalImage?.altText || title || "",
    width: verticalImage?.mediaDetails?.width || 0,
    height: verticalImage?.mediaDetails?.height || 0,
  };

  const graphicBgProps = {
    src: "./graphic-bg.svg",
    alt: "graphic background",
    // width: 993,
    // height: 612,
  };

  const isBottomLeft = imageLayout === "cont-b-left";
  const isBottomRight = imageLayout === "cont-b-right";
  const isTopLeft = imageLayout === "cont-t-left";
  const isTopRight = imageLayout === "cont-t-right";

  const isRight = isBottomRight || isTopRight;
  const isTop = isTopLeft || isTopRight;


  return (
    <div className={`${className ?? ``} relative flex`}>
      <div className={`relative z-[2] max-w-[1300px] mx-auto flex ${isRight ? `flex-row-reverse` : `flex-row`} gap-4 md:gap-8 lg:px-20`}>
        <div className={`w-full md:w-[55%] flex ${isTop ? `flex-col-reverse justify-between` : `flex-col justify-start`} items-start gap-4`}>
            {largestImage ? (
                <div className={``}>
                    <Image
                        className={``}
                        {...lgImageProps}
                    />
                </div>
            ) : null}
            {isMobile && (
                <div className={`w-full flex flex-row justify-center items-start gap-4`}>
                {secondImage ? (
                    <div className={`w-[65%]`}>
                        <Image
                            className={``}
                            {...secImageProps}
                        />
                    </div>
                ) : null}
                {verticalImage ? (
                    <div className={`w-[35%]`}>
                        <Image
                            className={``}
                            {...vertImageProps}
                        />
                    </div>
                ) : null}
            </div>
            )}
            <div className={`text-black p-4`}>
                {preTitle && <h4 className={`font-sans font-medium text-lg sm:text-xl mb-4`}>{preTitle}</h4>}
                {title && <h2 className={`font-heading text-4xl ${makeTitleExtraLarge ? `sm:text-5xl` : `sm:text-3xl`} font-semibold`}>{title}</h2>}
                {subtitle && <h3 className={`font-sans text-lg font-medium`}>{subtitle}</h3>}
                {content && <Content className={`font-sans text-lg my-6 tracking-wide`} content={content} />}
                {ctas && (
                    <div className="flex gap-4 mt-6">
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
            </div>
        </div>
        
        {!isMobile && (
            <div className={`w-full md:w-[45%] flex ${isTop ? `flex-col-reverse` : `flex-col`} justify-start items-end gap-8`}>
                {secondImage ? (
                    <div className={``}>
                        <Image
                            className={``}
                            {...secImageProps}
                        />
                    </div>
                ) : null}
                {verticalImage ? (
                    <div className={`grid`}>
                        <Image
                            className={`w-[80%] ${isRight ? `` : `justify-self-end`}`}
                            {...vertImageProps}
                        />
                    </div>
                ) : null}
            </div>
        )}
      </div>
      <div className={`absolute ${isRight ? `left-0 justify-start` : `right-0 justify-end`} w-full h-full flex items-center`}>
            <div className={`relative bg-tan w-[90%] md:w-[60%] grid aspect-video overflow-hidden max-md:translate-y-[25%]`}>
                <Image
                    className={``}
                    {...graphicBgProps}
                    fill={true}
                    style={{ objectFit: "cover" }}
                />
            </div>
        </div>
    </div>
  );
};

export default GalleryType;
