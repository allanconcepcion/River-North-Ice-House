import { gql } from "@apollo/client";
import { Page_Flexiblecontent_Blocks_TextImage } from "graphql";
import { MEDIA_ITEM_FRAGMENT } from "fragments";
import clsx from "clsx";
import { FeaturedImage } from "components/FeaturedImage";
import Image from "next/image";
import { Content } from "components/Content";
import useMediaQuery from "utilities/useMediaQuery";
import { Button } from "components/Button";
import Link from "next/link";

interface BasicTypeProps extends Page_Flexiblecontent_Blocks_TextImage {
  className?: string;
}

const BasicType = ({
  className,
  preTitle,
  title,
  subtitle,
  addLineSeparator,
  contentOrList,
  content,
  list,
  useCtaBlock,
  ctas,
  ctaContent,
  ctaBlockLink,
  ctaBlockBackground,
  makeTitleExtraLarge,
  contentWidth,
  backgroundColor,
  imageOverhangsBackground,
  imageSide,
  wrapImageInLink,
  imageLink,
  image,
}: BasicTypeProps) => {

  const isMobile = useMediaQuery(`(max-width: 640px)`);


  const imageProps = {
    src: image?.sourceUrl || "",
    alt: image?.altText || title || "",
    width: image?.mediaDetails?.width || 0,
    height: image?.mediaDetails?.height || 0,
  };
  const graphicBgProps = {
    src: "./graphic-bg.svg",
    alt: "graphic background",
    // width: 993,
    // height: 612,
  };

    let bgColor = ``;
    if (backgroundColor === `tan-graphic`) {
        bgColor = `tan`;
    } else {
        bgColor = backgroundColor ?? `transparent`;
    }
  const isTanGrapic = backgroundColor === `tan-graphic`;

  let contentClasses = ``;
    let imgsClasses = ``;
    if(contentWidth === `even`) {
        contentClasses = `w-full md:w-1/2`;
        imgsClasses = `w-full md:w-1/2 ${imageOverhangsBackground && `md:-my-16`}`;
    } else if(contentWidth === `img-lgr`) {
        contentClasses = `w-full md:w-[40%]`;
        imgsClasses = `w-full md:w-[60%] ${imageOverhangsBackground && `md:-my-16`}`;
    } else if(contentWidth === `cont-lgr`) {
        contentClasses = `w-full md:w-[60%]`;
        imgsClasses = `w-full md:w-[40%] ${imageOverhangsBackground && `md:-my-16`}`;
    } else if(contentWidth === `img-xlgr`) {
        contentClasses = `w-full md:w-[30%]`;
        imgsClasses = `w-full md:w-[70%] ${imageOverhangsBackground && `md:-my-[4.9rem]`}`;
    }

    const isContent = contentOrList === `content`;
    const isList = contentOrList === `list`;
    const isIconList = contentOrList === `icon-list`;

  return (
    <div className={`${className ?? ``} bg-${bgColor} ${imageOverhangsBackground && `md:my-16`}`}>
      <div className={`max-w-[1300px] mx-auto flex ${imageSide ? `flex-col md:flex-row` : `flex-col-reverse md:flex-row-reverse`} justify-center items-center gap-4 md:gap-8 lg:px-20`}>
        <div className={`${contentClasses} p-4 text-black`}>
            {preTitle && <h4 className={`font-sans font-medium text-xl mb-4`}>{preTitle}</h4>}
            {title && <h2 className={`font-heading text-2xl ${makeTitleExtraLarge ? `md:text-5xl` : `md:text-3xl`} font-semibold`}>{title}</h2>}
            {subtitle && <h3 className={`font-sans text-lg font-medium`}>{subtitle}</h3>}
            {addLineSeparator && <hr className={`border-t-[1px] border-orange w-full mt-6`} />}
            {isContent ? (
                <>
                    {content && <Content className={`font-sans text-lg my-6 tracking-wide`} content={content} />}
                </>
            ) : (
                <>
                    {isList && list && (
                        <ul className={`font-sans text-lg list-disc list-inside my-3 md:ml-8 px-4`}>
                            {list?.map((item, index) => {
                                return (
                                    <li key={index} className={`font-sans text-lg tracking-wide`}>
                                        {item?.listItem}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    {isIconList && list && (
                        <div className={`grid grid-cols-2 md:ml-16 px-4 gap-x-6`}>
                        {list?.map((item, index) => {
                            return (
                                <div key={index} className={`flex gap-4 items-center my-3`}>
                                        <div className={`flex items-center justify-center`}>
                                            <Image
                                                src={`./icons/${item?.icon}-icon.svg`}
                                                alt={"list icons"}
                                                width={45}
                                                height={45}
                                                className={``}
                                            />
                                        </div>
                                        <p className={`font-sans text-lg tracking-wide`}>{item?.listItem}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
            {useCtaBlock ? (
                <>
                    {ctaBlockLink ? (
                        <Link
                            href={ctaBlockLink?.url ?? `#`}
                            target={ctaBlockLink?.target ?? `_self`}
                        >
                            <div className={`bg-${ctaBlockBackground} p-2`}>
                                {ctaContent && <Content className={`font-sans text-lg my-6`} content={ctaContent} />}
                            </div>
                        </Link>
                    ) : (
                        <div className={`bg-${ctaBlockBackground} p-2`}>
                            {ctaContent && <Content className={`font-sans text-lg my-6`} content={ctaContent} />}
                        </div>
                    )}
                </>
            ) : (
                <>
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
                </>
            )}
        </div>
        {image && (
            <div className={`${imgsClasses} ${imageOverhangsBackground && `max-md:bg-gradient-to-b from-white from-70% to-transparent to-70%`}`}>
                {wrapImageInLink && imageLink ? (
                    <Link
                        className={`relative flex group`}
                        href={imageLink?.url ?? '#'}
                        target={imageLink?.target ?? "_self"}
                    >
                        <Image
                            className={``}
                            {...imageProps}
                        />
                        <div className={`absolute z-[2] bottom-0 left-0 bg-tan px-6 py-2`}>
                            <p className={`font-sans text-black text-md group-hover:font-bold transition duration-300 ease-in-out`}>{imageLink?.title}</p>
                        </div>
                    </Link>
                ) : (
                    <Image
                        className={``}
                        {...imageProps}
                    />
                )}
            </div>
        )}
    </div>

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
  );
};

export default BasicType;
