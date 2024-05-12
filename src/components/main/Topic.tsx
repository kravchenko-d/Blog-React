import { faHeart as faHeartRegular, faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShare, faUser, faHeart as faHeartSolid, faThumbtack, faCross, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FC, useState, useContext, useRef } from "react"
// import { useOutletContext } from "react-router-dom"
// import { OutletContext } from "../../pages/MainWrapper"
import { AppContext, TopicContext } from "../../App"

type Props = {
    pinned?: (id: string) => void
    isPinned?: boolean
    text: string
    tag: string
    uniqueId: string
    author?: number
    changed?: boolean
}

const Topic: FC<Props> = ({id, pinned, isPinned = false, text, tag, uniqueId, author, changed}) => {

    const textRef = useRef<any>(null)

    const {newName, changeText, deleteTopic} = useContext(TopicContext)

    const [isLiked, setIsLiked] = useState(false)

    const [topicChange, setTopicChange] = useState(false)

    
    const handleOnChangeText = () => {
        const text = textRef.current.value
        if(text){
            changeText(text, uniqueId)
        }
        setTopicChange(false)
    }

    return <div style={{margin: '20px 8px', padding: '8px', backgroundColor: 'lightgray', borderRadius: '8px'}}
        className='topic'>
        <header>
        <FontAwesomeIcon style={{margin: '2px'}} icon={faUser} />
        <span style={{fontWeight: 'bold'}}>{author === 1 ? newName : 'Some user name'} ({uniqueId}) (#{tag})</span>
        {changed && <span style={{marginLeft: 'auto', color: 'green'}}>Изменено</span>}
        </header>
        {topicChange ?  <div><textarea ref={textRef}>{text}</textarea><button type='button' onClick={handleOnChangeText}>Сохранить</button></div> : <article>{text}</article>}
        <footer>
        <FontAwesomeIcon icon={faThumbtack}
                        color={isPinned ? "gold" : ""}
                        onClick={() => pinned && pinned(uniqueId)}
                        // onClick={pinned}
                        />
        <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular}
        color={isLiked ? "red" : ""}
        onClick={() => setIsLiked(!isLiked)} />
        <FontAwesomeIcon icon={faShare} />
        {author === 1 && <FontAwesomeIcon icon={faPenToSquare} color='green' cursor='pointer' style={{marginLeft: '16px'}} onClick={() => setTopicChange(!topicChange)}/>}
        {author === 1 && <FontAwesomeIcon icon={faXmark} color='red' onClick={() => deleteTopic(uniqueId)}/>}
        </footer>
    </div>
}

export default Topic