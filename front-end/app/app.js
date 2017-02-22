'use strict';

angular.module('FEChallange', [
    'ui.router',
    'ngMaterial',
    'controllers',
    'directives',
    'filters',
    'interceptors'
]).config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('spinnerInterceptor');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home/home.html',
            controller: 'MainController'
        })
        .state('home.default', {
                url: 'home',
                views: {
                    'main@home': {
                        templateUrl: 'features/home/index.html',
                        controller: function ($scope) {

                        }
                    }
                }
            }
        )
        .state('home.countries', {
            url: 'countries',
            views: {
                'main@home': {
                    templateUrl: 'features/countries/index.html',
                    controller: 'CountriesController'
                }
            }
        })
        .state('home.cars', {
            url: 'cars',
            views: {
                'main@home': {
                    templateUrl: 'features/fake/cars.html'
                }
            }
        })
        .state('home.tyres', {
            url: 'tyre',
            views: {
                'main@home': {
                    templateUrl: 'features/fake/tyres.html'
                }
            }
        })
        .state('home.countries.detail', {
            url: 'countries/detail/',
            params: {
                countrySelected: null
            },
            views: {
                'main@home': {
                    templateUrl: 'features/countries/detail.html',
                    controller: 'CountriesDetailController'
                }
            }
        })
}]);