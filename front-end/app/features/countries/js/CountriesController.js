'use strict';

angular.module('controllers')
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
    }]);
