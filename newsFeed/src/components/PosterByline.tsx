import * as React from "react";
import Image from "./Image";
import { graphql } from "relay-runtime";
import { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";
import { useFragment, useQueryLoader } from "react-relay";
import Hovercard from './Hovercard';
import PosterDetailsHovercardContents from './PosterDetailsHovercardContents';
import type {PosterDetailsHovercardContentsQuery as HovercardQueryType} from './__generated__/PosterDetailsHovercardContentsQuery.graphql';
import {PosterDetailsHovercardContentsQuery} from './PosterDetailsHovercardContents';

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    id
    name
    profilePicture {
      ...ImageFragment @arguments(width: 60, height: 60)
    }
  }
`

export type Props = {
  poster: PosterBylineFragment$key
};

export default function PosterByline({ poster }: Props): React.ReactElement {
  if (poster == null) {
    return null;
  }

  const data = useFragment(PosterBylineFragment, poster)
  const [hovercardQueryRef, loadHovercardQuery] = useQueryLoader<HovercardQueryType>(PosterDetailsHovercardContentsQuery);
  const hoverRef = React.useRef(null);

  function onBeginHover() {
    loadHovercardQuery({posterID: data.id});
  }

  return (
    <div className="byline" ref={hoverRef}>
      <Image
        image={data.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{data.name}</div>
      <Hovercard targetRef={hoverRef} onBeginHover={onBeginHover}>
        <PosterDetailsHovercardContents queryRef={hovercardQueryRef} />
      </Hovercard>
    </div>
  );
}
