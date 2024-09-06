import { FC } from 'react';
import Topic from './Topic';

type Props = {
  topics: any[];
  pinned?: (id: string) => void;
  topicActiveIds?: string[];
};

const TopicsList: FC<Props> = ({ topics, pinned, topicActiveIds = [] }) => {
  return (
    <div className="topics-list">
      {topics.map((topic) => (
        <Topic
          key={topic.id}
          isPinned={topicActiveIds.includes(topic.id)}
          uniqueId={topic.id}
          tag={topic.tag}
          text={topic.text}
          author={topic.author}
          pinned={pinned}
          changed={topic.changed}
          isLiked={topic.isLiked}
        />
      ))}
    </div>
  );
};

export default TopicsList;
