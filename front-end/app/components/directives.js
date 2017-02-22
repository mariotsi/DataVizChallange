'use strict';

angular.module('directives', [])
    .directive('spinner', function ($mdPanel, $rootScope, $timeout) {
        return {
            restrict: 'E',
            //templateUrl: 'components/templates/spinner.html',
            controller: function () {
                var position = $mdPanel.newPanelPosition()
                    .absolute()
                    .center();

                var config = {
                    attachTo: angular.element(document.body),

                    disableParentScroll: true,
                    templateUrl: 'components/templates/spinner.html',
                    hasBackdrop: true,
                    panelClass: 'demo-dialog-example',
                    position: position,
                    trapFocus: true,
                    zIndex: 150,
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    focusOnOpen: true
                };

                var spinner = $mdPanel.create(config);

                var showSpinner = function () {
                    spinner.open(config);
                };

                var hideSpinner = function () {
                    spinner.close();
                };

                $rootScope.$on('spinner:show', showSpinner);
                $rootScope.$on('spinner:hide', hideSpinner);

            }
        };
    });
