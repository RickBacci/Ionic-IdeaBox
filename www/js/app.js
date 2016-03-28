/*jslint browser: true*/
/*global angular */

angular.module('ideabox', ['ionic', 'ideabox.services', 'ideabox.controllers'])
    .config(function ($stateProvider, $urlRouterProvider) {
        "use strict";
        $stateProvider

            .state('Ideas', {
                url: '/ideas',
                templateUrl: 'idea-template.html',
                controller: 'IdeasController'
            });

            // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/ideas');
    });
