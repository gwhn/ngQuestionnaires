angular.module('ngQuestionnaires.services')
  .factory('responses', [
    'fbUrl',
    'Firebase',
    'angularFireCollection',
    function (fbUrl, Firebase, angularFireCollection) {

      var ref = new Firebase(fbUrl + 'responses'),
        col = angularFireCollection(ref);

      return col;

    }
  ]);
