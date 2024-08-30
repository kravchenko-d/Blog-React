import { ChangeEvent, FC, useState } from "react"

type Props = {
    sendTopic: (text: string, tag: string) => void,
    tags: string[]
}


const NewTopic: FC<Props> = ({sendTopic, tags}) => {
    const [tag, setTag] = useState('')
    const [text, setText] = useState('')

    const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }

    const handleOnSubmit = () => {
        sendTopic(text, tag)
        setTag('')
        setText('')
    }
       
    const [addText, setAddText] = useState(false)
    return <form name="new_topic">
            {tags.map((el, id) => <div onClick={() => setTag(el)}
                                        key={`tag_${id}`}
                                        id={el === tag ? 'colored' : ''}>{el}</div>)}
        <textarea value={text} onChange={handleOnChange}></textarea>                     
        <button onClick={handleOnSubmit} type={'button'}></button>
    </form>
}

export default NewTopic
