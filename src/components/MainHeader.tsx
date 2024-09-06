import { useEffect } from "react"
import { useContext} from "react"
import { Link, useLocation } from "react-router-dom"
import { AppContext } from "../App"

const MainHeader = () => {

    const location = useLocation()

    // useEffect(() => {
    //     const l = location
    //     debugger
    //     [location]
    // })

    const pages = ['/', '/profile', '/settings', '/articles']

    const {pathname} = useLocation()

    const {user} = useContext(AppContext)

    const generatePageName = (page: string) => {
        const res = page.split('')
        res.shift()

        if(res.length === 0){
            return 'Main'
        }

        const firstElement = res.shift()

        return firstElement?.toLocaleUpperCase() + res.join('')
    }

    return <header style={{background: '#22577A', marginBottom: '16px', padding: '8px'}}>
        {
            pages.map((page, id) => page === pathname ?
                <span key={id} style={{color: 'white', marginRight: '8px'}}>
                    {generatePageName(page)}
                    </span> :
                <Link key={id} style={{marginRight: '8px'}} to={page}>
                    {generatePageName(page)}
                    </Link>)
        }
        <div style={{margin: "0 16px 0 auto", color: 'white'}}>{Object.values(user).join(' ')}</div>
    </header>
}

export default MainHeader