import { faBars, faGear, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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

    const {user, setUser} = useContext(AppContext)

    const generatePageName = (page: string) => {
        const res = page.split('')
        res.shift()

        if(res.length === 0){
            return 'Main'
        }

        const firstElement = res.shift()

        return firstElement?.toLocaleUpperCase() + res.join('')
    }

    const reverseUserValues = () => {
        const newUser = {...user}
        for(const key in newUser){
            newUser[key] = newUser[key].split('').reverse().join('')
        }
        setUser(newUser)
    }

    return <header style={{background: 'grey', marginBottom: '16px', padding: '8px'}}>
        {
            pages.map((page, id) => page === pathname ?
                <span key={id} style={{color: 'black', marginRight: '8px'}}>
                    {generatePageName(page)}
                    </span> :
                <Link key={id} style={{marginRight: '8px'}} to={page}>
                    {generatePageName(page)}
                    </Link>)
        }
        <span style={{marginLeft: "16px"}}>{Object.values(user).join(' - ')}</span>
        <span style={{marginLeft: "16px", cursor: 'pointer', backgroundColor: 'lightcoral', borderRadius: '4px', padding: ' 0 4px', fontWeight: "bold"}}
        onClick={() => reverseUserValues()}>reverse user values</span>
    </header>
}

export default MainHeader