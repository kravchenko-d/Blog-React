import { useEffect, useState, useContext } from 'react';
import Header from '../components/main/Header';
import TopicsList from '../components/main/TopicsList';
import '../styles/main.scss';
import { TopicContext, Topic as TTopic } from '../App';
import PinnedTopics from '../components/PinnedTopics';

const Main = () => {
  const { topics, tags, addTopic, newName, pinned, topicActiveIds } = useContext(TopicContext);

 
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<TTopic[]>([]);

  useEffect(() => {
    setActiveTags([]);
  }, [tags]);

  useEffect(() => {
    setFilteredTopics(
      topics
        .slice()
        .reverse()
        .filter((topic: any) => activeTags.length === 0 || activeTags.includes(topic.tag)),
    ); // выводит топики в обратном порядке
  }, [activeTags, topics, newName]);

  const changeActiveTags = (item: string) => {
    const items = [...activeTags];

    const index = items.findIndex((i) => i === item);
    if (index === -1) {
      items.push(item);
    } else {
      items.splice(index, 1);
    }

    setActiveTags(items);
  };

  return (
    <>
      <main>
        <aside>
          <h3 style={{ marginLeft: '8px' }}>Choose tag</h3>
          {tags.map((item: string, id: number) => (
            <div
              key={id}
              onClick={() => changeActiveTags(item)}
              className={'tag' + (activeTags.includes(item) ? ' active' : '')}>
              #{item}
            </div>
          ))}
        </aside>
        <section>
          <h1>
            Blog
            {activeTags.length > 0 &&
              activeTags.map((tag: string, id: number) => (
                <span key={id} style={{ margin: '0 8px' }}>
                  #{tag}
                </span>
              ))}
          </h1>
          <Header sendTopic={addTopic} tags={tags} />
          <TopicsList topics={filteredTopics} pinned={pinned} topicActiveIds={topicActiveIds} />
        </section>
        <PinnedTopics
          filteredTopics={filteredTopics}
          pinned={pinned}
          topicActiveIds={topicActiveIds}
        />
      </main>
    </>
  );
};

export default Main;
