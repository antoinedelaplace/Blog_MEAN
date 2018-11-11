import AppConfig from './../config/AppConfig';

export default class HeaderController {

    constructor($scope, $http) {
        this.scope = $scope;
        this.http = $http;
    }

    addConnexionListener() {
        let $scope = this.scope;
        let $http = this.http;
        $scope.connexion = function () {
            if ($scope.mail && $scope.password) {
                var ids = {
                    email: $scope.mail,
                    password: $scope.password
                };
                $http.post('http://' + AppConfig.apiAddr() + ':3000/login', ids).success(function (data) {
                    console.log(data);
                });
            }
        }
        $scope.inscription = function () {
            if ($scope.new_mail && $scope.new_password && $scope.username) {
                var ids = {
                    username: $scope.username,
                    email: $scope.new_mail,
                    password: $scope.new_password,
                    role: 'normal'
                };
                $http.post('http://' + AppConfig.apiAddr() + ':3000/user', ids).success(function (data) {
                    console.log(data);
                });
            }
        }
        $scope.isAdmin = function () {
            return "";
        }
        $scope.isAuthenticate = function () {
            return "hidden";
        }
    }

    addDeconnexionListener() {
        let $scope = this.scope;
        let $http = this.http;
        $scope.deconnexion = function () {
            $http.get('http://' + AppConfig.apiAddr() + ':3000/logout').success(function (data) {
                console.log(data);
            });
        }
        $scope.estconnecte = function () {
            $http.get('http://' + AppConfig.apiAddr() + ':3000/isconnected').success(function (data) {
                console.log(data);
            });
        }

    }
}


