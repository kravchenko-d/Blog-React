import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addComment, replyComment } from "../store/slices/article"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faReply } from "@fortawesome/free-solid-svg-icons"
import { Comment } from "../store/slices/article"

const Article = () => {
    const { articleId } = useParams()

    const dispatch = useDispatch()

    const [article, setArticle] = useState<any>({})
    const [commentAnswerId, setCommentAnswerId] = useState(-1)
    
    // const [changeCommentId, setChangeCommentId] = useState(-1)

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
        <div key={`comment_${comment.id}`} style={{marginBottom: '8px'}}>
            {comment.text}<br/>
            <label>
                {comment.id === commentAnswerId && <><textarea ref={refAnswer}></textarea><br/></>}
                    <FontAwesomeIcon icon={faReply} onClick={() => handleOnAddAnswer(comment.id)}
                    style={{marginLeft: '4px', color: 'blue'}}/>
            </label>
            <br/>
            {/*@ts-ignore*/}
            {comment.children?.length > 0 && <div style={{marginLeft: '8px'}}>{renderComments(comment.children)}</div>}
        </div>
        )
    }

    // const handleOnAddComment = () => {
    //     // @ts-ignore        
    //     const comment = ref?.current?.value

    //     if(comment && articleId){
    //         dispatch(addComment({
    //                 id: +articleId,
    //                 comment: comment
    //         }))
    //         // @ts-ignore
    //         ref.current.value = ''
    //     }
    // }

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

    // const handleOnReplyComment = () => {
    //     // @ts-ignore        
    //     const comment = refComment?.current?.value

    //     if(comment && articleId){
    //         dispatch(replyComment({
    //                 id: +articleId,
    //                 comment: comment
    //         }))
    //         // @ts-ignore
    //         refComment.current.value = ''
    //         setChangeCommentId(-1)
    //     }
    // }

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

    return <main style={{display: 'flex', flexDirection: 'column'}}>
        <span style={{cursor: 'pointer'}} onClick={() => navigate(-1)}>back</span>
        <h1>{article.title} - {article?.id}</h1>
        <article>{articleId && articles[+articleId-1].text}</article>
        {/* <article style={{margin: '8px'}} >{article?.text}</article>
        <section style={{height: 'initial', width: '100%'}}>
            <textarea ref={ref} style={{width: '25%', height: '100px'}} ></textarea>
            <br/>
            <span onClick={() => handleOnAddComment()} style={{margin: '16px 0', backgroundColor: 'lightgrey', borderRadius: '4px', padding: '4px', cursor: 'pointer'}}>Комментировать</span>
        </section> */}

        <section style={{marginTop: '32px'}}>
            <label>
            <textarea ref={refComment}></textarea><br/>
            <span onClick={() => handleOnAddComment()}>add comment</span>
            </label>
            <div style={{marginTop: '8px'}}>
                {renderComments(article.comments ?? [])}
                {/* {article.comments?.map((comment: (Comment & {children?: Comment[]})) =>
                    <div key={`comment_${comment.id}`} style={{marginBottom: '8px'}}>
                        {comment.text}<br/>
                        <label>
                            {comment.id === commentAnswerId && <><textarea ref={refAnswer}></textarea></>}
                                <FontAwesomeIcon icon={faReply} onClick={() => handleOnAddAnswer(comment.id)}
                                style={{marginLeft: '4px', color: 'blue'}}/>
                        </label>
                        <br/>
                        <div>
                            {comment.children?.map(item => <div>{Object.values(item).join(' - ')}</div>)}
                        </div>
                    </div>
                )} */}
            </div>
        </section>

        {/* <section style={{ height: 'initial', width: '100%', marginTop: '16px' }}>
            {article.comments?.map((comment: string, id: number) =>
                <div>
                    {
                        changeCommentId === id ?
                            <>
                            <div>{comment}</div>
                            <textarea ref={refComment}  style={{width: '50%', height: '50px'}}></textarea>
                            </>:
                            <>
                            <div>{comment}</div>
                            </>
                    }
                    <footer style={{marginTop: '8px'}}>
                        {
                            changeCommentId === id ?
                            <FontAwesomeIcon icon={faCheck} color='green' onClick={() => handleOnReplyComment()}/> :
                            <FontAwesomeIcon icon={faReply} onClick={() => setChangeCommentId(id)}/>
                        }
                    </footer>
                </div>            
            )}
        </section> */}
    </main>
}

export default Article