import AppConfig from './../config/AppConfig';

export default class ArticlesController {
    constructor($scope, $http) {
        this.scope = $scope;
        this.http = $http;
    }

    getArticles() {
        let $scope = this.scope;
        $scope.range = [];

        this.http.get('http://'+AppConfig.apiAddr()+':3000/article').success(function (data) {
            $scope.articles = data.data;
            $scope.totalPages = Math.trunc($scope.articles.length / $scope.itemPerPage);
            if($scope.articles.length % $scope.itemPerPage > 0)
                $scope.totalPages++;
            for (var i = 1; i <= $scope.totalPages; i++) {
                $scope.range.push(i);
            }
        });
    }

    adminArticleListener() {
        let $scope = this.scope;
        let $http = this.http;
        $scope.suppArticle = function(id){
            if(confirm("Supprimez l'article ?")){
                $http.delete('http://'+AppConfig.apiAddr()+':3000/article/'+id).success(function(data) {
                    $http.get('http://'+AppConfig.apiAddr()+':3000/article').success(function(data) {
                        $scope.articles = data.data;
                        $scope.totalPages = Math.trunc($scope.articles.length / $scope.itemPerPage);
                        if($scope.articles.length % $scope.itemPerPage > 0)
                            $scope.totalPages++;
                        $scope.range = [];
                        for (var i = 1; i <= $scope.totalPages; i++) {
                            $scope.range.push(i);
                        }
                        if($scope.currentPage > $scope.totalPages) {
                            $scope.currentPage--;
                        }
                    });
                });
            }
        }
        $scope.modifArticle = function(id_article, titre_article, text_article){
            if (titre_article && text_article) {
                var article = {
                    titre: titre_article,
                    contenu: text_article
                };
                $http.put('http://'+AppConfig.apiAddr()+':3000/article/' + id_article, article).success(function (data) {
                    $http.get('http://'+AppConfig.apiAddr()+':3000/article').success(function (data) {
                        $scope.articles = data.data;
                    });
                });
            }
        }
        $scope.modifComment = function(id_article, id_comment, text_comment){
            if (text_comment) {
                var comment = {
                    contenu: text_comment,
                };
                $http.put('http://'+AppConfig.apiAddr()+':3000/article/' + id_article+'/commentaire/'+id_comment, comment).success(function (data) {
                    $http.get('http://'+AppConfig.apiAddr()+':3000/article').success(function (data) {
                        $scope.articles = data.data;
                    });
                });
            }
        }
        $scope.suppComment = function(id_article, id_comment){
            if(confirm("Supprimez le commentaire ?")){
                $http.delete('http://'+AppConfig.apiAddr()+':3000/article/'+id_article+'/commentaire/'+id_comment).success(function(data) {
                    $http.get('http://'+AppConfig.apiAddr()+':3000/article').success(function(data) {
                        $scope.articles = data.data;
                    });
                });
            }
        }
        $scope.addArticle = function(Titre_article, Contenu_article){
            if(Titre_article && Contenu_article){
                var article = {
                    titre: Titre_article,
                    contenu: Contenu_article,
                    //TODO : matching avec le user connecté
                    auteur: "test"
                };
                $http.post('http://'+AppConfig.apiAddr()+':3000/article', article).success(function (data) {
                    $http.get('http://'+AppConfig.apiAddr()+':3000/article').success(function (data) {
                        $scope.articles = data.data;
                        $scope.totalPages = Math.trunc($scope.articles.length / $scope.itemPerPage);
                        if($scope.articles.length % $scope.itemPerPage > 0)
                            $scope.totalPages++;
                        $scope.range = [];
                        for (var i = 1; i <= $scope.totalPages; i++) {
                            $scope.range.push(i);
                        }
                        if($scope.currentPage > $scope.totalPages) {
                            $scope.currentPage--;
                        }
                    });
                });
            }
        }
    }

    addCommentListener() {
        let $scope = this.scope;
        let $http = this.http;
        $scope.commentaires = [];
        $scope.classe = [];
        $scope.CheckRemplissage = function (id) {
            if ($scope.commentaires[id]) {
                $scope.classe[id] = 'has-success';
            } else {
                $scope.classe[id] = 'has-error';
            }
        };
        $scope.addComment = function (id) {
            if ($scope.commentaires[id]) {
                var comment = {
                    contenu: $scope.commentaires[id],
                    //TODO : matching avec le user connecté
                    auteur: "test"
                };
                $http.post('http://'+AppConfig.apiAddr()+':3000/article/' + id, comment).success(function (data) {
                    $http.get('http://'+AppConfig.apiAddr()+':3000/article').success(function (data) {
                        $scope.articles = data.data;
                        $scope.commentaires[id] = "";
                    });
                });
            }
            else
                $scope.classe[id] = 'has-error';
        }
    }
}
