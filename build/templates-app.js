angular.module('templates-app', ['alerts.tpl.html', 'footer.tpl.html', 'header.tpl.html', 'questionnaires/delete.tpl.html', 'questionnaires/edit.tpl.html', 'questionnaires/list.tpl.html', 'questionnaires/show.tpl.html', 'questions/delete.tpl.html', 'questions/edit.tpl.html', 'questions/list.tpl.html', 'responses/delete.tpl.html', 'responses/list.tpl.html', 'responses/new.tpl.html']);

angular.module("alerts.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("alerts.tpl.html",
    "<alert ng-repeat=\"alert in alerts\" type=\"alert.type\" close=\"closeAlert($index)\">\n" +
    "  {{alert.msg}}\n" +
    "</alert>\n" +
    "");
}]);

angular.module("footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("footer.tpl.html",
    "<section class=\"navbar navbar-default navbar-fixed-bottom\">\n" +
    "  <p class=\"text-muted text-center\">Developed by <a href=\"https://github.com/gwhn/ngQuestionnaires\">Guy Newman</a>\n" +
    "    for Weblitz Ltd using AngularJS.</p>\n" +
    "</section>\n" +
    "");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<nav class=\"navbar navbar-default\">\n" +
    "  <div class=\"navbar-header\">\n" +
    "    <a class=\"navbar-brand\" ui-sref=\"questionnaireList\">ngQuestionnaires</a>\n" +
    "  </div>\n" +
    "  <ul class=\"nav navbar-nav\">\n" +
    "    <li>\n" +
    "      <a ui-sref=\"questionList\">Questions</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a ui-sref=\"responseList\">Responses</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</nav>\n" +
    "");
}]);

angular.module("questionnaires/delete.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("questionnaires/delete.tpl.html",
    "<p class=\"lead\">Are you sure you want to delete {{questionnaire.title}}?</p>\n" +
    "\n" +
    "<ul class=\"list-inline\">\n" +
    "  <li>\n" +
    "    <button type=\"button\" ng-click=\"remove()\" class=\"btn btn-danger\">Delete</button>\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <a ui-sref=\"questionnaireList\" class=\"btn btn-link\">Cancel</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("questionnaires/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("questionnaires/edit.tpl.html",
    "<form name=\"questionnaireForm\" novalidate>\n" +
    "  <div class=\"form-group\" validation-class on=\"title\">\n" +
    "    <label for=\"questionnaireTitle\" class=\"control-label\">Title</label>\n" +
    "    <input type=\"text\" ng-model=\"questionnaire.title\" name=\"title\"\n" +
    "           id=\"questionnaireTitle\" class=\"form-control\" required unique-questionnaire-title/>\n" +
    "    <span show-help on=\"title\" when=\"required\">Title is required</span>\n" +
    "    <span show-help on=\"title\" when=\"uniqueQuestionnaireTitle\">Title must be unique</span>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" validation-class on=\"description\">\n" +
    "    <label for=\"questionnaire.description\" class=\"control-label\">Description</label>\n" +
    "    <textarea ng-model=\"questionnaire.description\" name=\"description\"\n" +
    "              id=\"questionnaire.description\" class=\"form-control\" rows=\"3\" required></textarea>\n" +
    "    <span show-help on=\"description\" when=\"required\">Description is required</span>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"checkbox\">\n" +
    "    <label class=\"control-label\">\n" +
    "      <input type=\"checkbox\" ng-model=\"questionnaire.published\"/>\n" +
    "      Published?\n" +
    "    </label>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" validation-class on=\"questions\">\n" +
    "    <label for=\"questionnaire.questions\" class=\"control-label\">Questions</label>\n" +
    "    <select ng-model=\"questionnaire.questions\" name=\"questions\" size=\"10\"\n" +
    "            ng-options=\"question.id as question.text for question in questions\"\n" +
    "            id=\"questionnaire.questions\" class=\"form-control\" multiple required>\n" +
    "    </select>\n" +
    "    <ul class=\"list-inline pull-right\">\n" +
    "      <li>\n" +
    "        <button type=\"button\" ng-click=\"addQuestion()\" class=\"btn btn-link\">New</button>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <span show-help on=\"questions\" when=\"required\">Questions are required</span>\n" +
    "  </div>\n" +
    "\n" +
    "  <ul class=\"list-inline\">\n" +
    "    <li>\n" +
    "      <div ng-switch=\"action\">\n" +
    "        <button type=\"button\" ng-switch-when=\"Save\" ng-click=\"save()\" disabled-when-invalid\n" +
    "                class=\"btn btn-primary\">{{action}}</button>\n" +
    "        <button type=\"button\" ng-switch-default ng-click=\"update()\" disabled-when-invalid\n" +
    "                class=\"btn btn-primary\">{{action}}</button>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <button type=\"button\" ng-click=\"cancel()\" class=\"btn btn-link\">Cancel</button>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</form>\n" +
    "");
}]);

angular.module("questionnaires/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("questionnaires/list.tpl.html",
    "<div class=\"well well-large\">\n" +
    "  <form name=\"search\">\n" +
    "    <input type=\"search\" class=\"form-control\" placeholder=\"Search\" ng-model=\"search.query\"/>\n" +
    "  </form>\n" +
    "\n" +
    "  <p class=\"label label-info pull-right\" ng-show=\"search.query\">\n" +
    "    <span ng-switch=\"totalItems\">\n" +
    "      <span ng-switch-when=\"0\">No questionnaires match</span>\n" +
    "      <span ng-switch-when=\"1\">One questionnaire matches</span>\n" +
    "      <span ng-switch-default>{{totalItems}} questionnaires match</span>\n" +
    "      {{search.query}}\n" +
    "    </span>\n" +
    "  </p>\n" +
    "</div>\n" +
    "\n" +
    "<ul class=\"list-inline\">\n" +
    "  <li>\n" +
    "    <a ui-sref=\"questionnaireNew\" class=\"btn btn-link\">New</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "\n" +
    "<article class=\"questionnaire\"\n" +
    "         ng-repeat=\"questionnaire in filteredQuestionnaires | skip:(page-1)*itemsPerPage | limitTo:itemsPerPage\">\n" +
    "\n" +
    "  <ul class=\"list-inline pull-right\">\n" +
    "    <li>\n" +
    "      <a ui-sref=\"questionnaireShow({id: questionnaire.id})\" class=\"btn btn-link\">Show</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a ui-sref=\"questionnaireEdit({id: questionnaire.id})\" class=\"btn btn-link\">Edit</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a ui-sref=\"questionnaireDelete({id: questionnaire.id})\" class=\"btn btn-link\">Delete</a>\n" +
    "    </li>\n" +
    "    <li ng-if=\"questionnaire.published\">\n" +
    "      <a ui-sref=\"responseNew({id: questionnaire.id})\" class=\"btn btn-link\">Respond</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <p class=\"lead\">{{questionnaire.title}}</p>\n" +
    "\n" +
    "  <p>{{questionnaire.description}}</p>\n" +
    "\n" +
    "  <p class=\"text-muted\">\n" +
    "    <span ng-if=\"questionnaire.questions\">\n" +
    "      Questions # {{questionnaire.questions.length}}<br/>\n" +
    "    </span>\n" +
    "    <span ng-switch=\"questionnaire.published\">\n" +
    "      Published?\n" +
    "      <span ng-switch-when=\"true\"><i class=\"glyphicon glyphicon-ok\"></i></span>\n" +
    "      <span ng-switch-default><i class=\"glyphicon glyphicon-remove\"></i></span>\n" +
    "    </span>\n" +
    "  </p>\n" +
    "\n" +
    "  <hr/>\n" +
    "</article>\n" +
    "\n" +
    "<div class=\"text-center\">\n" +
    "  <pagination total-items=\"totalItems\" page=\"page\" max-size=\"maxSize\"\n" +
    "              items-per-page=\"itemsPerPage\" boundary-links=\"true\" rotate=\"false\"></pagination>\n" +
    "</div>\n" +
    "");
}]);

angular.module("questionnaires/show.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("questionnaires/show.tpl.html",
    "<p class=\"lead\">{{questionnaire.title}}</p>\n" +
    "\n" +
    "<p>{{questionnaire.description}}</p>\n" +
    "\n" +
    "<p ng-switch=\"questionnaire.published\">\n" +
    "  Published?\n" +
    "  <span ng-switch-when=\"true\"><i class=\"glyphicon glyphicon-ok\"></i></span>\n" +
    "  <span ng-switch-default><i class=\"glyphicon glyphicon-remove\"></i></span>\n" +
    "</p>\n" +
    "\n" +
    "<h3>Questions</h3>\n" +
    "<ul class=\"list-unstyled\">\n" +
    "  <li ng-repeat=\"questionId in questionnaire.questions\">\n" +
    "    <article ng-controller=\"QuestionShowCtrl\">\n" +
    "      <p class=\"lead\">{{question.text}}</p>\n" +
    "\n" +
    "      <ol>\n" +
    "        <li ng-repeat=\"choice in question.choices\">{{choice.text}}</li>\n" +
    "      </ol>\n" +
    "\n" +
    "      <hr/>\n" +
    "    </article>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "<p ng-if=\"!questionnaire.questions\" class=\"text-info\">There are no questions</p>\n" +
    "\n" +
    "<ul class=\"list-inline\">\n" +
    "  <li>\n" +
    "    <a ui-sref=\"questionnaireList\" class=\"btn btn-link\">Back</a>\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <a ui-sref=\"questionnaireEdit({id: questionnaire.id})\" class=\"btn btn-link\">Edit</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("questions/delete.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("questions/delete.tpl.html",
    "<p class=\"lead\">Are you sure you want to delete {{question.text}}?</p>\n" +
    "\n" +
    "<ul class=\"list-inline\">\n" +
    "  <li>\n" +
    "    <button type=\"button\" ng-click=\"remove()\" class=\"btn btn-danger\">Delete</button>\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <a ui-sref=\"questionList\" class=\"btn btn-link\">Cancel</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("questions/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("questions/edit.tpl.html",
    "<form name=\"questionForm\" novalidate>\n" +
    "  <div class=\"form-group\" validation-class on=\"question\">\n" +
    "    <label for=\"questionText\" class=\"control-label\">Text</label>\n" +
    "    <input type=\"text\" ng-model=\"question.text\" name=\"question\"\n" +
    "           id=\"questionText\" class=\"form-control\" required unique-question-text/>\n" +
    "    <span show-help on=\"question\" when=\"required\">Question text is required</span>\n" +
    "    <span show-help on=\"question\" when=\"uniqueQuestionText\">Question text must be unique</span>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\" ng-model=\"question.choices\" multiple-required validation-class>\n" +
    "    <label class=\"control-label\">Choices</label>\n" +
    "    <div ng-repeat=\"choice in question.choices\" ng-form=\"choiceForm\"\n" +
    "         validation-class on=\"choice\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <input type=\"text\" ng-model=\"choice.text\" name=\"choice\"\n" +
    "               class=\"form-control\" required/>\n" +
    "        <span class=\"input-group-btn\">\n" +
    "            <button type=\"button\" ng-click=\"removeChoice($index)\" class=\"btn btn-default\">\n" +
    "              <i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "            </button>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <span show-help on=\"choice\" when=\"required\">Choice text is required</span>\n" +
    "    </div>\n" +
    "    <span show-help when=\"multipleRequired\">More than one choice is required</span>\n" +
    "    <button type=\"button\" ng-click=\"addChoice()\" class=\"btn btn-default\">\n" +
    "      <i class=\"glyphicon glyphicon-plus\"></i>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "\n" +
    "  <ul class=\"list-inline\">\n" +
    "    <li>\n" +
    "      <div ng-switch=\"action\">\n" +
    "        <button type=\"button\" ng-switch-when=\"Save\" ng-click=\"save()\" disabled-when-invalid\n" +
    "                class=\"btn btn-primary\">{{action}}</button>\n" +
    "        <button type=\"button\" ng-switch-default ng-click=\"update()\" disabled-when-invalid\n" +
    "                class=\"btn btn-primary\">{{action}}</button>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <button type=\"button\" ng-click=\"cancel()\" class=\"btn btn-link\">Cancel</button>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</form>\n" +
    "");
}]);

angular.module("questions/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("questions/list.tpl.html",
    "<div class=\"well well-large\">\n" +
    "  <form name=\"search\">\n" +
    "    <input type=\"search\" class=\"form-control\" placeholder=\"Search\" ng-model=\"search.query\"/>\n" +
    "  </form>\n" +
    "\n" +
    "  <p class=\"label label-info pull-right\" ng-show=\"search.query\">\n" +
    "    <span ng-switch=\"totalItems\">\n" +
    "      <span ng-switch-when=\"0\">No questions match</span>\n" +
    "      <span ng-switch-when=\"1\">One question matches</span>\n" +
    "      <span ng-switch-default>{{totalItems}} questions match</span>\n" +
    "      {{search.query}}\n" +
    "    </span>\n" +
    "  </p>\n" +
    "</div>\n" +
    "\n" +
    "<ul class=\"list-inline\">\n" +
    "  <li>\n" +
    "    <a ui-sref=\"questionNew\" class=\"btn btn-link\">New</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "\n" +
    "<article class=\"question\"\n" +
    "         ng-repeat=\"question in filteredQuestions | skip:(page-1)*itemsPerPage | limitTo:itemsPerPage\">\n" +
    "\n" +
    "  <ul class=\"list-inline pull-right\">\n" +
    "    <li>\n" +
    "      <a ui-sref=\"questionEdit({id: question.id})\" class=\"btn btn-link\">Edit</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a ui-sref=\"questionDelete({id: question.id})\" class=\"btn btn-link\">Delete</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <p class=\"lead\">{{question.text}}</p>\n" +
    "\n" +
    "  <ol>\n" +
    "    <li ng-repeat=\"choice in question.choices\">{{choice.text}}</li>\n" +
    "  </ol>\n" +
    "\n" +
    "  <hr/>\n" +
    "</article>\n" +
    "\n" +
    "<div class=\"text-center\">\n" +
    "  <pagination total-items=\"totalItems\" page=\"page\" max-size=\"maxSize\"\n" +
    "              items-per-page=\"itemsPerPage\" boundary-links=\"true\" rotate=\"false\"></pagination>\n" +
    "</div>\n" +
    "");
}]);

angular.module("responses/delete.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("responses/delete.tpl.html",
    "<p class=\"lead\">Are you sure you want to delete {{response.questionnaire}} from {{response.respondent}}?</p>\n" +
    "\n" +
    "<ul class=\"list-inline\">\n" +
    "  <li>\n" +
    "    <button type=\"button\" ng-click=\"remove()\" class=\"btn btn-danger\">Delete</button>\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <a ui-sref=\"responseList\" class=\"btn btn-link\">Cancel</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("responses/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("responses/list.tpl.html",
    "<div class=\"well well-large\">\n" +
    "  <form name=\"search\">\n" +
    "    <input type=\"search\" class=\"form-control\" placeholder=\"Search\" ng-model=\"search.query\"/>\n" +
    "  </form>\n" +
    "\n" +
    "  <p class=\"label label-info pull-right\" ng-show=\"search.query\">\n" +
    "    <span ng-switch=\"totalItems\">\n" +
    "      <span ng-switch-when=\"0\">No responses match</span>\n" +
    "      <span ng-switch-when=\"1\">One response matches</span>\n" +
    "      <span ng-switch-default>{{totalItems}} responses match</span>\n" +
    "      {{search.query}}\n" +
    "    </span>\n" +
    "  </p>\n" +
    "</div>\n" +
    "\n" +
    "<article class=\"response\"\n" +
    "         ng-repeat=\"response in filteredResponses | skip:(page-1)*itemsPerPage | limitTo:itemsPerPage\">\n" +
    "\n" +
    "  <ul class=\"list-inline pull-right\">\n" +
    "    <li>\n" +
    "      <a ui-sref=\"responseDelete({id: response.id})\" class=\"btn btn-link\">Delete</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <p class=\"lead\">{{response.questionnaire}}</p>\n" +
    "\n" +
    "  <p class=\"lead\"><strong>Respondent</strong> {{response.respondent}}</p>\n" +
    "\n" +
    "  <table class=\"table table-striped\">\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "      <th>Question</th>\n" +
    "      <th>Choice</th>\n" +
    "    </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-repeat=\"answer in response.answers\">\n" +
    "      <td class=\"col-md-6\">{{answer.question}}</td>\n" +
    "      <td class=\"col-md-6\">{{answer.choice}}</td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "\n" +
    "  <hr/>\n" +
    "</article>\n" +
    "\n" +
    "<div class=\"text-center\">\n" +
    "  <pagination total-items=\"totalItems\" page=\"page\" max-size=\"maxSize\"\n" +
    "              items-per-page=\"itemsPerPage\" boundary-links=\"true\" rotate=\"false\"></pagination>\n" +
    "</div>\n" +
    "");
}]);

angular.module("responses/new.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("responses/new.tpl.html",
    "<p class=\"lead\">{{questionnaire.description}}</p>\n" +
    "\n" +
    "<form name=\"responseForm\" novalidate>\n" +
    "  <div class=\"form-group\" validation-class on=\"respondent\">\n" +
    "    <label for=\"respondent\" class=\"control-label\">Respondent</label>\n" +
    "    <input type=\"text\" ng-model=\"respondent\" name=\"respondent\"\n" +
    "           id=\"respondent\" class=\"form-control\" required/>\n" +
    "    <span show-help on=\"respondent\" when=\"required\">Respondent is required</span>\n" +
    "  </div>\n" +
    "\n" +
    "  <h3>Questions</h3>\n" +
    "  <ul class=\"list-unstyled\">\n" +
    "    <li ng-repeat=\"questionId in questionnaire.questions\">\n" +
    "      <article ng-controller=\"QuestionShowCtrl\" ng-form=\"choiceForm\">\n" +
    "        <p class=\"lead\">{{question.text}}</p>\n" +
    "\n" +
    "        <ul class=\"list-unstyled form-group\" validation-class>\n" +
    "          <li ng-repeat=\"choice in question.choices\">\n" +
    "            <div class=\"radio\">\n" +
    "              <label class=\"control-label\">\n" +
    "                <input type=\"radio\" ng-model=\"$parent.response.choices\" value=\"{{choice.text}}\"\n" +
    "                       ng-click=\"answer(question.text, choice.text)\" required/>\n" +
    "                {{choice.text}}\n" +
    "              </label>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <span show-help when=\"required\">Choice is required</span>\n" +
    "\n" +
    "        <hr/>\n" +
    "      </article>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <ul class=\"list-inline\">\n" +
    "    <li>\n" +
    "      <button type=\"button\" ng-click=\"submit()\" disabled-when-invalid class=\"btn btn-primary\">Submit</button>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a ui-sref=\"responseList\" class=\"btn btn-link\">Cancel</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</form>\n" +
    "");
}]);
