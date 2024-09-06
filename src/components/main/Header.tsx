import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useState } from "react"
import NewTopic from "./NewTopic"

type Props = {
    sendTopic: (text: string, tag: string) => void
    tags: string[]
}

const Header: FC<Props> = ({sendTopic, tags}) => {

    const [tag, setTag] = useState('')
    const [text, setText] = useState('')
    const [addText, setAddText] = useState(false)

    const handleOnSumbit = (text: string, tag: string) => {
        sendTopic(text, tag)
        setTag('')
        setText('')
        setAddText(false)
    }

    return <header style={{display: 'flex', flexDirection: 'column', cursor: 'pointer'}}>
        <div onClick={() => setAddText(!addText)}>
            <span style={{marginRight: '12px', fontWeight: 'bold'}}>Add topic</span>
            <FontAwesomeIcon style={{fontSize: '24px'}} icon={faPenToSquare}
            />
        </div>
        
         { addText && <NewTopic tags={tags} sendTopic={handleOnSumbit}/> }        
    </header>
}

export default Header