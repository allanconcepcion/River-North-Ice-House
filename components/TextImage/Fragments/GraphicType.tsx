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

interface GraphicTypeProps extends Page_Flexiblecontent_Blocks_TextImage {
  className?: string;
}

const GraphicType = ({
  className,
  preTitle,
  title,
  subtitle,
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
  imageSide,
  wrapImageInLink,
  imageLink,
  imageGraphic,
}: GraphicTypeProps) => {

  const isMobile = useMediaQuery(`(max-width: 768px)`);

  const imageGraphicProps = {
    src: imageGraphic?.sourceUrl || "",
    alt: imageGraphic?.altText || title || "",
    width: imageGraphic?.mediaDetails?.width || 0,
    height: imageGraphic?.mediaDetails?.height || 0,
  };
  const graphicProps = {
    src: "./circle-graphic.svg",
    alt: "graphic background",
    width: 993,
    height: 612,
  };


  let contentClasses = ``;
    let imgsClasses = ``;
    if(contentWidth === `even`) {
        contentClasses = `w-full md:w-[60%]`;
        imgsClasses = `w-full md:w-1/2`;
    } else if(contentWidth === `img-lgr`) {
        contentClasses = `w-full md:w-[40%]`;
        imgsClasses = `w-full md:w-[70%]`;
    } else if(contentWidth === `cont-lgr`) {
        contentClasses = `w-full md:w-[70%]`;
        imgsClasses = `w-full md:w-[40%]`;
    }

    const isContent = contentOrList === `content`;
    const isList = contentOrList === `list`;
    const isIconList = contentOrList === `icon-list`;

  return (
    <div className={`${className ?? ``}`}>
      <div className={`max-w-[1300px] mx-auto relative flex flex-col ${imageSide ? `md:flex-row` : `md:flex-row-reverse`} justify-center items-center gap-4 md:gap-8 lg:px-20`}>
        <div className={`relative z-[1] ${contentClasses} text-black ${imageSide ? `md:-mr-28` : `md:-ml-28`}`}>
            {preTitle && <h4 className={`relative font-sans font-medium text-xl mb-4 p-4 z-[1]`}>{preTitle}</h4>}
            {title && <h2 className={`relative font-heading text-2xl ${makeTitleExtraLarge ? `md:text-5xl` : `md:text-3xl`} font-semibold p-4 z-[1]`}>{title}</h2>}
            {subtitle && <h3 className={`relative font-sans text-lg font-medium p-4 z-[1]`}>{subtitle}</h3>}
            {imageGraphic && (
                <div className={`flex md:hidden ${imgsClasses} -mt-16`}>
                    {wrapImageInLink && imageLink ? (
                        <Link
                            className={`relative flex group`}
                            href={imageLink?.url ?? '#'}
                            target={imageLink?.target ?? "_self"}
                        >
                            <Image
                                className={``}
                                {...imageGraphicProps}
                            />
                            <div className={`absolute z-[2] bottom-0 left-0 bg-tan px-6 py-2`}>
                                <p className={`font-sans text-black text-md group-hover:font-bold transition duration-300 ease-in-out`}>{imageLink?.title}</p>
                            </div>
                            <div className={`absolute w-[80%] h-full flex items-center overflow-hidden`}>
                                <Image
                                    className={``}
                                    {...graphicProps}
                                />
                            </div>
                        </Link>
                    ) : (
                        <div className={`relative flex`}>
                            <Image
                                className={`relative z-[2]`}
                                {...imageGraphicProps}
                            />
                            <div className={`absolute right-0 w-[75%] h-full flex items-start overflow-hidden`}>
                                <Image
                                    className={``}
                                    {...graphicProps}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
            {isContent ? (
                <>
                    {content && <Content className={`font-sans text-lg my-6 tracking-wide p-4`} content={content} />}
                </>
            ) : (
                <>
                    {isList && list && (
                        <ul className={`font-sans text-lg list-disc list-inside columns-2 my-3 md:ml-8 px-8`}>
                            {list?.map((item, index) => {
                                return (
                                    <li key={index} className={`tracking-wide`}>
                                        {item?.listItem}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    {isIconList && list && (
                        <div className={`grid grid-cols-2 md:ml-16 px-8 gap-x-6`}>
                            {list?.map((item, index) => {
                                return (
                                    <div key={index} className={`flex gap-4 items-center my-3`}>
                                        <div className={`flex items-center justify-center flex-none max-sm:max-w-[35px]`}>
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
                <div className={`px-4`}>
                    {ctaBlockLink ? (
                        <Link
                            href={ctaBlockLink?.url ?? `#`}
                            target={ctaBlockLink?.target ?? `_self`}
                        >
                            <div className={`bg-${ctaBlockBackground} p-2`}>
                                {ctaContent && <Content className={`font-sans text-lg my-6 tracking-wide`} content={ctaContent} />}
                            </div>
                        </Link>
                    ) : (
                        <div className={`bg-${ctaBlockBackground} p-2`}>
                            {ctaContent && <Content className={`font-sans text-lg my-6 tracking-wide`} content={ctaContent} />}
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {ctas && (
                        <div className="flex gap-4 mt-6 mx-4">
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
        {imageGraphic && (
            <div className={`max-md:hidden ${imgsClasses}`}>
                {wrapImageInLink && imageLink ? (
                    <Link
                        className={`relative flex group`}
                        href={imageLink?.url ?? '#'}
                        target={imageLink?.target ?? "_self"}
                    >
                        <Image
                            className={``}
                            {...imageGraphicProps}
                        />
                        <div className={`absolute z-[2] bottom-0 left-0 bg-tan px-6 py-2`}>
                            <p className={`font-sans text-black text-md group-hover:font-bold transition duration-300 ease-in-out`}>{imageLink?.title}</p>
                        </div>
                        <div className={`absolute w-[80%] h-full flex items-center overflow-hidden`}>
                            <Image
                                className={``}
                                {...graphicProps}
                            />
                        </div>
                    </Link>
                ) : (
                    <div className={`relative flex`}>
                        <Image
                            className={`relative z-[2]`}
                            {...imageGraphicProps}
                        />
                        <div className={`absolute right-0 w-[75%] h-full flex items-start overflow-hidden`}>
                            <Image
                                className={``}
                                {...graphicProps}
                            />
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default GraphicType;
