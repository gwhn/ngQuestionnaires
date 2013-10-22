# ngQuestionnaires

ngQuestionnaires is a single page application using AngularJS 1.2.0 rc2.

It uses Firebase database to persist the following data structures as JSON.

## questionnaires

* title (String)
* description (String)
* published (Boolean)
* questions (Array)

## questions

* text (String)
* choices (Array)
    * ordinal (Number)
    * text (String)

## responses

* respondent (String)
* questionnaire (String)
* answers (Array)
    * question (String)
    * choice (String)
