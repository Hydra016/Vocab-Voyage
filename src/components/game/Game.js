import React, { useState, useEffect } from "react";
import { SlideFade, useToast, Heading, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import Question from "./Question";
import { IoIosHeart } from "react-icons/io";
import WinningScreen from "./WinningScreen";
import LoosingScreen from "./LoosingScreen";
import LevelUpScreen from "./LevelUpScreen";
import { useMobileDetection } from "@/hooks/useMobileDetection";

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const toast = useToast();
  const [lives, setLives] = useState(() => {
    const storedLives = JSON.parse(sessionStorage.getItem("currentLives"));
    return storedLives !== null ? storedLives : 5;
  });
  const [showHint, setShowHint] = useState(false);
  const [winningScreen, setWinningScreen] = useState(false);
  const [level, setLevel] = useState("beginner");
  const [levelUpScreen, showLevelUpScreen] = useState(false);
  const [intermediateLevel, setIntermediateLevel] = useState(false);
  const [professionalLevel, setProfessionalLevel] = useState(false);
  const isMobile = useMobileDetection();

  useEffect(() => {
    if (winningScreen && questionIndex === questions.length) {
      setLevel("");
    }
  }, [questionIndex]);

  useEffect(() => {
    fetchQuestions();
    const currentQuestion = JSON.parse(
      sessionStorage.getItem("currentQuestion")
    );
    const currentLives = JSON.parse(sessionStorage.getItem("currentLives"));
    const currentLevel = JSON.parse(sessionStorage.getItem("currentLevel"));
    const intermediateLevelShown = JSON.parse(
      sessionStorage.getItem("intermediateLevelShown")
    );
    intermediateLevelShown && setIntermediateLevel(intermediateLevelShown);
    const professionalLevelShown = JSON.parse(
      sessionStorage.getItem("professionalLevelShown")
    );
    professionalLevelShown && setProfessionalLevel(professionalLevelShown);
    currentQuestion && setQuestionIndex(currentQuestion);
    currentLives && setLives(currentLives);
    currentLevel && setLevel(currentLevel);
    showLevelUpScreen(false);
  }, []);

  useEffect(() => {
    JSON.stringify(sessionStorage.setItem("currentQuestion", questionIndex));
    JSON.stringify(sessionStorage.setItem("currentLives", lives));
    JSON.stringify(
      sessionStorage.setItem("intermediateLevelShown", intermediateLevel)
    );
    JSON.stringify(
      sessionStorage.setItem("professionalLevelShown", professionalLevel)
    );
    sessionStorage.setItem("currentLevel", JSON.stringify(level));
  }, [questionIndex, lives, level]);

  useEffect(() => {
    const intermediateLevelShown = JSON.parse(
      sessionStorage.getItem("intermediateLevelShown")
    );
    const professionalLevelShown = JSON.parse(
      sessionStorage.getItem("professionalLevelShown")
    );
    if (level !== "beginner") {
      showLevelUpScreen(true);
    }

    if (professionalLevelShown && level === "professional") {
      showLevelUpScreen(false);
    }

    if (intermediateLevelShown && level === "intermediate") {
      showLevelUpScreen(false);
    }

    if (level === "intermediate") {
      setIntermediateLevel(true);
    }
    if (level === "professional") {
      setProfessionalLevel(true);
    }
  }, [level]);

  useEffect(() => {
    if (questions.length > 0 && questionIndex >= questions.length - 1) {
      setWinningScreen(true);
    }
  }, [questionIndex, questions.length]);

  useEffect(() => {
    if (questions.length > 0) {
      if (questionIndex < questions.length - 1) {
        const currentQuestion = questions[questionIndex];
        const questionLevel = currentQuestion
          ? currentQuestion.level
          : "beginner";
        setLevel(questionLevel);
      } else if (questionIndex === questions.length - 1) {
        setLevel("professional");
      }
    }
  }, [questionIndex, questions.length]);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get("/api/questions/getAllQuestions");
      data.sort((a, b) => a.level.localeCompare(b.level));
      setQuestions(data);
    } catch (error) {
      toast({
        title: "error occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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
    if (index === parseInt(correct)) {
      setQuestionIndex(questionIndex + 1);
    }
    if (index !== parseInt(correct)) {
      setLives(lives - 1);
      toast({
        title: "try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const renderScreens = () => {
    if (lives === 0) {
      return (
        <LoosingScreen
          setLives={setLives}
          setQuestionIndex={setQuestionIndex}
          setIntermediateLevel={setIntermediateLevel}
          setProfessionalLevel={setProfessionalLevel}
        />
      );
    }

    if (questions.length > 0 && questionIndex === questions.length) {
      return (
        <WinningScreen
          showLevelUpScreen={showLevelUpScreen}
          setQuestionIndex={setQuestionIndex}
          setLives={setLives}
          setIntermediateLevel={setIntermediateLevel}
          setProfessionalLevel={setProfessionalLevel}
        />
      );
    }

    if (questions.length > 0 && levelUpScreen) {
      return (
        <LevelUpScreen
          showLevelUpScreen={showLevelUpScreen}
          level={level}
          intermediateLevel={intermediateLevel}
          professionalLevel={professionalLevel}
        />
      );
    }

    if (questions.length > 0 && lives !== 0) {
      return (
        <React.Fragment>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={{ base: 5, md: 10 }}
          >
            <Box>
              <Heading fontSize={{ base: 25, md: 40 }}>
                Question {questionIndex + 1}
              </Heading>
              {!isMobile && (
                <Text fontSize={{ base: 15, md: 20 }} className="capitalize">
                  Difficulty: {questions[questionIndex].level}
                </Text>
              )}
            </Box>
            <Box display="flex">
              {Array.from({ length: lives }, (_, index) => (
                <IoIosHeart size={isMobile ? 20 : 25} key={index} fill="red" />
              ))}
            </Box>
          </Box>
          <Question
            questions={questions}
            checkAnswer={checkAnswer}
            questionIndex={questionIndex}
            setShowHint={setShowHint}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <SlideFade offsetY="20px" in={true}>
      <Box
        px={{ base: 5, md: 100 }}
        py={5}
        className={`game-container ${
          lives === 0
            ? "lost"
            : level === "intermediate"
            ? "intermediate"
            : level === "professional"
            ? "professional"
            : "normal"
        }`}
        width="100%"
        height="100vh"
        backgroundColor="#FAF9F6"
      >
        {renderScreens()}
      </Box>
    </SlideFade>
  );
};

export default Game;
