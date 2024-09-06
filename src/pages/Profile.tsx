import { useNavigate } from 'react-router-dom';
import Header from '../components/main/Header';
import { useContext, useEffect, useRef, useState } from 'react';
import '../styles/main.scss';
import TopicsList from '../components/main/TopicsList';
import { AppContext, TopicContext, Topic } from '../App';

const Profile = () => {
  const navigate = useNavigate();

  const nameRef = useRef<any>(null);
  const surnameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);

  const onSubmit = (event: any) => {
    event.preventDefault();
    const fields: any = {};
    for (const names of event.target) {
      if (names.value && names.value) {
        fields[names.name] = names.value;
      }
    }
    changeUserFields(fields);
  };

  const changeUserFields = (fields: any) => {
    setUser({ ...user, ...fields });
  };

  const { user, setUser } = useContext(AppContext);

  const { topics, tags, addTopic, newName } = useContext(TopicContext);

  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);

  useEffect(() => {
    setFilteredTopics(topics.filter((topic: any) => topic.author !== -1)),
      (nameRef.current.value = user.name),
      (surnameRef.current.value = user.surname),
      (emailRef.current.value = user.email);
  }, [topics, newName]);

  return (
    <main>
      <aside></aside>
      <section>
        <h1>Profile</h1>
        <Header tags={tags} sendTopic={addTopic} />
        <form
          onSubmit={onSubmit}
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
          <div style={{ margin: '8px 0' }}>
            <input ref={nameRef} name="name" key="name" autoComplete="on" />
            <input ref={surnameRef} name="surname" key="surname" autoComplete="on" />
            <input ref={emailRef} name="email" key="email" autoComplete="on" />
          </div>
          <div>
            <button style={{ margin: '4px' }}>Change data</button>
          </div>
        </form>
        <h2>My topics</h2>
        <TopicsList topics={filteredTopics} />
        <div>
          <button style={{ margin: '16px', cursor: 'pointer' }} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </section>
      <aside></aside>
    </main>
  );
};

export default Profile;
