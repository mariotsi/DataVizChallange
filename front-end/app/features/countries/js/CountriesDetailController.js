'use strict';

angular.module('controllers')
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
                getAndDisplayData(n === 0 ? 'Tyre': 'Car', n);
            }
        });
    }]);