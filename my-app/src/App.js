import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useCallback, useState } from 'react';
import MainPage from './MainPage';
import { surveyJson } from './surveyJson';

function App() {
  const [surveyResults, setSurveyResults] = useState(null);
  const [formStarted, setFormStarted] = useState(false)
  const survey = new Model(surveyJson);

  const onComplete = useCallback((sender) => {
    setSurveyResults(JSON.stringify(sender.data));
  }, []);

  const handleStartForm = () => {
    setFormStarted(true)
  }

  survey.onComplete.add(onComplete);
  return (
    <div>
      {formStarted ? (
        surveyResults ? (
        <div>
          <h2>Survey Results:</h2>
          <p>{surveyResults}</p>
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
