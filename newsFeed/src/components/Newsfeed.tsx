import * as React from "react";
import Story from "./Story"
import { graphql } from 'relay-runtime';
import { useLazyLoadQuery } from "react-relay";
import type { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";

const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStories {
      id
      ...StoryFragment
    }
  }
`;

export default function Newsfeed() {
  const data = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});

  const stories = data.topStories;

  return (
    <div className="newsfeed">
      {stories.map(story => <Story story={story} key={story.id}/>)}
    </div>
  );
}
