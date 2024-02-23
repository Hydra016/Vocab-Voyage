import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import {
  VStack,
  Button,
  useToast,
  Heading,
  Box,
  SlideFade,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { QuestionContext } from "@/context/QuestionProvider";

const Questions = () => {
  const { user } = useContext(QuestionContext);
  const [questions, setQuestions] = useState([]);
  const toast = useToast();

  useEffect(() => {
    user && fetchQuestions();
  }, [user]);
  const fetchQuestions = async () => {
    const { data } = await axios.post("/api/questions/getAllQuestions", {
      userId: user._id,
    });
    setQuestions(data);
  };

  const deleteQuestions = async (qId) => {
    try {
      const { data } = await axios.delete("/api/questions/deleteQuestion", {
        data: {
          userId: user._id,
          questionId: qId,
        },
      });
      setQuestions(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <SlideFade offsetY="20px" in={true}>
      <Box backgroundColor="#FAF9F6" p={5}>
        <Navbar />
        <VStack align="start" w="100%" spacing={10} p={10}>
          <Heading textAlign="left">Total {questions.length}</Heading>
          {questions.length > 0 ? (
            questions.map((question, i) => (
              <Box>
                <Heading as="h3">Question {i + 1}</Heading>
                {question.pic && (
                  <Image
                    boxSize="250px"
                    src={question.pic}
                    alt={question.correctAnswer}
                  />
                )}
                <Heading as="h4" fontSize="25px">
                  {question.title}
                </Heading>
                <Text>
                  <b>Correct answer: </b>
                  {question.answers[parseInt(question.correctAnswer)]}
                </Text>
                <Text as="b">Options</Text>
                {question.answers.map((option, i) => (
                  <Text>
                    {i + 1}. {option}
                  </Text>
                ))}
                <Text>
                  <b>Hint:</b> {question.hint}
                </Text>
                <Text>
                  <b>Level:</b> {question.level}
                </Text>
                <Button
                  onClick={() => deleteQuestions(question._id)}
                  colorScheme="red"
                >
                  Delete
                </Button>
              </Box>
            ))
          ) : (
            <Box>
              <Heading>No Questions</Heading>
            </Box>
          )}
        </VStack>
      </Box>
    </SlideFade>
  );
};

export default Questions;
