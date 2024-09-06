import { FC, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"


export type Topic = {
    id: string,
    text: string,
    tag: string,
    author: number
}

// export type OutletContext = {
//     topics: Topic[],
//     tags: string[],
//     newName: string,
//     addTopic: (text: string, tags: string) => void,
//     addTag: (tag: string) => void,
//     deleteTag: (tag: string) => void,
//     changeName: (author: string) => void,
//     tagDefault: string,
//     setTagDefault: (tag: string) => void
// }

// const MainWrapper: FC = () => {

//     const [topics, setTopics] = useState<Topic[]>([])
//     const [tags, setTags] = useState(['meme', 'food', 'fitness', 'all'])
//     const [newName, setNewName] = useState('Author')
//     const [tagDefault, setTagDefault] = useState('')

//     useEffect(() => { // постоянно отслеживает изменение какого-либо компонента
//         const topics = Array(20).fill('').map((_, id) => ({
//             id: `topic_${id+1}`,
//             text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam accusamus magnam recusandae incidunt architecto similique voluptates expedita iure, minima reiciendis dignissimos! Beatae veritatis omnis, enim fuga nam id perspiciatis corrupti.",
//             tag: tags[Math.floor(Math.random() * tags.length)],
//             author: Math.round(Math.random()*10) % 2 ? -1 : 1
//         }))

//         setTopics(topics)
//         setTagDefault(tags[0])
//     }, [])

//     const addTopic = (text: string, tag: string) => {
//         const res: Topic [] = [...topics]
//         const newTopic: Topic = {
//             id: `${res.length+1}`,
//             text: text,
//             tag: tag,
//             author: 1
//         }

//         res.unshift(newTopic)

//         setTopics(res)
//     }

//     const addTag = (tag: string) => {
//         const res: string [] = [...tags]
//         const newTag: string = tag
//         if(!tags.includes(tag)){
//             res.push(newTag)
//         }
        
//     setTags(res)
//     }

//     const deleteTag = (tag: string) => {
//         const res: string [] = [...tags]
//         const newTag: string = tag

//         res.splice(res.indexOf(newTag), 1)

//     setTags(res)

//     let newDefaultTag = tagDefault

//     if (tag === tagDefault) {
//         newDefaultTag = res[Math.floor(Math.random() * tags.length)]
//         setTagDefault(newDefaultTag)
//     }

//         const alltopics = topics.map((topic) => ({...topic, tag: topic.tag === tag ? newDefaultTag : topic.tag
//         }))
        
//         setTopics(alltopics)
//     }

//     const changeName = (author: string) => {
//         const nName: string = author
//         setNewName(nName)
//     }

//     return <>
//         {/* <Outlet context={{topics, 
//             tags, 
//             addTopic, 
//             addTag, 
//             deleteTag, 
//             changeName, 
//             newName, 
//             tagDefault, 
//             setTagDefault}}/> */}
//     </>
// }

// export default MainWrapper