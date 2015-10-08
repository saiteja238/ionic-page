var a = angular.module('index', ['ionic', 'ui.router']);
a.controller('LoginCtrl', ['$scope', '$state', 'LoginService', '$ionicPopup', '$ionicLoading', function ($scope, $state, LoginService, $ionicPopup, $ionicLoading) {

    $scope.data = {};

    $scope.login = function () {

        LoginService.loginUser($scope.data.id, $scope.data.password).success(function (data) {

            $state.go('one');
        }).error(function (data) {

            var alertPopup = $ionicPopup.alert({
                title: 'ERROR!',
                template: 'Authentication Failed'
            });


        })



    }


}]);

a.service('LoginService', function ($q) {
    return {
        loginUser: function (name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == '111' && pw == '111') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function (fn) {
                console.log(promise);
                promise.then(fn);
                return promise;
            }
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }

    }



});



a.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('index', {
            url: '/',
            templateUrl: './applications/login.html'

        })
        .state('one', {
            url: 'one',
            templateUrl: './applications/one.html'

        })


}])