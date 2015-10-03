angular.module('starter', ['ionic','ngCordova', 'starter.controllers', 'starter.services','pdf'])

.run(function($ionicPlatform, $rootScope, $ionicLoading) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    $rootScope.toggle = function(text, timeout) {
      $rootScope.show(text);

      setTimeout(function() {
        $rootScope.hide();
      }, (timeout || 1000));
    };

    $rootScope.show = function(text) {
      $ionicLoading.show({
        template: text
      });
    };

    $rootScope.hide = function() {
      $ionicLoading.hide();
    };
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })


  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'BrowseCtrl'
      }
    }
  })

  .state('app.mergepdf', {
    url: "/mergepdf",
    views: {
      'menuContent': {
        templateUrl: "templates/mergepdf.html",
        controller: 'MergePdf'
      }
    }
  })

  .state('app.browseExternal', {
    url: "/browseExternal",
    views: {
      'menuContent': {
        templateUrl: "templates/browseExternal.html",
        controller: 'browseExternal'
      }
    }
  })

    .state('app.upload', {
    url: "/upload",
    views: {
      'menuContent': {
        templateUrl: "templates/uploadFile.html",
        controller: 'uploadFile'
      }
    }
  })

  .state('app.download', {
    url: "/download",
    views: {
      'menuContent': {
        templateUrl: "templates/download.html",
        controller: 'download'
      }
    }
  })

    .state('app.cordovaFileTransfer', {
    url: "/cordovaFileTransfer",
    views: {
      'menuContent': {
        templateUrl: "templates/cordovaFileTransfer.html",
        controller: 'cordovaFileTransfer'
      }
    }
  })


  $urlRouterProvider.otherwise('/app/upload');
});
