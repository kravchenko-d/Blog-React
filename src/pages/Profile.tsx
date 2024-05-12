import { Outlet, useNavigate, useOutletContext } from "react-router-dom"
import MainHeader from '../components/MainHeader'
import Header from "../components/main/Header"
import { Topic } from "./Main"
import { OutletContext } from "./MainWrapper"
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
        debugger
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
          {/* <MainHeader/> */}
          {/* <Header sendTopic={sendTopic}/> */}
          <Header tags={tags} sendTopic={addTopic}/>
          <form onSubmit={onSubmit}>
              <div>
                <input ref={nameRef} name='name' key='name' />
                <input ref={surnameRef} name='surname' key='surname' />
                <input ref={emailRef} name='email' key='email' />
              </div>
              <div>
              <button style={{backgroundColor: 'lightgray', margin: '4px'}}>Изменить данные</button>
              </div>
          </form>
          
          <TopicsList topics={filteredTopics}/>
          <div>
          <button style={{backgroundColor: 'lightgray', margin: '16px', cursor: 'pointer'}}
          onClick={() => navigate(-1)}>Back</button>
          </div>
      </section>
      <aside></aside>
    </main>
}

export default Profile