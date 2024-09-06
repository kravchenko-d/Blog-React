import { Outlet, useNavigate, useOutletContext } from "react-router-dom"
import Header from "../components/main/Header"
import { Topic } from "./Main"
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react"
import '../styles/main.scss'
import TopicsList from "../components/main/TopicsList"
import { AppContext, TopicContext } from "../App"

const Profile = () => {
  
    const navigate = useNavigate()

    const nameRef = useRef<any>(null)
    const surnameRef = useRef<any>(null)
    const emailRef = useRef<any>(null)

    const onSubmit = (event: any) => {
        event.preventDefault()
        // debugger
        const fields: any = {}
        for(const names of event.target){
          if (names.value && names.value){
            fields[names.name] = names.value
          }
        }
        changeUserFields(fields)
      }

      const changeUserFields = (fields: any) => {
        // debugger
        setUser({...user, ...fields})
      }

    const {user, setUser, changeUserField} = useContext(AppContext)
    // const {addTopic, addTag, deleteTag, changeName} = useContext(TopicContext)

    const {topics, tags, addTopic, newName} = useContext(TopicContext)

    const [filteredTopics, setFilteredTopics] = useState<Topic[]>([])

    const [name, setName] = useState(user.name)
    const [surname, setSurname] = useState(user.surname)
    const [email, setEmail] = useState(user.email)

    // const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    //     setName(event.target.value)
    // }

    // const changeSurname = (event: ChangeEvent<HTMLInputElement>) => {
    //     setSurname(event.target.value)
    // }

    // const changeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    //     setEmail(event.target.value)
    // }
    
    useEffect(() => {
        setFilteredTopics(topics.filter(({author}) => author !== -1)),
        nameRef.current.value = name,
        surnameRef.current.value = surname,
        emailRef.current.value = email
    }, [topics, newName])

    return <main>
      <aside></aside>
      <section>
        <h1>Profile</h1>
          <Header tags={tags} sendTopic={addTopic}/>
          <form onSubmit={onSubmit} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(0,0,0,0.1)', padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,.05)', margin: '8px 0'}}>
              <div style={{margin: '8px 0'}}>
                <input ref={nameRef} name='name' key='name' />
                <input ref={surnameRef} name='surname' key='surname' />
                <input ref={emailRef} name='email' key='email' />
              </div>
              <div>
              <button style={{margin: '4px'}}>Change data</button>
              </div>
          </form>
          <h2>My topics</h2>
          <TopicsList topics={filteredTopics}/>
          <div>
          <button style={{margin: '16px', cursor: 'pointer'}}
          onClick={() => navigate(-1)}>Back</button>
          </div>
      </section>
      <aside></aside>
    </main>
}

export default Profile