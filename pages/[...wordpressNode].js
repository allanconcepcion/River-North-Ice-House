import { getWordPressProps, WordPressTemplate } from "@faustwp/core";

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

// export function getStaticProps(ctx) {
//   return getWordPressProps({ ctx });
// }
export async function getStaticProps(ctx) {
  try {
    const props = await getWordPressProps({ ctx });
    return props;
  } catch (error) {
    console.error("Error fetching WordPress data:", error);
    return { notFound: true }; // Avoids breaking the build
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
