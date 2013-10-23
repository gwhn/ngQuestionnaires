# ngQuestionnaires

## Purpose

ngQuestionnaires is a single page application using AngularJS 1.2.0 rc3.

It is a demonstration application, used for learning, with sufficient complexity
to exercise many common aspects of developing sophisticated web applications
such as many-to-many relationships, nested collections, CRUD operations, pagination etc.

It uses Firebase database to persist the following data structures as JSON,
however it does not use the AngularJS bindings which support implicit synchronisation,
instead opting to use the lower-level Firebase API directly.

It is seeded from the [ng-boilerplate](https://github.com/ngbp/ng-boilerplate)
and [angular-seed](https://github.com/angular/angular-seed) Github projects
which contain many of the best practises for developing AngularJS apps.

## Data structures

### questionnaires

* title (String)
* description (String)
* published (Boolean)
* questions (ref Array)

### questions

* text (String)
* choices (Array)
    * ordinal (Number)
    * text (String)

### responses

* respondent (String)
* questionnaire (String)
* answers (Array)
    * question (String)
    * choice (String)

## Quick Start

The scripts folder contains a Node.js web server for convenience.

Bower is used for package management.

Grunt is used to automate tasks including unit tests, linting, compilation and minification.

Karma (formerly Testacular) is used to run unit tests.

Jasmine is used as the test framework.

Bootstrap 3 is used as the front-end styles framework.

AngularUI Router is used as the routing framework providing a state machine interface.

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