angular.module('filters', []).filter('number', function() {
    return function(input, decimals) {
        decimals = angular.isDefined(decimals) ? parseInt(decimals) : 2;

        var tokens = input.toString().split('.');
        if(tokens.length > 1 && decimals > 0){
            return tokens[0] + ',' + tokens[1].slice(0,decimals);
        }else{
            return tokens[0];
        }
    };
});