import * as React from "react";
import { graphql } from 'relay-runtime';
import { ImageFragment$key } from "./__generated__/ImageFragment.graphql";
import { useFragment } from "react-relay";

const ImageFragment = graphql`
  fragment ImageFragment on Image 
    @argumentDefinitions(
        width: {
          type: "Int",
          defaultValue: null
        }
        height: {
          type: "Int",
          defaultValue: null
        }
      )
    {
      url (
        width: $width,
        height: $height
      )
      altText
    }
`;

type Props = {
  image: ImageFragment$key
  width?: number;
  height?: number;
  className?: string;
};

export default function Image({
  image,
  width,
  height,
  className,
}: Props): React.ReactElement {
  if (image == null) {
    return null;
  }

  const data = useFragment(ImageFragment, image)  

  return (
    <img
      key={data.url}
      src={data.url}
      alt={data.altText}
      width={width}
      height={height}
      className={className}
    />
  );
}
