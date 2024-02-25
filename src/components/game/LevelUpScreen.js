import React from "react";
import { SlideFade, Box, Flex, Heading, Button, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import animation from "../../../public/intermediate";

const LoosingScreen = ({
  showLevelUpScreen,
  level,
  intermediateLevel,
  professionalLevel,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  return (
    <SlideFade offsetY="20px" in={true}>
      <Box>
        <div className="levelup-container">
        <div className="levelup-text-container">
        <Heading fontSize={{base: 45, md: 90}} color="#fff" className="capitalize">Level up</Heading>
        <Text fontSize={{base: 20, md: 40}} color="#fff" className="capitalize">Promoted to {level} level</Text>
        <Button
          onClick={() => {
            showLevelUpScreen(false);
            level === "intermediate"
              ? sessionStorage.setItem(
                  "intermediateLevelShown",
                  JSON.stringify(intermediateLevel)
                )
              : sessionStorage.setItem(
                  "professionalLevelShown",
                  JSON.stringify(professionalLevel)
                );
          }}
        >
          Continue
        </Button>
        </div>
        </div>
        <Lottie options={defaultOptions} height="100vh" width="100%" />
      </Box>
    </SlideFade>
  );
};

export default LoosingScreen;
