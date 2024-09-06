import { FC } from 'react';
import Topic from './main/Topic';

type Props = {
  filteredTopics: any[];
  pinned?: (id: string) => void;
  topicActiveIds?: string[];
};

const PinnedTopics: FC<Props> = ({ filteredTopics, pinned }) => {

  return (
    <aside>
        <h3 style={{marginLeft: '8px'}}>Pinned topics</h3>
      {filteredTopics
        .filter((topic) => topic.isPinned)
        .map((topic) => (
          <Topic
            key={topic.id}
            text={topic.text}
            tag={topic.tag}
            uniqueId={topic.id}
            pinned={pinned}
            author={topic.author}
            isPinned={true}
            isLiked={topic.isLiked}
          />
        ))}
    </aside>
  );
};

export default PinnedTopics;
