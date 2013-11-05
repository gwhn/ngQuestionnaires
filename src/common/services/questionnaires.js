angular.module('ngQuestionnaires.services')
  .factory('questionnaires', [
    'fbUrl',
    'Firebase',
    'angularFireCollection',
    function (fbUrl, Firebase, angularFireCollection) {

      var ref = new Firebase(fbUrl + 'questionnaires'),
        col = angularFireCollection(ref);

      return col;

    }
  ]);

