'use strict';

angular.module('controllers', [])
    .controller('MainController', ['$scope', '$state', function ($scope, $state) {
        $scope.currentNavItem = 'home';
        $state.go('home.default');
    }]);/*
    .controller('CountriesController', ['$scope', '$http', function ($scope, $http) {
        $http.get('http://localhost:8000/api/countries/getOverview?forHighcharts=true').then(function (response) {
            if (response.status === 200) {
                $('#CountriesGraph').highcharts({
                    title: {
                        text: 'Tyre replacement potential'
                    },
                    subtitle: {
                        text: 'per year'
                    },
                    xAxis: {
                        minPadding: 0.05,
                        maxPadding: 0.05
                    },
                    credits: {
                        enabled: false
                    },
                    yAxis: {
                        title: {
                            text: 'Tyres'
                        }
                    },
                    series: response.data.chart
                });

                $scope.tableData = response.data.table;
            }
        })
    }])
    .controller('CountriesDetailController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams) {
        console.info($stateParams);
        $scope.countrySelected = $stateParams.countrySelected;
        $scope.data = {};
        $scope.tableData = [];
        var getAndDisplayData = function (type, tabIndex) {
            return $http.get('http://localhost:8000/api/countries/' + $scope.countrySelected + '/getOverview?type=' + type).then(function (response) {
                if (response.status === 200) {
                    $('#' + type + 'Graph').highcharts({
                        title: {
                            text: $scope.countrySelected + ' tyre replacement potential by ' + type
                        },
                        subtitle: {
                            text: 'per year'
                        },
                        xAxis: {
                            minPadding: 0.05,
                            maxPadding: 0.05
                        },
                        credits: {
                            enabled: false
                        },
                        yAxis: {
                            title: {
                                text: 'Tyres'
                            }
                        },
                        series: response.data.chart
                    });

                    $scope.tableData[tabIndex] = response.data.table;
                }
            });
        };

        $scope.$watch('data.selectedIndex', function (n, o) {
            if (angular.isDefined(n) && n !== o) {
                switch (n) {
                    case 0:
                        getAndDisplayData('Tyre', 0);
                        break;
                    case 1:
                        getAndDisplayData('Car', 1);
                        break;
                }
            }
        });


    }]);*/