import AppConfig from './../config/AppConfig';

export default class UserController {
    constructor($scope, $http) {
        this.scope = $scope;
        this.http = $http;
    }

    getUsers() {
        let $scope = this.scope;

        this.http.get('http://'+AppConfig.apiAddr()+':3000/user').success(function (data) {
            $scope.users = data.data;
        });
    }

    adminUsers() {
        let $scope = this.scope;
        let $http = this.http;
        $scope.suppUser = function(id){
            if(confirm("Supprimez l'utilisateur ?")){
                $http.delete('http://'+AppConfig.apiAddr()+':3000/user/'+id).success(function(data) {
                    $http.get('http://'+AppConfig.apiAddr()+':3000/user').success(function(data) {
                        $scope.users = data.data;
                    });
                });
            }
        }
        $scope.modifUser = function(id_user, username, email, role){
            if (username && role) {
                var user = {
                    username: username,
                    email: email,
                    role: role
                };
                $http.put('http://'+AppConfig.apiAddr()+':3000/user/' + id_user, user).success(function (data) {
                    $http.get('http://'+AppConfig.apiAddr()+':3000/user').success(function (data) {
                        $scope.users = data.data;
                    });
                });
            }
        }
    }
}
