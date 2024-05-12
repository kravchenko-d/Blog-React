import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChangeEvent, FC, useState } from "react"
// import { tagsData } from "../../pages/Main"
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


    // const [tagColor, setTagColor] = useState(false)
    // const selectTags = () => {
    //     setTag(tag)
    //     setTagColor(!tagColor)
    // }

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }

    return <header>
        <FontAwesomeIcon style={{fontSize: '24px'}} icon={faPenToSquare}
        onClick={() => setAddText(!addText) }
         />
         { addText && <NewTopic tags={tags} sendTopic={handleOnSumbit}/> }

        <span></span>
    </header>
}

export default Header