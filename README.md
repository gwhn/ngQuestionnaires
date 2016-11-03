# ngQuestionnaires

## Purpose

ngQuestionnaires is a single page application using AngularJS 1.2.0 rc3.

It is a demonstration application, used for learning, with sufficient complexity
to exercise many common aspects of developing sophisticated web applications
such as many-to-many relationships, nested collections, CRUD operations, pagination etc.

It uses [Firebase](https://www.firebase.com/index.html) database to persist the following data structures as JSON,
however it does not use the AngularJS bindings which support implicit synchronisation,
instead opting to use the lower-level [Firebase API](https://www.firebase.com/docs/javascript/firebase/index.html)
directly. The beauty of using Firebase is you can integrate without the need for server-side proxying.

It also uses Firebase authentication with GitHub, Facebook and Twitter providers, and uses write rules to enforce
edits only by authenticated users.

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null && data.exists()",
    "questionnaires": {
      "$questionnaire": {
        ".write": "(auth != null && !data.exists()) || (auth != null && data.exists() && data.child('userId').val() == auth.id)"
      }
    },
    "questions": {
      "$question": {
        ".write": "(auth != null && !data.exists()) || (auth != null && data.exists() && data.child('userId').val() == auth.id)",
        "choices": {
          "$index": {
            ".write": "auth != null && data.exists()"
          }
        }
      }
    },
    "responses": {
      "$response": {
        ".write": "(auth != null && !data.exists()) || (auth != null && data.exists() && data.child('userId').val() == auth.id)"
      }
    }
  }
}
```

It uses [d3](http://d3js.org/) visualization library to generate bar charts for the question choices answered.

It is seeded from the [ng-boilerplate](https://github.com/ngbp/ng-boilerplate)
and [angular-seed](https://github.com/angular/angular-seed) Github projects
which contain many of the best practises for developing AngularJS apps.

## Live Demo

You can find a live demo [here](http://gwhn.github.io/ngQuestionnaires/) on Github.

## Data structures

### questionnaires

* userId (String)
* title (String)
* description (String)
* published (Boolean)
* createdAt (Date)
* updatedAt (Date)
* count (Number)
* questions (ref Array)

### questions

* userId (String)
* text (String)
* multiple (Boolean)
* createdAt (Date)
* updatedAt (Date)
* count (Number)
* choices (Array)
    * text (String)
    * count (Number)

### responses

* userId (String)
* respondent (String)
* questionnaire (String)
* createdAt (Date)
* answers (Array)
    * question (String)
    * choices (Array)

## Quick Start

The scripts folder contains a [Node.js](http://nodejs.org/) web server for convenience.

[Bower](http://sindresorhus.com/bower-components/) is used for package management.

[Grunt](http://gruntjs.com/) is used to automate tasks including unit tests, linting, compilation and minification.

[Karma](http://karma-runner.github.io/0.10/index.html) (formerly Testacular) is used to run unit tests.

[Jasmine](http://jasmine.github.io/) is used as the test framework.

[Bootstrap 3](http://getbootstrap.com/getting-started/) is used as the front-end styles framework.

[AngularUI Router](https://github.com/angular-ui/ui-router) is used as the routing framework
providing a state machine interface.

Install Node.js and then:

```sh
$ git clone git://github.com/gwhn/ngQuestionnaires
$ cd ngQuestionnaires
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt watch
```

Finally, open `file:///path/to/ngQuestionnaires/build/index.html` in your browser.

At the time of writing, there was a build issue related to angular-ui-bootstrap and bootstrap components
not providing distribution files. To resolve the issue you will need to build angular-ui-bootstrap first.

##Recommendations

It is highly recommended that you install AngularJS Batarang for Chrome, which provides
useful tools for debugging and profiling, and LiveReload which will apply CSS and script
edits without the need to refresh your browser.
