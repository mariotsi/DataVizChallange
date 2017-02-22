angular.module('interceptors', []).factory('spinnerInterceptor', ['$rootScope', function ($rootScope) {
    return {
        request: function (config) {
            if (config.url.indexOf('/api/') > -1) {
                console.log('Chiamata alle API');
                $rootScope.$broadcast('spinner:show');
            }
            return config;
        },
        response: function (response) {
            if (response.config.url.indexOf('/api/') > -1) {
                console.log('Risposta dalle API');
                $rootScope.$broadcast('spinner:hide');
            }
            return response;
        },
        responseError: function (response) {
            if (response.config.url.indexOf('/api/') > -1) {
                console.log('Errore dalle API');
                $rootScope.$broadcast('spinner:hide');
            }
            return response;
        }
    };
}]);