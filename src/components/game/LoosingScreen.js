import React from "react";
import { SlideFade, Box, Flex, Heading, Button } from "@chakra-ui/react";
import Lottie from "react-lottie";
import animation from "../../../public/loosing";
import { LiaRedoAltSolid } from "react-icons/lia";

const LoosingScreen = ({
  setQuestionIndex,
  setLives,
  setProfessionalLevel,
  setIntermediateLevel,
  setHintCount,
}) => {
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
        <Box maxWidth="80%">
          <Heading
            fontSize={{ base: 50, md: 80 }}
            align="center"
            justify="center"
            color="white"
            mb={5}
          >
            You Lost!
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
              }}
            >
              Play again
            </Button>
          </Box>
          <Box mt={10}>
            <Lottie options={defaultOptions} height="50vh" width="100%" />
          </Box>
        </Box>
      </Flex>
    </SlideFade>
  );
};

export default LoosingScreen;
