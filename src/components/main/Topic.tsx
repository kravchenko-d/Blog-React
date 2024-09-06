import { faHeart as faHeartRegular, faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faHeart as faHeartSolid, faThumbtack, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FC, useState, useContext, useRef } from "react"
import { TopicContext } from "../../App"

type Props = {
    pinned?: (id: string) => void
    isPinned?: boolean
    text: string
    tag: string
    uniqueId: string
    author?: number
    changed?: boolean
}

const Topic: FC<Props> = ({pinned, isPinned = false, text, tag, uniqueId, author, changed}) => {

    const textRef = useRef<any>(null)

    const {newName, changeText, deleteTopic} = useContext(TopicContext)

    const [isLiked, setIsLiked] = useState(false)

    const [topicChange, setTopicChange] = useState(false)

    const [topicText, setTopicText] = useState(text)

    
    const handleOnChangeText = () => {
        const text = textRef.current.value
        if(text){
            changeText(text, uniqueId)
        }
        setTopicChange(false)
    }

    return <div style={{margin: '20px 8px'}}
        className='topic'>
        <header>
        <FontAwesomeIcon style={{margin: '2px'}} icon={faUser} />
        <span style={{fontWeight: 'bold'}}>{author === 1 ? newName : 'Some user name'} ({uniqueId}) (#{tag})</span>
        {changed && <span style={{marginLeft: 'auto', color: 'green'}}>Изменено</span>}
        </header>
        {topicChange ?  <div>
            <textarea ref={textRef} value={topicText} onChange={e => setTopicText(e.target.value)}></textarea>
        <button type='button' onClick={handleOnChangeText} style={{backgroundColor: 'gray', color: 'white'}}>Сохранить</button>
        </div> : <article>
                    {text}
                </article>}
        <footer>
        <FontAwesomeIcon icon={faThumbtack}
                        color={isPinned ? "gold" : ""}
                        onClick={() => pinned && pinned(uniqueId)}
                        />
        <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular}
        color={isLiked ? "red" : ""}
        onClick={() => setIsLiked(!isLiked)} />
        {author === 1 && <FontAwesomeIcon icon={faPenToSquare} color='green' cursor='pointer' style={{marginLeft: '16px'}} onClick={() => setTopicChange(!topicChange)}/>}
        {author === 1 && <FontAwesomeIcon icon={faXmark} color='red' onClick={() => deleteTopic(uniqueId)}/>}
        </footer>
    </div>
}

export default Topic