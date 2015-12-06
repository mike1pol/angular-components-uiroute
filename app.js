var app = angular.module('app', ['ui.router']);

function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app', {
        abstract: true,
        views: {
            'menu@': {
                template: '<menu></menu>'
            }
        }
    });

    $stateProvider.state('app.home', {
        url: '/',
        views: {
            'body@': {
                template: '<home></home>'
            }
        }
    });

    $stateProvider.state('app.page', {
        url: '/page',
        views: {
            'body@': {
                template: '<page></page>'
            }
        }
    });

    $urlRouterProvider.otherwise('/');
}

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

app.config(routeConfig);

app.run(['$rootScope', function ($rootScope) {
    $rootScope.$currentPage = '';

    $rootScope.$on('$stateChangeStart', function (event, toState) {
        $rootScope.$currentPage = toState.name;
    });
}]);

// Directives
// Menu directive
app.directive('menu', function () {
    return {
        replace: true,
        controller: 'MenuCtrl',
        controllerAs: 'menu',
        template: '<div><a ng-click="menu.$state.go(\'app.home\')" ng-class="{\'active\': menu.page == \'app.home\'}">Home</a> / <a ng-click="menu.$state.go(\'app.page\')" ng-class="{\'active\': menu.page == \'app.page\'}">Page</a></div>'
    };
});

// Home directive
app.directive('home', function () {
    return {
        replace: true,
        controller: 'HomeCtrl',
        controllerAs: 'home',
        template: '<div><p>{{home.msg}}</p></div>'
    };
});

// Page directive
app.directive('page', function () {
    return {
        replace: true,
        controller: 'HomeCtrl',
        controllerAs: 'page',
        template: '<div><p>{{page.msg}}</p> <p>Page!!!</p></div>'
    };
});

// Controllers
// Menu Controller
app.controller('MenuCtrl', ['$state', '$rootScope', function ($state, $rootScope) {
    var menu = this;
    menu.$state = $state;
    $rootScope.$watch('$currentPage', function (n, o) {
        if (n != o) {
            menu.page = $rootScope.$currentPage;
        }
    });
    menu.page = $rootScope.$currentPage;
}]);
// Home Controller
app.controller('HomeCtrl', ['$state', function ($state) {
    var home = this;
    home.msg = 'Hello!';
}]);
