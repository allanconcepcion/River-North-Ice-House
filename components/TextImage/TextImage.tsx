import { gql } from "@apollo/client";
import { Page_Flexiblecontent_Blocks_TextImage } from "graphql";
import { MEDIA_ITEM_FRAGMENT } from "fragments";
import clsx from "clsx";
import { FeaturedImage } from "components/FeaturedImage";
import Image from "next/image";
import { Content } from "components/Content";
import useMediaQuery from "utilities/useMediaQuery";
import BasicType from "./Fragments/BasicType";
import GraphicType from "./Fragments/GraphicType";
import GalleryType from "./Fragments/GalleryType";
import { Button } from "components/Button";

interface TextImageProps extends Page_Flexiblecontent_Blocks_TextImage {
  className?: string;
}

const TextImage = ({
  className,
  sectionId,
  variant,
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
  imageLayout,
  imageOverhangsBackground,
  imageSide,
  wrapImageInLink,
  imageLink,
  image,
  imageGraphic,
  largestImage,
  secondImage,
  verticalImage,
}: TextImageProps) => {
    const isMobile = useMediaQuery(`(max-width: 768px)`);



  return (
    <section id={`${sectionId ?? ``}`} className={`${className ?? ``} ${sectionId ? `scroll-mt-[180px]` : ``}`}>
        {(variant === "basic") && (
            <BasicType
                className={``}
                variant={variant}
                preTitle={preTitle}
                title={title}
                subtitle={subtitle}
                addLineSeparator={addLineSeparator}
                contentOrList={contentOrList}
                content={content}
                list={list}
                useCtaBlock={useCtaBlock}
                ctas={ctas}
                ctaContent={ctaContent}
                ctaBlockLink={ctaBlockLink}
                ctaBlockBackground={ctaBlockBackground}
                makeTitleExtraLarge={makeTitleExtraLarge}
                backgroundColor={backgroundColor}
                contentWidth={contentWidth}
                imageOverhangsBackground={imageOverhangsBackground}
                imageSide={imageSide}
                wrapImageInLink={wrapImageInLink}
                imageLink={imageLink}
                image={image}
                imageGraphic={imageGraphic}
            />
        )}
        {(variant === "graphic-img") && (
            <GraphicType
                className={``}
                variant={variant}
                preTitle={preTitle}
                title={title}
                subtitle={subtitle}
                contentOrList={contentOrList}
                content={content}
                list={list}
                useCtaBlock={useCtaBlock}
                ctas={ctas}
                ctaContent={ctaContent}
                ctaBlockLink={ctaBlockLink}
                ctaBlockBackground={ctaBlockBackground}
                makeTitleExtraLarge={makeTitleExtraLarge}
                backgroundColor={backgroundColor}
                contentWidth={contentWidth}
                imageOverhangsBackground={imageOverhangsBackground}
                imageSide={imageSide}
                wrapImageInLink={wrapImageInLink}
                imageLink={imageLink}
                image={image}
                imageGraphic={imageGraphic}
            />
        )}
        {variant === "gallery" && (
            <GalleryType
                className={``}
                preTitle={preTitle}
                title={title}
                subtitle={subtitle}
                content={content}
                ctas={ctas}
                makeTitleExtraLarge={makeTitleExtraLarge}
                imageLayout={imageLayout}
                largestImage={largestImage}
                secondImage={secondImage}
                verticalImage={verticalImage}
            />
        )}
    </section>
  );
};

export default TextImage;


TextImage.fragments = {
  entry: gql`
    fragment TextImageFragment on Page_Flexiblecontent_Blocks_TextImage {
        __typename
        sectionId
        variant
        preTitle
        title
        subtitle
        addLineSeparator
        contentOrList
        content
        list {
            icon
            listItem
        }
        useCtaBlock
        ctas {
            type
            link {
                title
                url
                target
            }
        }
        ctaContent
        ctaBlockLink {
            title
            target
            url
        }
        ctaBlockBackground
        makeTitleExtraLarge
        contentWidth
        backgroundColor
        imageLayout
        imageOverhangsBackground
        imageSide
        wrapImageInLink
        imageLink {
            title
            target
            url
        }
        image {
            ...MediaItemFragment
        }
        imageGraphic {
            ...MediaItemFragment
        }
        largestImage {
            ...MediaItemFragment
        }
        secondImage {
            ...MediaItemFragment
        }
        verticalImage {
            ...MediaItemFragment
        }
    }
    ${MEDIA_ITEM_FRAGMENT}
  `,
};
