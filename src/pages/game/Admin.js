import React, { useEffect, useState, useContext } from "react";
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
} from "@chakra-ui/react";
import useImageUploader from "@/hooks/useImageUploader";
import Navbar from "@/components/shared/Navbar";
import axios from "axios";
import { QuestionContext } from "@/context/QuestionProvider";

const Admin = () => {
  const { picLoading, pic, postDetails } = useImageUploader();
  const { user } = useContext(QuestionContext);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    userId: null,
    title: "",
    level: "beginner",
    pic: "",
    answers: [],
    correctAnswer: "",
    hint: "",
  });

  useEffect(() => {
    if (user?._id) {
      setFormData((prevData) => ({ ...prevData, userId: user._id }));
    }

    if (pic) {
      setFormData((prevData) => ({ ...prevData, pic }));
    }
  }, [pic, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    if (
      formData.title === "" ||
      formData.hint === "" ||
      formData.correctAnswer === "" ||
      formData.answers.length !== 4 ||
      !formData.answers.every(
        (value) => typeof value === "string" && value.trim() !== ""
      )
    ) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      await axios.post("/api/questions/create", formData);
      toast({
        title: "Question created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleAnswerChange = (e, index) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = e.target.value;
    setFormData({ ...formData, answers: updatedAnswers });
  };

  return (
    <SlideFade offsetY="20px" in={true}>
      <Box backgroundColor="#FAF9F6" p={5}>
        <Navbar />

        <VStack align="start" w="100%" spacing={10} p={10}>
          <Heading textAlign="left">Admin</Heading>
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Stack
              w="100%"
              direction={["column", "column", "row", "row"]}
              spacing={5}
              mb={5}
            >
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  type="text"
                  placeholder={`eg. what is meant by "pomme" in french?`}
                />
              </FormControl>
              <FormControl id="pic">
                <FormLabel>Upload Question Picture</FormLabel>
                <Input
                  type="file"
                  p={1.5}
                  accept="image/*"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </FormControl>
            </Stack>
            <Stack
              w="100%"
              direction={["column", "column", "row", "row"]}
              spacing={5}
              mb={5}
            >
              {[0, 1].map((index) => (
                <FormControl isRequired key={index}>
                  <FormLabel>{`Option ${index}`}</FormLabel>
                  <Input
                    onChange={(e) => handleAnswerChange(e, index)}
                    type="text"
                    placeholder={`option ${index}`}
                  />
                </FormControl>
              ))}
            </Stack>
            <Stack
              w="100%"
              direction={["column", "column", "row", "row"]}
              spacing={5}
              mb={5}
            >
              {[2, 3].map((index) => (
                <FormControl isRequired key={index}>
                  <FormLabel>{`Option ${index}`}</FormLabel>
                  <Input
                    onChange={(e) => handleAnswerChange(e, index)}
                    type="text"
                    placeholder={`option ${index}`}
                  />
                </FormControl>
              ))}
            </Stack>
            <Stack
              w="100%"
              direction={["column", "column", "row", "row"]}
              spacing={5}
              mb={5}
            >
              <FormControl isRequired>
                <FormLabel>Correct Option</FormLabel>
                <Input
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      correctAnswer: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="correct option number"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Hint</FormLabel>
                <Input
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hint: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="It is a fruit"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Level</FormLabel>
                <Select
                  onChange={(e) =>
                    setFormData({ ...formData, level: e.target.value })
                  }
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="professional">Professional</option>
                </Select>
              </FormControl>
            </Stack>
            <Button
              type="submit"
              colorScheme="blue"
              style={{ marginTop: 15 }}
              isLoading={picLoading || loading}
            >
              Post question
            </Button>
          </form>
        </VStack>
      </Box>
    </SlideFade>
  );
};

export default Admin;
