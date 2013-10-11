# ngQuestionnaires

ngQuestionnaires is a single page application using AngularJS 1.2.0 rc2 cloned from angular/angular-seed.

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
