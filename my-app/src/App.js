import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useCallback, useState } from 'react';
import MainPage from './MainPage';
import { surveyJson } from './surveyJson';
import axios from 'axios';

function App() {
  const [surveyResults, setSurveyResults] = useState(null);
  const [formStarted, setFormStarted] = useState(false)
  const [dormData, setDormData] = useState(null);
  const survey = new Model(surveyJson);

  const onComplete = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    setSurveyResults(results);
    fetchDorms(results);
  }, []);

  const handleStartForm = () => {
    setFormStarted(true)
  }

  const fetchDorms = async (results) => {
  try {
    const response = await fetch("http://localhost:1234/dorm-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.text(); // Parse the response body as text
    console.log(responseData); // Log the response data

    setDormData(responseData); // Return the response data if needed
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for handling in your component
  }
};

        
    //)
    //.catch(error => {
    //  console.error('Error retrieving data:', error);
    //});    
    //const data = await response.json(); 
    //console.log(data)


  survey.onComplete.add(onComplete);
  return (
    <div>
      {formStarted ? (
        surveyResults ? (
        <div>
          <p>{dormData}</p>
        </div>
      ) : (
        <div>
          <div class="logo">
            <img src="ru.png" width="120px" height="60px"/>
            <h1 class="title">Living</h1>
          </div>
          <Survey model={survey}/>
          <img id="bot" src="scarlet.png" height="150px"/>
        </div> 
      )
      ) : (
        <MainPage onStartTest={handleStartForm}/>
      )}
    </div>
  );
}

export default App;
