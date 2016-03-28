/*global angular, localStorage */

angular.module('ideabox.services', [])
    .factory('IdeaFactory', function () {
        "use strict";

        var idea = [],
            ideaStore,
            ideaSrv;

        ideaStore = localStorage.getItem("idea");

        if (ideaStore !== null && ideaStore !== '' &&
                angular.isArray(angular.fromJson(ideaStore))) {
            idea = angular.fromJson(ideaStore);
        }
        ideaSrv = {
            setIdeas: function (newIdea) {
                idea = newIdea;
                localStorage.setItem("idea", angular.toJson(idea));
                return true;
            },
            getIdeas: function () {
                if (idea !== null) {
                    return idea;
                }
                return [];
            }
        };
        return ideaSrv;
    });
