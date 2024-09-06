import { ChangeEvent, FC, useState } from 'react';

type Props = {
  sendTopic: (text: string, tag: string) => void;
  tags: string[];
};

const NewTopic: FC<Props> = ({ sendTopic, tags }) => {
  const [tag, setTag] = useState('all');
  const [text, setText] = useState('');

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleOnSubmit = () => {
    sendTopic(text, tag);
    setTag('');
    setText('');
  };

  return (
    <form
      name="new_topic"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid rgba(0,0,0,0.1)',
        padding: '8px',
        borderRadius: '8px',
        backgroundColor: 'rgba(0,0,0,.05)',
        margin: '8px 0',
      }}>
      <div>
        {tags.map((el, id) => (
          <div onClick={() => setTag(el)} key={`tag_${id}`} id={el === tag ? 'colored' : ''}>
            {el}
          </div>
        ))}
      </div>
      <textarea
        name="new_topic_text"
        value={text}
        onChange={handleOnChange}
        style={{ width: '100%', height: '100px', margin: '12px', borderRadius: '8px' }}></textarea>
      <button onClick={handleOnSubmit} type={'button'}>
        Add
      </button>
    </form>
  );
};

export default NewTopic;
