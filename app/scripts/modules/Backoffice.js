import HeaderController from './../controller/HeaderController';
import ArticlesController from './../controller/ArticlesController';
import PaginationController from './../controller/PaginationController';
import UserController from './../controller/UserController';

export default class Backoffice {

    constructor() {
        this.app = angular.module("backoffice",[]);
        this.createControllers();
    }

    createControllers() {
        this.app.controller("HeaderController", function($scope, $http){
            let headerController = new HeaderController($scope, $http);
            headerController.addDeconnexionListener();
        });
        this.app.controller("PaginationController", function($rootScope){
            let paginationController = new PaginationController($rootScope);
            paginationController.addPaginationListener();
        });
        this.app.controller("ArticlesController", function($rootScope, $http){
            let articlesController = new ArticlesController($rootScope, $http);
            articlesController.getArticles();
            articlesController.adminArticleListener();
        });
        this.app.controller("UserController", function($scope, $http){
            let userController = new UserController($scope, $http);
            userController.getUsers();
            userController.adminUsers();
        });
    }
}
