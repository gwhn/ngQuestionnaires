angular.module('ngQuestionnaires.services')
  .factory('categories', [
    'fbUrl',
    'Firebase',
    'angularFireCollection',
    function (fbUrl, Firebase, angularFireCollection) {

      var ref = new Firebase(fbUrl + 'categories'),
        col = angularFireCollection(ref);

      return col;

    }
  ]);
