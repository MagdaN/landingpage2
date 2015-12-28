var app = angular.module('app', [
    'pascalprecht.translate',
    'ui.router',
    'ngAnimate'
]);

app.config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
                prefix: '/assets/js/angular/translations/core_',
                suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
    });

app.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            url: '/{lang:(?:de|en)}',
            template: '<ui-view/>'
    });
    $stateProvider.state('app.root', {
        url: ''
    });
    $stateProvider.state('app.home', {
        url: '/home'
    });
    $stateProvider.state('app.imprint', {
        url: '/imprint'
    });
    }
]);

app.controller('appCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    '$translate',
    '$location',
    function($scope, $rootScope, $stateParams, $translate, $location){

        $scope.showForm = false;

        var language = $location.path().split('/')[1];
        if(language){
            $translate.use(language);
        }

        $scope.$on('$stateChangeSuccess', function rootStateChangeSuccess(event, toState){
            if($stateParams.lang !== undefined){
                var otherLang = $stateParams.lang === 'de' ? 'en' : 'de';
                $rootScope.activeLang = $stateParams.lang;
                $rootScope.otherLangURL = $location.absUrl().replace('/' + $stateParams.lang, '/' +otherLang);
                $translate.use($stateParams.lang);
            }
        });

        $scope.toggleForm = function(){
            $scope.showForm = !$scope.showForm;
        };
    }

]);

