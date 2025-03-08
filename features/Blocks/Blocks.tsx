import dynamic from "next/dynamic";
// Hero: (Non dynamic import) Above the fold content
import { Hero, TextImage, Gallery, CTABlock, ListBlock } from "components";
// Dynamic Imports: Below the fold content
import { FORM_BLOCK_FRAGMENT } from "components/Form/Form";
const Form = dynamic(() => import("components/Form/Form"), {
  ssr: true,
});

import {
  Page_Flexiblecontent_Blocks,
  Page_Flexiblecontent_Blocks_Hero,
  Page_Flexiblecontent_Blocks_Form,
  Page_Flexiblecontent_Blocks_TextImage,
  Page_Flexiblecontent_Blocks_Gallery,
  Page_Flexiblecontent_Blocks_CtaBlock,
  Page_Flexiblecontent_Blocks_ListBlock,
} from "graphql";
import { gql } from "@apollo/client";

interface BlocksProps {
  blocks: Page_Flexiblecontent_Blocks[];
}

interface BlockProps {
  block: Page_Flexiblecontent_Blocks;
}

const prefix = "Page_Flexiblecontent_Blocks_";

const Block = ({ block }: BlockProps) => {
  const { __typename } = block;

  let name = __typename && __typename.replace(prefix, "");

  switch (name) {
    // Hero
    case "Hero": {
      return <Hero {...(block as Page_Flexiblecontent_Blocks_Hero)} />;
    }
    // Form
    case "Form": {
      return <Form {...(block as Page_Flexiblecontent_Blocks_Form)} />;
    }

    // TextImage
    case "TextImage": {
      return <TextImage {...(block as Page_Flexiblecontent_Blocks_TextImage)} />;
    }

    // Gallery
    case "Gallery": {
      return <Gallery {...(block as Page_Flexiblecontent_Blocks_Gallery)} />;
    }
    // CTABlock
    case "CtaBlock": {
      return <CTABlock {...(block as Page_Flexiblecontent_Blocks_CtaBlock)} />;
    }

    // ListBlock
    case "ListBlock": {
      return <ListBlock {...(block as Page_Flexiblecontent_Blocks_ListBlock)} />;
    }

    default: {
      return null;
    }
  }
};

const Blocks = ({ blocks = [] }: BlocksProps): JSX.Element => {
  return (
    <>
      {blocks &&
        blocks.map((block, index) => (
          <Block block={block} key={`block-${index}`} />
        ))}
    </>
  );
};

export default Blocks;

Blocks.fragments = {
  entry: gql`
    fragment BlocksFragment on Page_Flexiblecontent {
      blocks {
        ... on Page_Flexiblecontent_Blocks_Hero {
          ...HeroFragment
        }
        ... on Page_Flexiblecontent_Blocks_Form {
          ...FormBlockFragment
        }
        ... on Page_Flexiblecontent_Blocks_TextImage {
          ...TextImageFragment
        }
        ... on Page_Flexiblecontent_Blocks_Gallery {
          ...GalleryFragment
        }
        ... on Page_Flexiblecontent_Blocks_CtaBlock {
          ...CTABlockFragment
        }
        ... on Page_Flexiblecontent_Blocks_ListBlock {
          ...ListBlockFragment
        }
      }
    }
    ${Hero.fragments.entry}
    ${FORM_BLOCK_FRAGMENT}
    ${TextImage.fragments.entry}
    ${Gallery.fragments.entry}
    ${CTABlock.fragments.entry}
    ${ListBlock.fragments.entry}
  `,
};
