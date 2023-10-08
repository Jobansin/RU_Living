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
    setSurveyResults(JSON.stringify(sender.data));
    fetchDorms(surveyResults);
  }, []);

  const handleStartForm = () => {
    setFormStarted(true)
  }

  const fetchDorms =  ((surveyResults) => {     //failed to fetch, is this the correct way to fetch
    fetch("http://localhost:1234/dorm-result", { //if so, why are we getting errors (CORS maybe? idk what it is)
      method: "POST",                             //fetch is getting response of http://localhost:1234/dorm-result
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveyResults),
    }).then((response) => {
      console.log(response)
    })
  })
        
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
          <h2>Survey Results:</h2>
          {/* <p>{dormData}</p> */}
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
