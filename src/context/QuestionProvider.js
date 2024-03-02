import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'
import io from "socket.io-client";

export const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [theme, setTheme] = useState('light')
    const [gameScreen, showGameScreen] = useState(false);
    const [multiplayerGameScreen, showMultiplayerGameScreen] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [roomCreated, setRoomCreated] = useState(false);
    const [room, setRoom] = useState();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const socket = io("http://localhost:5000");
        socket.on("connection", () => {
          setSocketConnected(true)
        })
    }, [])
     

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

    return <QuestionContext.Provider value={{ roomCreated, setRoomCreated, socketConnected, user, setUser, theme, setTheme, gameScreen, showGameScreen, multiplayerGameScreen, showMultiplayerGameScreen, room, setRoom}}>{children}</QuestionContext.Provider>
}

export default QuestionProvider;