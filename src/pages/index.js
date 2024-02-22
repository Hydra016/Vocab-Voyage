import Login from "../components/auth/Login";
import Signup from "@/components/auth/Signup";
import {
  Container,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Heading,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import animation from "../../public/animation";

export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Container display="flex" maxW="100%" height="100vh" p={0}>
        <Box w="200%" display={{ base: "none", md: "block" }} s>
          <Lottie options={defaultOptions} height="100vh" width="100%" />
        </Box>
        <Box
          background="white"
          display="flex"
          justifyContent="center"
          width="100%"
          p={10}
        >
          <Box mt={20} width="100%">
            <Heading
              as="h3"
              size="2xl"
              display="flex"
              justifyContent="center"
              mb={10}
            >
              Vocab Voyage
            </Heading>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Tabs width="100%" isFitted variant="soft-rounded">
                <TabList mb="1em">
                  <Tab>Login</Tab>
                  <Tab>Sign Up</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login />
                  </TabPanel>
                  <TabPanel>
                    <Signup />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
