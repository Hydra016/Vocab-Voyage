import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'

export const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loggedIn, isLoggedin] = useState(false)
    const [theme, setTheme] = useState('light')
    const [questions, setQuestions] = useState([]);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo)
        if(!userInfo) {
            router.push("/")
        } else if(pathname === "/game/Admin") {
            router.push("/game/Admin")
        } else if(pathname === "/game/Questions") {
            router.push("/game/Questions")
        } else {
            router.push("/game")
        }
    }, [pathname])

    return <QuestionContext.Provider value={{user, theme, setTheme, isLoggedin, questions, setQuestions}}>{children}</QuestionContext.Provider>
}

export default QuestionProvider;