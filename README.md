# ngQuestionnaires

ngQuestionnaires is a single page application using AngularJS 1.2.0 rc2 cloned from angular/angular-seed.

It uses Firebase database to persist the following data structures as JSON and provides bi-directional synchronisation.

## questionnaires

* title
* description
* published
* questions
* responses

## questions

* text
* choices
    * ordinal
    * text

## responses

* respondent
* questionnaire
* answers
    * question
    * choice
