import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'

export const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [theme, setTheme] = useState('light')
    const [gameScreen, showGameScreen] = useState(false);
    const [multiplayerGameScreen, showMultiplayerGameScreen] = useState(false);
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
        } else if(pathname === "/game/Multiplayer") {
            router.push("/game/Multiplayer")
        } else {
            router.push("/game")
        }
    }, [pathname])

    return <QuestionContext.Provider value={{user, setUser, theme, setTheme, gameScreen, showGameScreen, multiplayerGameScreen, showMultiplayerGameScreen}}>{children}</QuestionContext.Provider>
}

export default QuestionProvider;