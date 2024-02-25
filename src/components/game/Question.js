import React from "react";
import {
  SlideFade,
  Heading,
  Box,
  Button,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";

import { FaLightbulb } from "react-icons/fa";

const Question = ({ questions, questionIndex, checkAnswer, setHintCount, hintCount, setShowHint }) => {
  return (
    <SlideFade offsetY="20px" in={true}>
      <Box display="flex" justifyContent="center">
        <Box>
          <Box
            mt={!questions[questionIndex].pic && { base: 0, md: 150 }}
            display="flex"
            justifyContent="center"
          >
            {questions[questionIndex].pic && (
              <Image
                boxSize={{ base: 100, md: 200 }}
                objectFit="cover"
                borderRadius="10px"
                mb={5}
                src={questions[questionIndex].pic}
                alt={
                  questions[questionIndex].answers[
                    questions[questionIndex].correctAnswer
                  ]
                }
              />
            )}
          </Box>
          <Heading fontSize={{ base: 20, md: 35 }} className="capitalize">
            {questions[questionIndex].title}
          </Heading>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={{ base: 2, md: 4 }}
            mt={{ base: 2, md: 4 }}
          >
            {questions[questionIndex].answers.map((option, index) => (
              <Button
                fontSize={{ base: 15, md: 20 }}
                p={{ base: 0, md: 7 }}
                className="capitalize"
                onClick={() =>
                  checkAnswer(index, questions[questionIndex].correctAnswer)
                }
                key={index}
                w="100%"
              >
                <Text style={{ whiteSpace: "normal" }}>{option}</Text>
              </Button>
            ))}
          </Grid>
          <Button
            onClick={() => { 
              setHintCount(hintCount + 1)
              setShowHint(true)
            }}
            colorScheme="yellow"
            mt={5}
            rightIcon={<FaLightbulb />}
          >
            Hint
          </Button>
        </Box>
      </Box>
    </SlideFade>
  );
};

export default Question;
