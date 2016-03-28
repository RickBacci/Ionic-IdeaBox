/*global angular, localStorage */

angular.module('ideabox.services', [])
    .factory('IdeaFactory', function () {
        "use strict";

        var idea, ideaStore, ideaSrv;

        ideaStore = localStorage.getItem("idea");

        if (ideaStore) {
            idea = angular.fromJson(ideaStore);
        }

        ideaSrv = {
            setIdeas: function (newIdea) {
                localStorage.setItem("idea", angular.toJson(newIdea));
                return true;
            },
            getIdeas: function () {
                return idea !== null ? idea : [];
            }
        };
        return ideaSrv;
    });
