import React from "react";
import { SlideFade, Heading, Box, Button, Grid, Image } from "@chakra-ui/react";

import { FaLightbulb } from "react-icons/fa";

const Question = ({ questions, questionIndex, checkAnswer, setShowHint }) => {
  return (
    <SlideFade offsetY="20px" in={true}>
      <Box display="flex" justifyContent="center">
        <Box>
          <Box
            mt={!questions[questionIndex].pic && { base: 10, md: 150 }}
            display="flex"
            justifyContent="center"
          >
            {questions[questionIndex].pic && (
              <Image
                boxSize={{ base: 200, md: 250 }}
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
          <Heading fontSize={{ base: 25, md: 40 }} className="capitalize">
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
    </SlideFade>
  );
};

export default Question;
