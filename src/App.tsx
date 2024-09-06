import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const AppContext = createContext<any>({});

export const TopicContext = createContext<any>({});

export type Topic = {
  id: string;
  text: string;
  tag: string;
  author: number;
  changed: any;
  isLiked: boolean;
};

export type TopicContext = {
  topics: Topic[];
  tags: string[];
  newName: string;
  addTopic: (text: string, tags: string) => void;
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
  changeName: (author: string) => void;
  tagDefault: string;
  setTagDefault: (tag: string) => void;
  changeText: (text: string) => void;
};

function App({ children }: PropsWithChildren) {
  const [user, setUser] = useState<any>({
    name: 'Dmitrii',
    surname: 'Kravchenko',
    email: 'mail@mail.ru',
  });

  const [topics, setTopics] = useState<Topic[]>([]);
  const [tags, setTags] = useState(['meme', 'food', 'fitness', 'all']);
  const [newName, setNewName] = useState('Author');
  const [tagDefault, setTagDefault] = useState('');
  const [topicChange, setTopicChange] = useState(false);

  const changeUserField = (key: string, value: any) => {
    const newUser = { ...user, [key]: value };
    if (user[key] && value) {
      setUser(newUser);
    }
  };

  useEffect(() => {
    // постоянно отслеживает изменение какого-либо компонента
    const topics = Array(20)
      .fill('')
      .map((_, id) => ({
        id: `topic_${id + 1}`,
        text: 'lorem',
        tag: tags[Math.floor(Math.random() * tags.length)],
        author: Math.round(Math.random() * 10) % 2 ? -1 : 1,
        changed: false,
        isLiked: false,
      }));
    setTopics(topics);
    setTagDefault(tags[0]);
  }, []);

  const changeText = (text: string, topicId: string) => {
    const topicsList = [...topics.map((topic) => ({ ...topic }))];
    const indexTopic = topicsList.findIndex((topic) => topic.id === topicId);

    if (~indexTopic && topicsList[indexTopic].text !== text) {
      topicsList[indexTopic].text = text;
      topicsList[indexTopic].changed = true;

      setTopics([...topicsList]);
    }
  };

  const addTopic = (text: string, tag: string) => {
    const res: Topic[] = [...topics];
    const newTopic: Topic = {
      id: `topic_${Number(res[res.length - 1].id.slice(6)) + 1}`,
      text: text,
      tag: tag,
      author: 1,
      changed: false,
      isLiked: false,
    };

    res.push(newTopic);

    setTopics(res);
  };

  const deleteTopic = (topicId: string) => {
    const topicsList = [...topics.map((topic) => ({ ...topic }))];
    const indexTopic = topicsList.findIndex((topic) => topic.id === topicId);

    if (~topicId) {
      topicsList.splice(indexTopic, 1);
      setTopics(topicsList);
    }
  };

  const handleLike = (topicId: string) => {
    const topicsList = [...topics.map((topic) => ({ ...topic }))];
    const indexTopic = topicsList.findIndex((topic) => topic.id === topicId);

    if (~topicId) {
      topicsList[indexTopic].isLiked = !topicsList[indexTopic].isLiked;
    }
    setTopics(topicsList);
  };

  const addTag = (tag: string) => {
    const res: string[] = [...tags];
    const newTag: string = tag;
    if (!tags.includes(tag)) {
      res.push(newTag);
    }

    setTags(res);
  };

  const deleteTag = (tag: string) => {
    const res: string[] = [...tags];
    const newTag: string = tag;

    res.splice(res.indexOf(newTag), 1);

    setTags(res);

    let newDefaultTag = tagDefault;

    if (tag === tagDefault) {
      newDefaultTag = res[Math.floor(Math.random() * tags.length)];
      setTagDefault(newDefaultTag);
    }

    const alltopics = topics.map((topic) => ({
      ...topic,
      tag: topic.tag === tag ? newDefaultTag : topic.tag,
    }));

    setTopics(alltopics);
  };

  const changeName = (author: string) => {
    const nName: string = author;
    setNewName(nName);
  };

  return (
    <AppContext.Provider value={{ user, setUser, changeUserField }}>
      <TopicContext.Provider
        value={{
          topics,
          tags,
          addTopic,
          addTag,
          deleteTag,
          changeName,
          newName,
          tagDefault,
          setTagDefault,
          changeText,
          topicChange,
          setTopicChange,
          deleteTopic,
          handleLike,
        }}>
        {children}
      </TopicContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
