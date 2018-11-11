export default class PaginationController {
    constructor($scope) {
        this.scope = $scope;
    }

    addPaginationListener() {
        let $scope = this.scope;
        this.scope.currentPage = 1;
        this.scope.itemPerPage = 5;
        this.scope.totalPages = 1;

        $scope.nextPage = function () {
            if ($scope.currentPage != $scope.totalPages)
                $scope.currentPage++;
        };
        $scope.previousPage = function () {
            if ($scope.currentPage != 1)
                $scope.currentPage--;
        };
        $scope.goToPage = function (numPage) {
            if ($scope.currentPage != numPage)
                $scope.currentPage = numPage;
        };
        $scope.isActivePage = function (numPage) {
            if ($scope.currentPage == numPage)
                return 'active';
        };
        $scope.isArticleInPage = function (indexArticle) {
            if (indexArticle >= ($scope.itemPerPage * ($scope.currentPage - 1)) && indexArticle < ($scope.itemPerPage * $scope.currentPage))
                return 1;
            else
                return 0;
        };
    }
}
