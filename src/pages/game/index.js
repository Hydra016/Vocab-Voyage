import Navbar from '@/components/shared/Navbar'
import React, { useContext, useState, useEffect } from 'react'
import { 
    Container,
    SlideFade,
} from '@chakra-ui/react'
import InitialComponent from '@/components/shared/InitialComponent'
import { QuestionContext } from '@/context/QuestionProvider'
import Game from '@/components/game/Game'

const index = () => {
  const { user } = useContext(QuestionContext);
  const [gameScreen, showGameScreen] = useState(false)

  useEffect(() => {
    const checkGame = JSON.parse(sessionStorage.getItem("gameScreen"));
    showGameScreen(checkGame)
  }, [])

  return (
    <SlideFade offsetY='20px' in={true}>
    <Container className="main" backgroundColor="#FAF9F6" overflow="hidden" maxW="100%" height="100vh" p={5}>
        <Navbar />
        {!gameScreen ? <InitialComponent gameScreen={gameScreen} showGameScreen={showGameScreen} /> : <Game /> }
    </Container>
    </SlideFade>

  )
}

export default index