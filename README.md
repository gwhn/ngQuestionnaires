# ngQuestionnaires

ngQuestionnaires is a single page application using AngularJS.

## questionnaires

* id
* title
* description
* published
* questions
* responses

## questions

* id
* text
* questionnaires
* choices
* answers

## questionnaire_questions

* questionnaireId
* questionId

## choices

* id
* text
* ordinal
* questionId

## responses

* id
* respondent
* questionnaireId
* answers

## answers

* id
* questionId
* choiceId
