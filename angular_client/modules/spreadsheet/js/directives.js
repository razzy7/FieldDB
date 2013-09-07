console.log("Loading the SpreadsheetStyleDataEntryDirectives.");

'use strict';
define(
  ["angular"],
  function(angular) {
    var SpreadsheetStyleDataEntryDirectives = angular
      .module('SpreadsheetStyleDataEntry.directives', [])
      .directive('moduleVersion', ['version',
        function(version) {
          return function(scope, element, attrs) {
            element.text(version);
          };
        }
      ])
      .directive(
        'selectDropdown1',
        function() {
          return function(scope, element, attrs) {
            if (scope.field.label == scope.scopePreferences.compacttemplate[attrs.selectDropdown1].label) {
              element[0].selected = true;
            }
          };
        })
      .directive(
        'selectDropdown2',
        function() {
          return function(scope, element, attrs) {
            if (scope.field.label == scope.scopePreferences.fulltemplate[attrs.selectDropdown2].label) {
              element[0].selected = true;
            }
          };
        }).directive('selectDropdownSession', function() {
        return function(scope, element, attrs) {
          scope.$watch('activeSession', function() {
            if (scope.session._id == scope.activeSession) {
              element[0].selected = true;
            }
          });
        };
      }).directive(
        'arrowKey',
        function($rootScope) {
          return function(scope, element, attrs) {
            element.bind('keyup', function(e) {
              scope.$apply(function() {
                // NOTE: scope.$index represents the the scope index of the record when an arrow key is pressed
                var lastRecord = ((($rootScope.currentPage + 1) * scope.resultSize) - (scope.resultSize - (scope.$index + 1)));
                if (e.keyCode === 40 && scope.$index == undefined) {
                  // Select first record if arrowing down from new record
                  scope.selectRow(0);
                } else if (e.keyCode === 40 && lastRecord >= scope.data.length) {
                  // Do not go past very last record
                  return;
                } else if (e.keyCode === 40) {
                  if (scope.$index + 2 > scope.scopePreferences.resultSize) {
                    // If the next record down is on another page, change to that page and select the first record
                    $rootScope.currentPage = $rootScope.currentPage + 1;
                    scope.selectRow(0);
                  } else {
                    scope.selectRow(scope.$index + 1);
                  }
                } else if (e.keyCode === 38 && $rootScope.currentPage == 0 && (scope.$index == 0 || scope.$index == undefined)) {
                  // Select new entry if coming from most recent record
                  scope.selectRow('newEntry');
                } else if (e.keyCode === 38 && scope.$index == 0) {
                  // Go back one page and select last record
                  $rootScope.currentPage = $rootScope.currentPage - 1;
                  scope.selectRow(scope.scopePreferences.resultSize - 1);
                } else if (e.keyCode === 38) {
                  scope.selectRow(scope.$index - 1);
                } else {
                  return;
                }
              });
            });
          };
        }).directive(
        'keypressMarkAsEdited',
        function($rootScope) {
          return function(scope, element, attrs) {
            element.bind('keyup', function(e) {
              if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 39 && e.keyCode != 37 && e.keyCode != 9) {
                console.log(e.keyCode);
                $rootScope.markAsEdited(scope.fieldData, scope.datum);
              } else {
                return;
              }
            });
          };
        }).directive(
        'keypressMarkAsNew',
        function($rootScope) {
          return function(scope, element, attrs) {
            element.bind('keyup', function(e) {
              if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 39 && e.keyCode != 37 && e.keyCode != 9) {
                $rootScope.newRecordHasBeenEdited = true;
              } else {
                return;
              }
            });
          };
        }).directive(
        'focus',
        function($timeout) {
          return function(scope, element) {
            scope.$watch('selected', function() {
              if (scope.selected == scope.$index || scope.selected == 'newEntry') {
                $timeout(function() {
                  element[0].focus();
                }, 0);
              }
            });
          };
        }).directive(
        'glossmorpheme',
        function() {
          return function(scope, element) {
            element.bind('keyup', function(e) {
              var newUtterance = this.value;
              var morphemeGuess = Glosser.morphemefinder(
                newUtterance, scope.DB.pouchname);
              var glossGuess = Glosser
                .glossFinder(morphemeGuess, scope.DB.pouchname);


              // Set scope data for existing records
              if (scope.fieldData) {
                for (key in scope.fields) {
                  if (scope.fields[key].label == "morphemes") {
                    scope.$apply(function() {
                      scope.fieldData[key] = morphemeGuess;
                    });
                  }

                  if (scope.fields[key].label == "gloss") {
                    scope.$apply(function() {
                      scope.fieldData[key] = glossGuess;
                    });
                  }
                }
              } else {
                // Set scope data for new record
                for (key in scope.fields) {
                  if (scope.fields[key].label == "morphemes") {
                    scope.$apply(function() {
                      scope.newFieldData[key] = morphemeGuess;
                    });
                  }

                  if (scope.fields[key].label == "gloss") {
                    scope.$apply(function() {
                      scope.newFieldData[key] = glossGuess;
                    });
                  }
                }
              }


            });
          }
        });

    return SpreadsheetStyleDataEntryDirectives;
  });