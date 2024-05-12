import { FC, useEffect } from "react"
// import { Topic as TTopic } from "../../pages/MainWrapper"
import Topic from "./Topic"

type Props ={
    topics: any[]
    pinned?: (id: string) => void
    // pinned?: (id: TTopic) => void // альтернативный
    topicActiveIds?: string[]
}

const TopicsList: FC<Props> = ({topics, pinned, topicActiveIds = []}) => {

    // useEffect(() => {
    //     const t = topics
    //     debugger
    // }, [])

    return <div className='topics-list'>
        {
            topics.map((topic) => <Topic key={topic.id}
                                            isPinned={topicActiveIds.includes(topic.id)}
                                            uniqueId={topic.id}
                                            tag={topic.tag}
                                            text={topic.text}
                                            author={topic.author}
                                            pinned={pinned}
                                            changed={topic.changed}
                                            // pinned={() => pinned(topic)} // альтернативный
                                            />)                                        
        }
    </div>
}

export default TopicsList