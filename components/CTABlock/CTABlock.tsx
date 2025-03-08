import { gql } from "@apollo/client";
import { Page_Flexiblecontent_Blocks_CtaBlock } from "graphql";
import { MEDIA_ITEM_FRAGMENT } from "fragments";
import clsx from "clsx";
import { FeaturedImage } from "components/FeaturedImage";
import Image from "next/image";
import { Content } from "components/Content";
import useMediaQuery from "utilities/useMediaQuery";
import { Button } from "components/Button";

interface CTABlockProps extends Page_Flexiblecontent_Blocks_CtaBlock {
  className?: string;
}

const CTABlock = ({
  className,
  sectionId,
  preTitle,
  title,
  content,
  link,
  background,
  backgroundImage,
}: CTABlockProps) => {
    const isMobile = useMediaQuery(`(max-width: 768px)`);

    let bgColor = ``;
    if (background === `tan-graphic`) {
        bgColor = `tan`;
    } else {
        bgColor = background ?? `transparent`;
    }
  const isTanGrapic = background === `tan-graphic`;

  const imageProps = {
    src: backgroundImage?.sourceUrl || "",
    alt: backgroundImage?.altText || title || "",
    // width: backgroundImage?.mediaDetails?.width || 0,
    // height: backgroundImage?.mediaDetails?.height || 0,
};

  const graphicBgProps = {
    src: "./graphic-bg.svg",
    alt: "graphic background",
    // width: 993,
    // height: 612,
  };

  return (
    <section id={`${sectionId ?? ``}`} className={`${className ?? ``} ${sectionId ? `scroll-mt-[180px]` : ``} relative flex flex-col bg-${bgColor}`}>
        <div className={`relative z-[2] w-full h-full ${background ===`img-bg` && `bg-true-black bg-opacity-40`}`}>
            <div className={`relative z-[2] max-w-[700px] mx-auto flex flex-col px-4 py-20`}>
                {preTitle && <h3 className={`font-sans text-xl sm:text-2xl ${background ===`img-bg` ? `text-white` : `text-black`} text-center uppercase mb-4`}>{preTitle}</h3>}
                {title && <h2 className={`font-heading text-2xl sm:text-5xl font-bold ${background ===`img-bg` ? `text-white` : `text-black`} text-center uppercase`}>{title}</h2>}
                {link && (
                    <div className="relative z-[2] max-w-[1300px] mx-auto flex gap-4 mt-6">
                        <Button
                            href={link?.url ?? `#`}
                            target={link?.target ?? `_self`}
                            type={background ===`img-bg` ? `wht-circled` : `org-circled`}
                            className={``}
                        >
                            {link?.title}
                        </Button>
                    </div>
                )}
            </div>
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
            {background ===`img-bg` && backgroundImage && (
                <div className={`absolute w-full h-full flex items-center overflow-hidden`}>
                    <Image
                        className={``}
                        {...imageProps}
                        fill={true}
                        style={{ objectFit: "cover" }}
                    />
                </div>
            )}
    </section>
  );
};

export default CTABlock;


CTABlock.fragments = {
  entry: gql`
    fragment CTABlockFragment on Page_Flexiblecontent_Blocks_CtaBlock {
        __typename
        sectionId
        preTitle
        title
        content
        link {
            title
            url
            target
        }
        background
        backgroundImage {
            ...MediaItemFragment
        }
    }
    ${MEDIA_ITEM_FRAGMENT}
  `,
};
