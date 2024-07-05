import { useEffect, useState } from "react";
import "./App.css";

const Question = ({
  question,
  answers,
  onAnswer,
}: {
  question: string;
  answers: Array<string>;
  onAnswer: (answer: number) => void;
}) => {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(false);
  }, [question]);
  return (
    <div>
      <h2>{question}</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
        {answers.map((answer, i) => (
          <button
            disabled={disabled}
            onClick={() => {
              onAnswer(i);
              setDisabled(true);
            }}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

const Feedback = ({ text }: { text: string }) => {
  return <h3>{text}</h3>;
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const questions: Array<{
    question: string;
    answers: Array<string>;
    correctIndex: number;
  }> = [
    {
      question: "Vad gör pandor när de står på händer?",
      answers: ["Kissar", "Äter", "Sover"],
      correctIndex: 0,
    },
    {
      question: "Vilken författare skrev Karlsson på taket?",
      answers: ["Jo Salmsson", "Astrid Lindgren", "Camilla Brink"],
      correctIndex: 1,
    },
    {
      question: "Hur stor andel av jordens yta tar regnskogen?",
      answers: ["7%", "12%", "16%"],
      correctIndex: 0,
    },
    {
      question: "Hur många meter hög är solsystemets högsta vulkan?",
      answers: ["22000", "14100", "88000"],
      correctIndex: 0,
    },
    {
      question: "Hur många år sedan kom den första dinosaurien?",
      answers: ["120 miljoner", "180 miljoner", "230 miljoner"],
      correctIndex: 2,
    },
    {
      question: "Hur många sorters björnar finns det?",
      answers: ["5", "17", "23"],
      correctIndex: 0,
    },
  ];

  return (
    <>
      <div>
        <h1>Frågesport</h1>
        {/* <h2>Antal rätt {score}</h2> */}
        <Question
          answers={questions[currentQuestion].answers}
          question={questions[currentQuestion].question}
          onAnswer={(answer) => {
            setScore((old) =>
              answer === questions[currentQuestion].correctIndex ? old + 1 : old
            );
            setFeedback(
              answer === questions[currentQuestion].correctIndex
                ? "Rätt"
                : "Fel"
            );
          }}
        />
        <Feedback text={feedback} />
        {feedback !== "" && currentQuestion < questions.length - 1 && (
          <button
            onClick={() => {
              setCurrentQuestion((old) =>
                Math.min(old + 1, questions.length - 1)
              );
              setFeedback("");
            }}
          >
            Nästa
          </button>
        )}
        {currentQuestion === questions.length - 1 && feedback !== "" && (
          <>
            <h1>🎉 Du är klar och fick {score} poäng 🥳</h1>
            <button
              onClick={() => {
                location.reload();
              }}
            >
              Spela igen
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
