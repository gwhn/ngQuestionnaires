angular.module('ngQuestionnaires.services')

  .factory('firebaseFactory',
    ['$document', '$q', '$rootScope', 'fbCdn',
      function ($document, $q, $rootScope, fbCdn) {

        var deferred = $q.defer(),
          document = $document[0],
          script = document.createElement('script'),
          body = document.getElementsByTagName('body')[0],
          onScriptLoad = function () {
            $rootScope.$apply(function () {
              deferred.resolve(window.Firebase);
            });
          };

        script.src = fbCdn;
        script.type = 'text/javascript';
        script.async = true;
        script.onreadystatechange = function () {
          if (this.readystate === 'complete') {
            onScriptLoad();
          }
        };
        script.onload = onScriptLoad;

        body.appendChild(script);

        return {
          firebase: function () {
            return deferred.promise;
          }
        };
      }
    ]
  );