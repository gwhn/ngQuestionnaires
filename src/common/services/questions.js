angular.module('ngQuestionnaires.services')
  .factory('questions', [
    'fbUrl',
    'Firebase',
    'angularFireCollection',
    function (fbUrl, Firebase, angularFireCollection) {

      var ref = new Firebase(fbUrl + 'questions'),
        col = angularFireCollection(ref);

      return col;

    }
  ]);
