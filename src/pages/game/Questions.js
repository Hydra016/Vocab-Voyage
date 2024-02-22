import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Heading,
  Box,
  Stack,
  SlideFade,
  Select,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { QuestionContext } from "@/context/QuestionProvider";

const Questions = () => {
  const { user } = useContext(QuestionContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    user && fetchQuestions();
  }, [user]);
  const fetchQuestions = async () => {
    const { data } = await axios.post("/api/questions/getAllQuestions", {
      userId: user._id,
    });
    setQuestions(data);
  };

  return (
    <SlideFade offsetY="20px" in={true}>
      <Box p={5}>
        <Navbar />
        <VStack align="start" w="100%" spacing={10} p={10}>
          <Heading textAlign="left">Total {questions.length}</Heading>
          {questions.length > 0 &&
            questions.map((question, i) => (
              <Box>
                <Heading as="h3">Question {i + 1}</Heading>
                <Image
                  boxSize="250px"
                  src={question.pic}
                  alt={question.correctAnswer}
                />
                <Heading as="h4" fontSize="25px">
                  {question.title}
                </Heading>
                <Text>
                  Correct answer:{" "}
                  {question.answers[parseInt(question.correctAnswer)]}
                </Text>
                <Text>Options</Text>
                {question.answers.map((option, i) => (
                  <Text>
                    {i + 1}. {option}
                  </Text>
                ))}
                <Text>Level: {question.level}</Text>
              </Box>
            ))}
        </VStack>
      </Box>
    </SlideFade>
  );
};

export default Questions;
