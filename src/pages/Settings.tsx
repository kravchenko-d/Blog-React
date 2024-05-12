import { ChangeEvent, useEffect, useRef, useState, useContext } from "react"
import { useLocation, useNavigate, useOutletContext } from "react-router-dom"
import MainHeader from '../components/MainHeader'
import { OutletContext } from "./MainWrapper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { AppContext, TopicContext } from "../App"

const Settings = () => {

    const {topics, tags, addTopic, newName, addTag, deleteTag, changeName, tagDefault, setTagDefault} = useContext(TopicContext)
    // const {user, setUser, changeUserField} = useContext(AppContext)
    // const {addTopic, addTag, deleteTag, changeName} = useContext(TopicContext)

    const ref = useRef<any>(null)
    useEffect(() => {
        ref.current.value = newName
    }, [])
    const handleOnChangeName = () => {
        changeName(ref?.current?.value)
        ref.current.value = ''
    }

    const [text, setText] = useState('')

    const navigate = useNavigate()

    const handleOnSubmit = () => {
        addTag(text)        
        setText('')
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const changeTag = (event: ChangeEvent<HTMLInputElement>) => {
        setTagDefault(event.target.value)
    }

    return <main>
        <aside></aside>
        <section>
        <h1>Settings</h1>
            <div>
                {tags.map((tag, id) => <div key={`tag_${id}`}>
                    <input  type='radio'
                            name='default'
                            value={tag}
                            checked={tag === tagDefault}
                            key={`check_default_${id}`}
                            onChange={changeTag}/>
                <span>{tag}</span>
                {tags.length > 1 &&
                    <span onClick={() => deleteTag(tag)}><FontAwesomeIcon icon={faXmark}/></span>
                }
                </div>)}
                <span>New tag </span>    
                <input value={text} onChange={handleOnChange}></input>
                <button style={{backgroundColor: 'lightgray', margin: '4px'}} onClick={handleOnSubmit} type={'button'}>Add tag</button>
                <br/>
                <label>
                    <span>User name </span>
                    <input ref={ref}/>
                </label>
                <button style={{backgroundColor: 'lightgray', margin: '4px'}} onClick={handleOnChangeName}>Change name</button>
                <div>
                <button style={{backgroundColor: 'lightgray', margin: '16px', cursor: 'pointer'}}
                onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </section>
        <aside></aside>
    </main>
}

export default Settings