/*jslint browser: true*/
/*jslint plusplus: true */
/*global angular */

angular.module('ideabox.controllers', [])
    .controller('IdeasController', ['IdeaFactory', '$scope', '$ionicModal',
        function (IdeaFactory, $scope, $ionicModal) {
            "use strict";
            // Load the add / change dialog from the given template URL
            $ionicModal.fromTemplateUrl('add-change-dialog.html',
                function (modal) {
                    $scope.addDialog = modal;
                }, {
                    scope: $scope,
                    animation: 'slide-in-up'
                });

            $scope.showAddChangeDialog = function (action) {
                $scope.action = action;
                $scope.addDialog.show();
            };

            $scope.leaveAddChangeDialog = function () {
                $scope.addDialog.remove();
                // Reload modal template to have cleared form
                $ionicModal.fromTemplateUrl('add-change-dialog.html',
                    function (modal) {
                        $scope.addDialog = modal;
                    }, {
                        scope: $scope,
                        animation: 'slide-in-up'
                    });
            };

            $scope.leftButtons = [
                {
                    type: "button-clear",
                    content: '<i class="icon ion-plus-round"></i>',
                    tap: function () {
                        $scope.showAddChangeDialog('add');
                    }
                }
            ];

            $scope.itemButtons = [
                {
                    text: '',
                    type: 'button-clear icon ion-edit',
                    onTap: function (item) {
                        $scope.showEditItem(item);
                    }
                },
                {
                    text: '',
                    type: 'button-clear icon ion-trash-a',
                    onTap: function (item) {
                        $scope.removeItem(item);
                    }
                }
            ];

            $scope.list = IdeaFactory.getIdeas() || [];

            // Used to cache the empty form for Edit Dialog
            $scope.saveEmpty = function (form) {
                $scope.form = angular.copy(form);
            };

            function removeDefault() {
                //Remove existing default
                var i;
                for (i = 0; i < $scope.list.length; i++) {
                    if ($scope.list[i].useAsDefault) {
                        $scope.list[i].useAsDefault = false;
                    }
                }
            }
            $scope.addItem = function (form) {
                // Add values from form to object
                var newIdea = {
                    description:  form.description.$modelValue,
                    useAsDefault: form.useAsDefault.$modelValue
                };
                // If this is the first item it will be the default item
                if ($scope.list && $scope.list.length === 0) {
                    newIdea.useAsDefault = true;
                } else {
                    // Remove old default entry from list
                    if (newIdea.useAsDefault) {
                        removeDefault();
                    }
                }
                // Save new list in scope and factory
                $scope.list.push(newIdea);
                IdeaFactory.setIdeas($scope.list);
                // Close dialog
                $scope.leaveAddChangeDialog();
            };

            $scope.removeItem = function (item) {
                // Search & Destroy item from list
                $scope.list.splice($scope.list.indexOf(item), 1);
                // If idea was the Default we set first idea in list to default
                if (item.useAsDefault === true && $scope.list.length !== 0) {
                    $scope.list[0].useAsDefault = true;
                }
                IdeaFactory.setIdeas($scope.list);
            };

            $scope.makeDefault = function (item) {
                removeDefault();
                var newDefaultIndex = $scope.list.indexOf(item);
                $scope.list[newDefaultIndex].useAsDefault = true;
                IdeaFactory.setIdeas($scope.list);
            };

            $scope.showEditItem = function (item) {

                // Remember edit item to change it later
                $scope.tmpEditItem = item;

                // Preset form values
                $scope.form.description.$setViewValue(item.description);
                $scope.form.useAsDefault.$setViewValue(item.useAsDefault);
                // Open dialog
                $scope.showAddChangeDialog('change');
            };

            $scope.editItem = function (form) {
                var item, editIndex;

                item = {
                    description:  form.description.$modelValue,
                    useAsDefault: form.useAsDefault.$modelValue
                };

                editIndex = IdeaFactory.getIdeas().indexOf($scope.tmpEditItem);

                $scope.list[editIndex] = item;

                if ($scope.list.length === 1) {
                    $scope.list[0].useAsDefault = true;
                }

                if (item.useAsDefault) {
                    $scope.makeDefault(item);
                }

                IdeaFactory.setIdeas($scope.list);
                $scope.leaveAddChangeDialog();
            };
        }
        ]);
