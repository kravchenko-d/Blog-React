import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addArticles, changeArticle, deleteArticle } from "../store/slices/article"
import { faCheck, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { useNavigate } from "react-router-dom"

const Articles = () => {

    const articles = useSelector((state: any) => state.articles.articles)
    const dispatch = useDispatch()

    const [changeArticleId, setChangeArticleId] = useState(-1)

    const ref = useRef(null)

    const newTitleRef = useRef(null)

    const refChange = useRef(null)

    const refTitle = useRef(null)

    const handleOnAddArticle = () => {
        // @ts-ignore        
        const title = newTitleRef?.current?.value
        // @ts-ignore
        const text = ref?.current?.value

        if(text){
            dispatch(addArticles({
                title: title,
                text: text
            }))
            // @ts-ignore
            ref.current.value = ''
        }
    }

    const handleOnDeleteArticle = (id: number) => {
        dispatch(deleteArticle(id))
        setChangeArticleId(-1)
    }

    const handleOnChangeArticle = () => {
        dispatch(changeArticle({
            // @ts-ignore
            title: refTitle.current.value,
            id: changeArticleId,
            // @ts-ignore
            text: refChange.current.value
        }))
        setChangeArticleId(-1)
    }

    const navigate = useNavigate()

    return <main>
        <aside></aside>
        <section>
            <h1>Articles</h1>

            <section style={{height: 'initial', width: '97%', border: '1px solid rgba(0,0,0,0.1)', padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,.05)', margin: '8px 0'}}>
                <span>Title</span>
                <input style={{margin: '4px'}} ref={newTitleRef} name="article_title"></input>
                <br/>
                <textarea ref={ref} style={{width: '95%', height: '100px', margin: '4px'}} name="article_text" ></textarea>
                <br/>
                <button onClick={() => handleOnAddArticle()}>Add</button>
            </section>

            <section style={{ height: 'initial', width: '100%', marginTop: '16px' }}>
                {
                    articles.map((article: any) =>
                        <article key={`article_${article.id}`} className="topic">
                            {
                                changeArticleId === article.id ?
                                    <>
                                    <input ref={refTitle} defaultValue={article.title}></input>
                                    <textarea ref={refChange}  style={{width: '80%', height: '150px'}} defaultValue={article.text}></textarea>
                                    </>:
                                    <>
                                    <div style={{fontWeight: 'bold', cursor: 'pointer'}} onClick={() => navigate(`/articles/${article.id}`)}>{article.title}</div>
                                    <div>{article.text}</div>
                                    </>
                            }
                            <footer style={{marginTop: '16px'}}>
                                <FontAwesomeIcon style={{margin: '0 16px', cursor: 'pointer'}} icon={faXmark} color='red' onClick={() => handleOnDeleteArticle(article.id)}/>
                                {
                                    changeArticleId === article.id ?
                                    <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faCheck} color='green' onClick={() => handleOnChangeArticle()}/> :
                                    <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faEdit} onClick={() => setChangeArticleId(article.id)}/>
                                }
                                {changeArticleId !== article.id && <FontAwesomeIcon style={{margin: '0 16px', cursor: 'pointer'}} icon={faEye} onClick={() => navigate(`/articles/${article.id}`)}/>}
                            </footer>
                        </article>
                    )
                }
            </section>
            <div>
                <button style={{margin: '16px', cursor: 'pointer'}}
                onClick={() => navigate(-1)}>Back</button>
                </div>
        </section>
        <aside></aside>
    </main>
}

export default Articles