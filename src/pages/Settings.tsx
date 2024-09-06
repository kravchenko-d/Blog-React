import { ChangeEvent, useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { TopicContext } from '../App';

const Settings = () => {
  const { tags, newName, addTag, deleteTag, changeName, tagDefault, setTagDefault } =
    useContext(TopicContext);

  const ref = useRef<any>(null);
  
  useEffect(() => {
    ref.current.value = newName;
  }, []);

  const handleOnChangeName = () => {
    changeName(ref?.current?.value);
    ref.current.value = '';
  };

  const [text, setText] = useState('');

  const navigate = useNavigate();

  const handleOnSubmit = () => {
    addTag(text);
    setText('');
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const changeTag = (event: ChangeEvent<HTMLInputElement>) => {
    setTagDefault(event.target.value);
  };

  return (
    <main>
      <aside></aside>
      <section>
        <h1>Settings</h1>
        <div>
          <div
            style={{
              border: '1px solid rgba(0,0,0,0.1)',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0,0,0,.05)',
              margin: '8px 0',
            }}>
            {tags.map((tag: string, id: number) => (
              <div key={`tag_${id}`}>
                <input
                  type="radio"
                  name="default"
                  value={tag}
                  checked={tag === tagDefault}
                  key={`check_default_${id}`}
                  onChange={changeTag}
                />
                <span>{tag}</span>
                {tags.length > 1 && (
                  <span onClick={() => deleteTag(tag)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                )}
              </div>
            ))}
            <form>
              <span>New tag </span>
              <input value={text} onChange={handleOnChange} name="new_tag" ></input>
              <button style={{ margin: '4px' }} onClick={handleOnSubmit} type={'button'}>
                Add tag
              </button>
            </form>
          </div>
          <form
            style={{
              border: '1px solid rgba(0,0,0,0.1)',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0,0,0,.05)',
              margin: '8px 0',
            }}>
            <label>
              <span>User name </span>
              <input ref={ref} name='user_name' />
            </label>
            <button style={{ margin: '4px' }} onClick={handleOnChangeName} type={'button'}>
              Change name
            </button>
          </form>

          <div>
            <button style={{ margin: '16px', cursor: 'pointer' }} onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </section>
      <aside></aside>
    </main>
  );
};

export default Settings;
