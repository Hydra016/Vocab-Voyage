import React, { useState, useContext, useEffect } from "react";
import { SlideFade, useToast, Heading, Stack, Box, Button, Grid } from "@chakra-ui/react";
import axios from "axios";
import { QuestionContext } from "@/context/QuestionProvider";
import { FaLightbulb } from "react-icons/fa";

const Game = () => {
  const { user } = useContext(QuestionContext);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const toast = useToast();

  useEffect(() => {
    user && fetchQuestions();
  }, [user]);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.post("/api/questions/getAllQuestions", {
        userId: user._id,
      });
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  console.log(questions);

  return (
    <SlideFade offsetY="20px" in={true}>
      {questions.length > 0 && (
        <Box width="100%" height="100vh" backgroundColor="#FAF9F6" p={5}>
          <Heading mt={50}>Question {questionIndex + 1}</Heading>
          <Box display="flex" justifyContent="center" mt={100}>
            <Box>
              <Heading>{questions[questionIndex].title}</Heading>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
                mt={4}
              >
                {questions[questionIndex].answers.map((option, index) => (
                  <Button key={index} w="100%">
                    {option}
                  </Button>
                ))}
              </Grid>
              <Button colorScheme="yellow" mt={5} rightIcon={<FaLightbulb />}>Hint</Button>
            </Box>
          </Box>
        </Box>
      )}
    </SlideFade>
  );
};

export default Game;
