import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addComment } from "../store/slices/article"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReply } from "@fortawesome/free-solid-svg-icons"
import { Comment } from "../store/slices/article"

const Article = () => {
    const { articleId } = useParams()

    const dispatch = useDispatch()

    const [article, setArticle] = useState<any>({})
    const [commentAnswerId, setCommentAnswerId] = useState(-1)
    
    const articles = useSelector(({articles}) => articles.articles) // state => any
    const comments: (Comment & {children?: Comment[]})[] = useSelector(({articles}) => articles.comments)

    const navigate = useNavigate()

    const refAnswer = useRef<HTMLTextAreaElement>(null)

    const refComment = useRef<HTMLTextAreaElement>(null)

    useEffect (() => { 
        if (articleId){
            const item = {...articles.find(({id}: any) => id === +articleId)}
            if(item){

                item.comments = getComments()

                setArticle(item)
            }
        }
    }, [articles, articleId, comments])

    const getComments = () =>  {
        const res: (Comment & {children?: Comment[]}) [] = []

        if(articleId){
            res.push(...comments.filter(({article, parent}) => article === +articleId && parent === undefined))
        }

        return res.map(comment => ({
            ...comment,
            children: getChildren(comment.id)
        }))
    }

    const getChildren = (parentId: number): (Comment & {children?: Comment[]}) [] => {
        return comments.filter(({parent}) => parent === parentId).map(comment => ({
            ...comment,
            children: getChildren(comment.id)
        }))
    }

    const renderComments = (comments: (Comment & {children?: Comment[]})[]) => {
        return comments?.map((comment: (Comment & {children?: Comment[]})) =>
        <div key={`comment_${comment.id}`} style={{marginBottom: '4px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px'}}>
            {comment.text}<br/>
            <form>
                {comment.id === commentAnswerId && <><textarea ref={refAnswer} name="reply_comment" ></textarea><br/></>}
                    <div style={{cursor: 'pointer'}} onClick={() => handleOnAddAnswer(comment.id)}>
                    <FontAwesomeIcon icon={faReply} 
                    style={{marginLeft: '4px', color: 'blue'}}/><span style={{marginLeft: '4px'}}>Reply</span>
                    </div>

            </form>
            <br/>
            {/*@ts-ignore*/}
            {comment.children?.length > 0 && <div style={{marginLeft: '8px'}}>{renderComments(comment.children)}</div>}
        </div>
        )
    }

    const handleOnAddComment = () => {               
        const text = refComment.current?.value

        if(text && articleId){
            dispatch(addComment({
                text,
                articleId: +articleId
            }))
            refComment.current.value = ''
        }
    }

    const handleOnAddAnswer = (id: number) => {
        if(~commentAnswerId){
            const text = refAnswer.current?.value
            if(text && articleId){
                dispatch(addComment({
                    text,
                    articleId: +articleId,
                    parentId: id
                }))
                refAnswer.current.value = ''
            }

            setCommentAnswerId(-1)
        }
        else {
            setCommentAnswerId(id)
        }
    }

    return  <main>
                <aside></aside>
                <section className="block">
                    <h1>{article.title}</h1>
                    <article>{articleId && articles[+articleId-1].text}</article>
                    <hr/>
                    <section style={{marginTop: '32px'}}>
                        <label>
                        <textarea style={{width: '98%', borderRadius: '4px'}} ref={refComment} name="comment_text" ></textarea><br/>
                        <button onClick={() => handleOnAddComment()}>Add comment</button>
                        </label>
                        <div style={{padding: '4px', marginTop: '8px'}}>
                            {renderComments(article.comments ?? [])}
                        </div>
                        <div>
                            <button style={{margin: '16px', cursor: 'pointer'}}
                            onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </section>
                </section>
                <aside></aside>
            </main>
}

export default Article