/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Frontend = __webpack_require__(1);
	
	var _Frontend2 = _interopRequireDefault(_Frontend);
	
	var _Backoffice = __webpack_require__(6);
	
	var _Backoffice2 = _interopRequireDefault(_Backoffice);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var frontend = new _Frontend2.default();
	var backoffice = new _Backoffice2.default();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _HeaderController = __webpack_require__(2);
	
	var _HeaderController2 = _interopRequireDefault(_HeaderController);
	
	var _ArticlesController = __webpack_require__(4);
	
	var _ArticlesController2 = _interopRequireDefault(_ArticlesController);
	
	var _PaginationController = __webpack_require__(5);
	
	var _PaginationController2 = _interopRequireDefault(_PaginationController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Frontend = function () {
	    function Frontend() {
	        _classCallCheck(this, Frontend);
	
	        this.app = angular.module("frontend", []);
	        this.createControllers();
	    }
	
	    _createClass(Frontend, [{
	        key: 'createControllers',
	        value: function createControllers() {
	            this.app.controller("HeaderController", function ($scope, $http) {
	                var headerController = new _HeaderController2.default($scope, $http);
	                headerController.addConnexionListener();
	                headerController.addDeconnexionListener();
	            });
	            this.app.controller("PaginationController", function ($rootScope) {
	                var paginationController = new _PaginationController2.default($rootScope);
	                paginationController.addPaginationListener();
	            });
	            this.app.controller("ArticlesController", function ($rootScope, $http) {
	                var articlesController = new _ArticlesController2.default($rootScope, $http);
	                articlesController.getArticles();
	                articlesController.addCommentListener();
	            });
	        }
	    }]);
	
	    return Frontend;
	}();
	
	exports.default = Frontend;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _AppConfig = __webpack_require__(3);
	
	var _AppConfig2 = _interopRequireDefault(_AppConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HeaderController = function () {
	    function HeaderController($scope, $http) {
	        _classCallCheck(this, HeaderController);
	
	        this.scope = $scope;
	        this.http = $http;
	    }
	
	    _createClass(HeaderController, [{
	        key: 'addConnexionListener',
	        value: function addConnexionListener() {
	            var $scope = this.scope;
	            var $http = this.http;
	            $scope.connexion = function () {
	                if ($scope.mail && $scope.password) {
	                    var ids = {
	                        email: $scope.mail,
	                        password: $scope.password
	                    };
	                    $http.post('http://' + _AppConfig2.default.apiAddr() + ':3000/login', ids).success(function (data) {
	                        console.log(data);
	                    });
	                }
	            };
	            $scope.inscription = function () {
	                if ($scope.new_mail && $scope.new_password && $scope.username) {
	                    var ids = {
	                        username: $scope.username,
	                        email: $scope.new_mail,
	                        password: $scope.new_password,
	                        role: 'normal'
	                    };
	                    $http.post('http://' + _AppConfig2.default.apiAddr() + ':3000/user', ids).success(function (data) {
	                        console.log(data);
	                    });
	                }
	            };
	            $scope.isAdmin = function () {
	                return "";
	            };
	            $scope.isAuthenticate = function () {
	                return "hidden";
	            };
	        }
	    }, {
	        key: 'addDeconnexionListener',
	        value: function addDeconnexionListener() {
	            var $scope = this.scope;
	            var $http = this.http;
	            $scope.deconnexion = function () {
	                $http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/logout').success(function (data) {
	                    console.log(data);
	                });
	            };
	            $scope.estconnecte = function () {
	                $http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/isconnected').success(function (data) {
	                    console.log(data);
	                });
	            };
	        }
	    }]);
	
	    return HeaderController;
	}();
	
	exports.default = HeaderController;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AppConfig = function () {
	    function AppConfig() {
	        _classCallCheck(this, AppConfig);
	    }
	
	    _createClass(AppConfig, null, [{
	        key: "apiAddr",
	        value: function apiAddr() {
	            return "127.0.0.1";
	        }
	    }]);
	
	    return AppConfig;
	}();
	
	exports.default = AppConfig;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _AppConfig = __webpack_require__(3);
	
	var _AppConfig2 = _interopRequireDefault(_AppConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ArticlesController = function () {
	    function ArticlesController($scope, $http) {
	        _classCallCheck(this, ArticlesController);
	
	        this.scope = $scope;
	        this.http = $http;
	    }
	
	    _createClass(ArticlesController, [{
	        key: 'getArticles',
	        value: function getArticles() {
	            var $scope = this.scope;
	            $scope.range = [];
	
	            this.http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/article').success(function (data) {
	                $scope.articles = data.data;
	                $scope.totalPages = Math.trunc($scope.articles.length / $scope.itemPerPage);
	                if ($scope.articles.length % $scope.itemPerPage > 0) $scope.totalPages++;
	                for (var i = 1; i <= $scope.totalPages; i++) {
	                    $scope.range.push(i);
	                }
	            });
	        }
	    }, {
	        key: 'adminArticleListener',
	        value: function adminArticleListener() {
	            var $scope = this.scope;
	            var $http = this.http;
	            $scope.suppArticle = function (id) {
	                if (confirm("Supprimez l'article ?")) {
	                    $http.delete('http://' + _AppConfig2.default.apiAddr() + ':3000/article/' + id).success(function (data) {
	                        $http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/article').success(function (data) {
	                            $scope.articles = data.data;
	                            $scope.totalPages = Math.trunc($scope.articles.length / $scope.itemPerPage);
	                            if ($scope.articles.length % $scope.itemPerPage > 0) $scope.totalPages++;
	                            $scope.range = [];
	                            for (var i = 1; i <= $scope.totalPages; i++) {
	                                $scope.range.push(i);
	                            }
	                            if ($scope.currentPage > $scope.totalPages) {
	                                $scope.currentPage--;
	                            }
	                        });
	                    });
	                }
	            };
	            $scope.modifArticle = function (id_article, titre_article, text_article) {
	                if (titre_article && text_article) {
	                    var article = {
	                        titre: titre_article,
	                        contenu: text_article
	                    };
	                    $http.put('http://' + _AppConfig2.default.apiAddr() + ':3000/article/' + id_article, article).success(function (data) {
	                        $http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/article').success(function (data) {
	                            $scope.articles = data.data;
	                        });
	                    });
	                }
	            };
	            $scope.modifComment = function (id_article, id_comment, text_comment) {
	                if (text_comment) {
	                    var comment = {
	                        contenu: text_comment
	                    };
	                    $http.put('http://' + _AppConfig2.default.apiAddr() + ':3000/article/' + id_article + '/commentaire/' + id_comment, comment).success(function (data) {
	                        $http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/article').success(function (data) {
	                            $scope.articles = data.data;
	                        });
	                    });
	                }
	            };
	            $scope.suppComment = function (id_article, id_comment) {
	                if (confirm("Supprimez le commentaire ?")) {
	                    $http.delete('http://' + _AppConfig2.default.apiAddr() + ':3000/article/' + id_article + '/commentaire/' + id_comment).success(function (data) {
	                        $http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/article').success(function (data) {
	                            $scope.articles = data.data;
	                        });
	                    });
	                }
	            };
	            $scope.addArticle = function (Titre_article, Contenu_article) {
	                if (Titre_article && Contenu_article) {
	                    var article = {
	                        titre: Titre_article,
	                        contenu: Contenu_article,
	                        //TODO : matching avec le user connecté
	                        auteur: "test"
	                    };
	                    $http.post('http://' + _AppConfig2.default.apiAddr() + ':3000/article', article).success(function (data) {
	                        $http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/article').success(function (data) {
	                            $scope.articles = data.data;
	                            $scope.totalPages = Math.trunc($scope.articles.length / $scope.itemPerPage);
	                            if ($scope.articles.length % $scope.itemPerPage > 0) $scope.totalPages++;
	                            $scope.range = [];
	                            for (var i = 1; i <= $scope.totalPages; i++) {
	                                $scope.range.push(i);
	                            }
	                            if ($scope.currentPage > $scope.totalPages) {
	                                $scope.currentPage--;
	                            }
	                        });
	                    });
	                }
	            };
	        }
	    }, {
	        key: 'addCommentListener',
	        value: function addCommentListener() {
	            var $scope = this.scope;
	            var $http = this.http;
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
	                    $http.post('http://' + _AppConfig2.default.apiAddr() + ':3000/article/' + id, comment).success(function (data) {
	                        $http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/article').success(function (data) {
	                            $scope.articles = data.data;
	                            $scope.commentaires[id] = "";
	                        });
	                    });
	                } else $scope.classe[id] = 'has-error';
	            };
	        }
	    }]);
	
	    return ArticlesController;
	}();
	
	exports.default = ArticlesController;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PaginationController = function () {
	    function PaginationController($scope) {
	        _classCallCheck(this, PaginationController);
	
	        this.scope = $scope;
	    }
	
	    _createClass(PaginationController, [{
	        key: 'addPaginationListener',
	        value: function addPaginationListener() {
	            var $scope = this.scope;
	            this.scope.currentPage = 1;
	            this.scope.itemPerPage = 5;
	            this.scope.totalPages = 1;
	
	            $scope.nextPage = function () {
	                if ($scope.currentPage != $scope.totalPages) $scope.currentPage++;
	            };
	            $scope.previousPage = function () {
	                if ($scope.currentPage != 1) $scope.currentPage--;
	            };
	            $scope.goToPage = function (numPage) {
	                if ($scope.currentPage != numPage) $scope.currentPage = numPage;
	            };
	            $scope.isActivePage = function (numPage) {
	                if ($scope.currentPage == numPage) return 'active';
	            };
	            $scope.isArticleInPage = function (indexArticle) {
	                if (indexArticle >= $scope.itemPerPage * ($scope.currentPage - 1) && indexArticle < $scope.itemPerPage * $scope.currentPage) return 1;else return 0;
	            };
	        }
	    }]);
	
	    return PaginationController;
	}();
	
	exports.default = PaginationController;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _HeaderController = __webpack_require__(2);
	
	var _HeaderController2 = _interopRequireDefault(_HeaderController);
	
	var _ArticlesController = __webpack_require__(4);
	
	var _ArticlesController2 = _interopRequireDefault(_ArticlesController);
	
	var _PaginationController = __webpack_require__(5);
	
	var _PaginationController2 = _interopRequireDefault(_PaginationController);
	
	var _UserController = __webpack_require__(7);
	
	var _UserController2 = _interopRequireDefault(_UserController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Backoffice = function () {
	    function Backoffice() {
	        _classCallCheck(this, Backoffice);
	
	        this.app = angular.module("backoffice", []);
	        this.createControllers();
	    }
	
	    _createClass(Backoffice, [{
	        key: 'createControllers',
	        value: function createControllers() {
	            this.app.controller("HeaderController", function ($scope, $http) {
	                var headerController = new _HeaderController2.default($scope, $http);
	                headerController.addDeconnexionListener();
	            });
	            this.app.controller("PaginationController", function ($rootScope) {
	                var paginationController = new _PaginationController2.default($rootScope);
	                paginationController.addPaginationListener();
	            });
	            this.app.controller("ArticlesController", function ($rootScope, $http) {
	                var articlesController = new _ArticlesController2.default($rootScope, $http);
	                articlesController.getArticles();
	                articlesController.adminArticleListener();
	            });
	            this.app.controller("UserController", function ($scope, $http) {
	                var userController = new _UserController2.default($scope, $http);
	                userController.getUsers();
	                userController.adminUsers();
	            });
	        }
	    }]);
	
	    return Backoffice;
	}();
	
	exports.default = Backoffice;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _AppConfig = __webpack_require__(3);
	
	var _AppConfig2 = _interopRequireDefault(_AppConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UserController = function () {
	    function UserController($scope, $http) {
	        _classCallCheck(this, UserController);
	
	        this.scope = $scope;
	        this.http = $http;
	    }
	
	    _createClass(UserController, [{
	        key: 'getUsers',
	        value: function getUsers() {
	            var $scope = this.scope;
	
	            this.http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/user').success(function (data) {
	                $scope.users = data.data;
	            });
	        }
	    }, {
	        key: 'adminUsers',
	        value: function adminUsers() {
	            var $scope = this.scope;
	            var $http = this.http;
	            $scope.suppUser = function (id) {
	                if (confirm("Supprimez l'utilisateur ?")) {
	                    $http.delete('http://' + _AppConfig2.default.apiAddr() + ':3000/user/' + id).success(function (data) {
	                        $http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/user').success(function (data) {
	                            $scope.users = data.data;
	                        });
	                    });
	                }
	            };
	            $scope.modifUser = function (id_user, username, email, role) {
	                if (username && role) {
	                    var user = {
	                        username: username,
	                        email: email,
	                        role: role
	                    };
	                    $http.put('http://' + _AppConfig2.default.apiAddr() + ':3000/user/' + id_user, user).success(function (data) {
	                        $http.get('http://' + _AppConfig2.default.apiAddr() + ':3000/user').success(function (data) {
	                            $scope.users = data.data;
	                        });
	                    });
	                }
	            };
	        }
	    }]);
	
	    return UserController;
	}();
	
	exports.default = UserController;

/***/ }
/******/ ]);
//# sourceMappingURL=main.bundle.js.map