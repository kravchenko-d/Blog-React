import { Outlet } from "react-router-dom"
import Header from "./Header"
import { useEffect, useState } from "react"
import Topic from "./Topic"

export type Topic = {
    id: string,
    text: string,
    tag: string
}

export const tagsData = ['meme', 'food', 'fitness', 'all']


const MetaHeader = () => {
    useEffect(() => { // постоянно отслеживает изменение какого-либо компонента
        const topics = Array(20).fill('').map((_, id) => ({
            id: `topic_${id+1}`,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam accusamus magnam recusandae incidunt architecto similique voluptates expedita iure, minima reiciendis dignissimos! Beatae veritatis omnis, enim fuga nam id perspiciatis corrupti.",
            tag: tagsData[Math.floor(Math.random() * tagsData.length)],
            pinned: true
        }))

        setTopics(topics)
    }, [])

        const addTopic = (text: string, tag: string) => {
        const res: Topic [] = [...topics]
        const newTopic: Topic = {
            id: `${res.length+1}`,
            text: text,
            tag: tag
        }

        res.unshift(newTopic)

        setTopics(res)
    }

    const [topics, setTopics] = useState<Topic[]>([])

    return <>
        <Header sendTopic={addTopic}/>
        <Outlet context={[topics, setTopics, addTopic]}/>
    </>
}

export default MetaHeader