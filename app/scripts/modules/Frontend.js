import HeaderController from './../controller/HeaderController';
import ArticlesController from './../controller/ArticlesController';
import PaginationController from './../controller/PaginationController';

export default class Frontend {

    constructor() {
        this.app = angular.module("frontend",[]);
        this.createControllers();
    }

    createControllers() {
        this.app.controller("HeaderController", function($scope, $http){
            let headerController = new HeaderController($scope, $http);
            headerController.addConnexionListener();
            headerController.addDeconnexionListener();
        });
        this.app.controller("PaginationController", function($rootScope){
            let paginationController = new PaginationController($rootScope);
            paginationController.addPaginationListener();
        });
        this.app.controller("ArticlesController", function($rootScope, $http){
            let articlesController = new ArticlesController($rootScope, $http);
            articlesController.getArticles();
            articlesController.addCommentListener();
        });
    }
}