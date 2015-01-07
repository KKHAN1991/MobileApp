var App = angular.module("App", ["ionic"]);

App.service("kkhanme", ["$http", "$log", kkhanme]);

App.controller("AppCtrl", ["$scope", "kkhanme", "$log", AppCtrl]);


function AppCtrl($scope, kkhanme, $log)  {
    $scope.posts =[];
    $scope.refresh = function() {
        kkhanme.getBlogs($scope);
    }
    $scope.viewBlog = function(url) {
        window.open(url, "_blank", "location=no");
    }
}

function kkhanme($http, $log) {
    this.getBlogs = function($scope) {
        $http.jsonp("https://public-api.wordpress.com/rest/v1/sites/kkhan.me/posts?callback=JSON_CALLBACK")
            .success(function(result) {
                $scope.posts = result.posts;
                $scope.$broadcast("scroll.refreshComplete");
            });
    }
}