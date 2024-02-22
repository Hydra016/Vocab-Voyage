import React, { useState } from 'react'
import { 
    Container,
    SlideFade,
    Button,
    Box
} from '@chakra-ui/react'
import Typewriter from "typewriter-effect";
import Image from "next/image";
import animation from '../../../public/animation'

const InitialComponent = () => {
    const [levelShow, setLevelShow] = useState(false)
    const [level, setLevel] = useState("")

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    

  return (
    <Container display="flex" justifyContent="space-between" maxW="100%" mt={50}>
        <div style={{fontSize: "30px", width: "60%"}}  className="typewriter-container">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(25)
                  .typeString("Bonjour, <br>")
                  .pauseFor(500)
                  .typeString("welcome to Vocab Voyage<br>")
                  .pauseFor(500)
                  .typeString("the perfect place to improve your <br>")
                  .pauseFor(500)
                  .typeString("<b>compétences en français</b><br>")
                  .pauseFor(500)
                  .typeString("before moving on choose your french level<br>")
                  .start()
                  .callFunction(() => setLevelShow(true));
              }}
            />

            <SlideFade offsetY='20px' in={levelShow}>
                <Button onClick={() => setLevel("beginner")} mr={5} colorScheme='green' variant="outline" rightIcon={<Image src='/noob.png' width={20} height={20} />}>
                Beginner
                </Button>
                <Button onClick={() => setLevel("intermediate")} mr={5} colorScheme='yellow' variant="outline" rightIcon={<Image src='/mid.png' width={20} height={20} />}>
                Intermediate
                </Button>
                <Button onClick={() => setLevel("professional")} colorScheme='red' variant="outline" rightIcon={<Image src='/pro.png' width={20} height={20} />}>
                Professional
                </Button>
            </SlideFade>
          </div>
         <SlideFade w="50%"r offsetY='20px' in={levelShow}>
         <Box ml={250}>
          {/* <Lottie
                    options={defaultOptions}
                    height="100vh"
                    width="100%"
                    // style={{ marginBottom: 15, marginLeft: 0 }}
                  /> */}
          </Box>
         </SlideFade>
        </Container>
  )
}

export default InitialComponent