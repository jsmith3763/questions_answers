import { useEffect, useState } from "react";
import './App.css';
import Question from './components/Question';
import Answer from './components/Answer';
import styled from 'styled-components';
import { useRef } from 'react';
import { ChevronDown } from '@styled-icons/bootstrap';
import Collapsible from 'react-collapsible';
import FilterBar from "./components/FilterBar";
import LeftButtons from "./components/LeftButtons";
import BottomButtons from "./components/BottomButtons";



function App() {
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnswers();
    fetchQuestions();
    fetchUsers();
  }, [])

  const fetchAnswers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3042/answers');
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      setLoading(false);
      setAnswer(actualData);
      setError(null);
    } catch (error) {
      setError(error.message);
      setAnswer(null);
    }
  }

  // const fetchQuestions = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('http://localhost:3042/questions');
  //     if (!response.ok) {
  //       throw new Error(
  //         `This is an HTTP error: The status is ${response.status}`
  //       );
  //     }
  //     let actualData = await response.json();
  //     setLoading(false);
  //     setQuestion(actualData);
  //     setError(null);
  //   } catch (error) {
  //     setError(error.message);
  //     setQuestion(null);
  //   }
  // }

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3042/users');
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      setLoading(false);
      setUser(actualData);
      setError(null);
    } catch (error) {
      setError(error.message);
      setUser(null);
    }
  }

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3042/userquestion/join');
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      let actualData = await response.json();
      setLoading(false);
      setQuestion(actualData);
      setError(null);
    } catch (error) {
      setError(error.message);
      setUser(null);
    }
  }

  // function getAnswers() {
  //   if (question) {
  //     let filteredAnswers = question.filter((a) => {
  //       return a.question_id === question.question;
  //     }).map((a) => {
  //       return a.answer;
  //     })
  //   }
  // }



  return (
    <div className="App">
      <div className="qa-header">
        <Collapsible tabIndex={1} trigger='Questions & Answers' triggerSibling={<DownArrowIcon />} transitionTime={200}>
          <FilterBar />
          <div className="line-break"></div>
          <div className="button-qa-container">
            <LeftButtons />
            <div className="questions-answers-container">
              {loading && <div>Loading...</div>}
              {question && user && answer && question.map((q) => (
                <>
                  <Question question={q.question} author={q.username} key={q.userID} />
                  <Answer answers={answer} users={user} key={q.userID} />
                </>
              ))}
              {/* {question && user && <Question questions={question} users={user} />} */}
              {/* {answer && user && <Answer answers={answer} users={user} />} */}
            </div>
          </div>
          <div className="line-break"></div>
          <BottomButtons />
        </Collapsible>
      </div>
    </div>
  );
}

export default App;

const DownArrowIcon = styled(ChevronDown)`
  height: 20px;
  justify-self: flex-end;
`
