import { useEffect, useState, useContext } from 'react'
import Header from '../components/main/Header'
import TopicsList from '../components/main/TopicsList'
import '../styles/main.scss'
import Topic from '../components/main/Topic'
import { OutletContext, Topic as TTopic } from './MainWrapper'
import { Link, Outlet, Route, Routes, useOutletContext } from 'react-router-dom'
import MainHeader from '../components/MainHeader'
import { TopicContext } from '../App'



// export const tagsData = ['meme', 'food', 'fitness', 'all']

// export type Topic = {
//     id: string,
//     text: string,
//     tag: string
// }

const Main = () => {

    const {topics, tags, addTopic, newName} = useContext(TopicContext)

    // const {topics, setTopics, addTopic} = useContext(TopicContext)
    
    // const [topics, setTopics] = useState<Topic[]>([])
    const [topicActiveIds, setTopicActiveIds] = useState<string[]>([])
    const [activeTags, setActiveTags] = useState<string[]>([])
    const [filteredTopics, setFilteredTopics] = useState<TTopic[]>([])

    // useEffect(() => { // постоянно отслеживает изменение какого-либо компонента
    //     const topics = Array(20).fill('').map((_, id) => ({
    //         id: `topic_${id+1}`,
    //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam accusamus magnam recusandae incidunt architecto similique voluptates expedita iure, minima reiciendis dignissimos! Beatae veritatis omnis, enim fuga nam id perspiciatis corrupti.",
    //         tag: tagsData[Math.floor(Math.random() * tagsData.length)],
    //         pinned: true
    //     }))

    //     setTopics(topics)
    //     setFilteredTopics(topics)
    // }, [])

    useEffect(() => {
        setActiveTags([])
    }, [tags])

    useEffect(() => {
        // if(tag){
            // setFilteredTopics(topics.filter((topic: any) => activeTags.length === 0 || activeTags.includes(topic.tag))) // предыдущее решение
            setFilteredTopics(topics.slice().reverse().filter((topic: any) => activeTags.length === 0 || activeTags.includes(topic.tag)))
            // setFilteredTopics(topics.filter(topic => !tag || tag.includes(topic.tag)))
        // }
        // else {
        //     setFilteredTopics(topics)
        // }
    }, [activeTags, topics, newName])

    const pinned = (id: string) => {
        const ids = [...topicActiveIds]
        // topicActiveId === id ? setTopicActiveId(-1) : setTopicActiveId(id)
        // setTopicActiveIds(id === topicActiveIds[0] ? -1 : id)
       

        const index = ids.indexOf(id)
        if(~index){//~index === (index + 1) *-1
            ids.splice(index, 1)
        }
        else {
            ids.push(id)
        }
        // const index = ids.findIndex((i) => i === id)
        // if(index === -1){
        //     ids.push(id)
        // }
        // else {
        //     ids.splice(index, 1)
        // }

        setTopicActiveIds(ids)
        // прикреплять и откреплять => setTopicActiveId
    }

    const isPinned = {}

    const changeActiveTags = (item: string) => {
        const items = [...activeTags]

        const index = items.findIndex((i) => i === item)
        if(index === -1){
            items.push(item)
        }
        else {
            items.splice(index, 1)
        }

        setActiveTags(items)
    }

    return <>
        <main>
        <aside>
            <h3 style={{marginLeft: '8px'}}>Choose tag</h3>
            {tags.map((item: string, id: number) =>
                <div key={id} onClick={() => changeActiveTags(item)} // [...tags] = [tag1, tag2, tag3....]
                className={'tag' + (activeTags.includes(item) ? ' active' : '')}>
                    #{item}
                </div>
            )}
        </aside>
        <section>
            <h1>Blog{activeTags.length > 0 && activeTags.map((tag: string) => <span style={{margin: '0 8px'}}>#{tag}</span>)}</h1>
           <Header sendTopic={addTopic} tags={tags}/>
           <TopicsList topics={filteredTopics} pinned={pinned} topicActiveIds={topicActiveIds}/> 
        </section>
        <aside>
            {
                filteredTopics.filter(topic => topicActiveIds.includes(topic.id)).map(topic =>
                                        <Topic  key={topic.id}
                                                text={topic.text}
                                                tag={topic.tag}
                                                uniqueId={topic.id}
                                                pinned={pinned}
                                                author={topic.author}
                                                isPinned={true}/>)
            }
        </aside>
    </main>
    </>
}

export default Main