import React, { useContext, useEffect } from "react";
import {
  SlideFade,
  Box,
  Flex,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import animation from "../../../public/loosing";
import { LiaRedoAltSolid } from "react-icons/lia";
import { saveHighScore } from "@/helpers";
import { QuestionContext } from "@/context/QuestionProvider";

const LoosingScreen = ({
  setQuestionIndex,
  setLives,
  setProfessionalLevel,
  setIntermediateLevel,
  setHintCount,
  setScore,
  score,
}) => {
  const { user, setUser } = useContext(QuestionContext);
  const toast = useToast();

  useEffect(() => {
    updateScore();
  }, []);

  const updateScore = async () => {
    if (user.HighScore && score > user.HighScore) {
      const updatedUser = await saveHighScore(score, user._id);
      setUser(updatedUser);
      toast({
        title: "New High Score",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <SlideFade offsetY="20px" in={true}>
      <Flex align="center" justify="center" height="80vh">
        <Box align="center" justify="center" maxWidth="80%">
          <Heading
            fontSize={{ base: 40, md: 80 }}
            align="center"
            justify="center"
            color="white"
            mb={5}
          >
            You Lost!
          </Heading>
          <Heading fontSize={{ base: 20, md: 80 }} color="#FFF" mb={5}>
            Score: {score}
          </Heading>
          <Box align="center" justify="center">
            <Button
              rightIcon={<LiaRedoAltSolid size={25} />}
              onClick={() => {
                setLives(5);
                setQuestionIndex(0);
                setIntermediateLevel(false);
                setProfessionalLevel(false);
                setHintCount(0);
                setScore(0);
              }}
            >
              Play again
            </Button>
          </Box>
          <Box mt={{ base: 0 }}>
            <Lottie options={defaultOptions} height="50vh" width="100%" />
          </Box>
        </Box>
      </Flex>
    </SlideFade>
  );
};

export default LoosingScreen;
