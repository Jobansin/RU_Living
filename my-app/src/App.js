import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { major } from './majors';
import { useCallback, useState } from 'react';
import MainPage from './MainPage';

const surveyJson = {
  pages: [
  {
    elements: 
    [{
      type: "radiogroup",
      name: "town",
      title: "What year are you?",
      choices: [
        { text: 'freshman' },
        { text: 'sophomore' },
        { text: 'junior' },
        { text: 'senior' },
        { text: 'graduate' },
      ],
      isRequired: true
    }]
  },
  {
    elements:
    [{
      name: "environment",
      title: "Do you prefer a quiet or loud environment?",
      type: "radiogroup",
      choices: [
        { text: "quiet" },
        { text: "loud" },
        { text: "neutral" },
    ],
    isRequired: true
    }]
  },
  {
    elements:
    [
      {
        type: "radiogroup",
        name: "major",
        title: "Do you prefer dorming with people that have the same major as you?",
        choices: [
          { text: 'yes' },
          { text: 'no' },
        ],
        isRequired: true
      },
      {
        type: "dropdown",
        name: "majorName",
        visibleIf: "{major} == 'yes'",
        title: "Enter your major:",
        isRequired: true,
        choices: major
      },
    ]
  },
  {
    elements:
    [
      {
        type: "radiogroup",
        name: "campus",
        title: "Do you prefer dorming in a campus near your classes?",
        choices: [
          { text: 'yes' },
          { text: 'no' },
        ],
        isRequired: true
      },
      {
        type: "checkbox",
        name: "campusName",
        visibleIf: "{campus} == 'yes'",
        title: "Enter your desired campus:",
        isRequired: true,
        choices: [
          { text: 'Livingston' },
          { text: 'Busch' },
          { text: 'College Ave' },
          { text: 'Cook/Doug' },
        ]
      },
    ]
  },
  {
    elements: 
    [
      {
        type: "radiogroup",
        name: "personality",
        title: "Do you prefer a person with a similar personality as you?",
        choices: [
          { text: 'yes' },
          { text: 'no' },
        ],
        isRequired: true
      },
      {
        type: "dropdown",
        name: "personalityName",
        visibleIf: "{personality} == 'yes'",
        title: "Enter your personality:",
        isRequired: true,
        choices: [
          { text: 'Extrovert' },
          { text: 'Introvert' },
          { text: 'Both' },
        ]
      },
    ]
  },
  {
    elements:
    [
      {
        type: "radiogroup",
        name: "food",
        title: "Do you prefer a campus with a lot of food options?",
        choices: [
          { text: 'yes' },
          { text: 'no' },
        ],
        isRequired: true
      }
    ]
  },
  {
    elements:
    [
      {
        type: "radiogroup",
        name: "town",
        title: "Do you prefer a campus that is downtown or not?",
        choices: [
          { text: 'yes' },
          { text: 'no' },
          { text: 'neutral' },
        ],
        isRequired: true
      },
    ]
  },
  {
    elements:
    [
      {
        type: "radiogroup",
        name: "town",
        title: "What type of housing do you prefer?",
        choices: [
          { text: 'Traditional Residence Hall' },
          { text: 'Apartment' },
          { text: 'Suite' },
          { text: 'neutral' },
        ],
        isRequired: true
      },
    ]
  }
  ]
  
}

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
