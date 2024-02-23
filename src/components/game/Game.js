import React, { useState, useContext, useEffect } from "react";
import {
  SlideFade,
  useToast,
  Heading,
  Stack,
  Box,
  Button,
  Grid,
} from "@chakra-ui/react";
import axios from "axios";
import { QuestionContext } from "@/context/QuestionProvider";
import { FaLightbulb } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";

const Game = () => {
  const { user } = useContext(QuestionContext);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const toast = useToast();
  const [lives, setLives] = useState(5);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    fetchQuestions();
    const currentQuestion = JSON.parse(sessionStorage.getItem("currentQuestion"))
    currentQuestion && setQuestionIndex(currentQuestion)
  }, []);

  useEffect(() => {
    JSON.stringify(sessionStorage.setItem("currentQuestion", questionIndex))
  }, [questionIndex])

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get("/api/questions/getAllQuestions");
      data.sort((a, b) => a.level.localeCompare(b.level));
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    showHint &&
      toast({
        title: questions[questionIndex].hint,
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    setShowHint(false);
  }, [showHint]);

  const checkAnswer = (index, correct) => {
    console.log(index, correct);
    if (index === parseInt(correct)) {
      setQuestionIndex(questionIndex + 1);
    } 
    if(index !== parseInt(correct)) {
        setLives(lives - 1)
    }
  };

  return (
    <SlideFade offsetY="20px" in={true}>
      {questions.length > 0 && (
        <Box
          px={100}
          py={10}
          className="game-container"
          width="100%"
          height="100vh"
          backgroundColor="#FAF9F6"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading mt={50}>Question {questionIndex + 1}</Heading>
            <Box display="flex">
              {Array.from({ length: lives }, (_, index) => (
                <IoIosHeart size={25} key={index} fill="red" />
              ))}
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mt={100}>
            <Box>
              <Heading fontSize={{ base: 30, md: 40 }} className="capitalize">
                {questions[questionIndex].title}
              </Heading>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
                mt={4}
              >
                {questions[questionIndex].answers.map((option, index) => (
                  <Button
                    fontSize={{ base: 20, md: 25 }}
                    p={10}
                    className="capitalize"
                    onClick={() =>
                      checkAnswer(index, questions[questionIndex].correctAnswer)
                    }
                    key={index}
                    w="100%"
                  >
                    {option}
                  </Button>
                ))}
              </Grid>
              <Button
                onClick={() => setShowHint(true)}
                colorScheme="yellow"
                mt={5}
                rightIcon={<FaLightbulb />}
              >
                Hint
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </SlideFade>
  );
};

export default Game;
