import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { major } from './majors';

const surveyJson = {
  elements: [{
    name: "environment",
    title: "Do you prefer a quiet or loud environment?",
    type: "radiogroup",
    choices: [
      { text: "quiet" },
      { text: "loud" },
      { text: "neutral" },
  ],
  isRequired: true
  }, 
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
    type: "dropdown",
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
};

function App() {
  const survey = new Model(surveyJson);
  return (
    <div>
      <Survey model={survey} />
      {console.log(survey.data)}
    </div>
  );
}

export default App;
