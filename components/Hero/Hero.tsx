import { gql } from "@apollo/client";
import { Page_Flexiblecontent_Blocks_Hero } from "graphql";
import { MEDIA_ITEM_FRAGMENT } from "fragments";
import clsx from "clsx";
import { FeaturedImage } from "components/FeaturedImage";
import Image from "next/image";
import { Content } from "components/Content";
import useMediaQuery from "utilities/useMediaQuery";
import he from 'he';
interface HeroProps extends Page_Flexiblecontent_Blocks_Hero {
  className?: string;
}

const Hero = ({
  className,
  title,
  stylishTitle,
  variant,
  ctas,
  image,
  content,
}: HeroProps) => {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";

  const isMobile = useMediaQuery(`(max-width: 640px)`);

  const mobileStylishTitle = stylishTitle?.split(".").join(".\n");

  const { sourceUrl = "", altText, mediaDetails = {} } = image || {};
  const imageProps = {
    src: sourceUrl || "",
    alt: altText || title || "",
    width: mediaDetails?.width || 0,
    height: mediaDetails?.height || 0,
  };

  let wrapperClass = clsx(``);

  let innerWrapperClass = clsx(
    `items-center py-6 md:py-12`,
    isSecondary
      ? `max-w-[1300px] mx-auto flex flex-col md:flex-row items-center`
      : `mx-auto flex flex-col-reverse sm:flex-col items-center`
  );

  let innerItemClass = clsx(
    `flex flex-col gap-4`,
    (isSecondary && image) ? `md:w-1/2` : `md:w-full justify-center items-center max-sm:pt-6`,
    isSecondary ? `` : `max-w-[1300px]`
  );

  return (
    <section className={`${className ?? ``} ${wrapperClass}`}>
      <div className={innerWrapperClass}>
        <div className={innerItemClass}>
          {title && <h1 className={`${isPrimary ? `font-sans` : `font-heading`} text-center text-xl sm:text-2xl text-black uppercase`}>{he.decode(title)}</h1>}
          {stylishTitle && <h2 className={`whitespace-pre-line text-center font-heading leading-none text-[11vw] sm:max-[1500px]:text-[5.3vw] min-[1500px]:text-[5rem] text-balance text-teal font-bold uppercase`}>{isMobile ? mobileStylishTitle : stylishTitle}</h2>}
          {content && <Content className={`font-sans text-lg`} content={content} />}
          {ctas && (
            <div className="flex gap-4">
              {ctas.map((cta, index) => {
                return (
                  <a
                    key={index}
                    href={cta?.link?.url ?? `#`}
                    target={cta?.link?.target ?? `_self`}
                    className={`rounded-full bg-primary py-2 px-4 font-bold text-white font-sans uppercase hover:bg-white transition duration-300 ease-in-out hover:shadow-lg hover:border-primary hover:border-1 hover:text-primary`}
                  >
                    {cta?.link?.title}
                  </a>
                );
              })}
            </div>
          )}
        </div>
        {image ? (
          <div className={innerItemClass}>
            {/* <FeaturedImage image={image} /> */}
            <Image
              className={`rounded-lg`}
              {...imageProps}
              // fill={true}
              loading="eager"
              // style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;


Hero.fragments = {
  entry: gql`
    fragment HeroFragment on Page_Flexiblecontent_Blocks_Hero {
      __typename
      title
      stylishTitle
      variant
      content
      ctas {
        link {
          title
          url
          target
        }
        type
      }
      image {
        ...MediaItemFragment
      }
    }
    ${MEDIA_ITEM_FRAGMENT}
  `,
};
