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


    // const [topicsActive, setTopicsActive] = useState<Topic[]>([]) // альтернативный
    // const pinned = (topic: Topic) => {
    //     const items = [...topicsActive]
    //     const index = items.findIndex(item => item.id === topic.id)
    //     if(~index){
    //         items.splice(index, 1)
    //     }
    //     else{
    //         items.push(topic)
    //     }

    //     setTopicsActive(items)
    // }

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

    // const addTopic = (text: string, tag: string) => {
    //     console.log('addTopic')
    //     const res = [...topics]
    //     const newTopic: Topic = {
    //         id: `${res.length+1}`,
    //         text: text,
    //         tag: tag
    //     }

    //     res.unshift(newTopic)

    //     setTopics(res)
    // }

    // const [topics, setTopics, addTopic] = useOutletContext<any>()

    return <>
        {/* <MainHeader/> */}
        <main>
            {/* <Link to='/one'>one</Link>
            <Link to='/two'>two</Link>
            <Link to='/three'>three</Link> */}
        <aside>

            {/* <Outlet context={[topics, setTopics, addTopic]}/> */}
            {tags.map((item: string, id: number) => 
            <div key={id} onClick={() => changeActiveTags(item)} // [...tags] = [tag1, tag2, tag3....]
                className={'tag' + (activeTags.includes(item) ? ' active' : '')}>
                    #{item}
                </div>)
                }
                {/* <br/>
                <br/>
                <Link to={'/settings'}>Settings</Link>
                <br/>
                <Link to={'/profile'}>Profile</Link> */}
        </aside>
        <section>
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
            {/* { // альтернативный
                topicsActive.map(topic =>
                    <Topic  key={topic.id}
                            text={topic.text}
                            tag={topic.tag}
                            uniqueId={topic.id}
                            pinned={pinned}
                            isPinned={true}/>)
            } */}
            {/* {topicActiveId !== -1 && <Topic text={topics[topicActiveIds].text}
                                            tag={topics[topicActiveIds].tag}
                                            id={topicActiveIds}
                                            pinned={pinned}
                                            isPinned={true}/>} */}
        </aside>
    </main>
    </>
}

export default Main