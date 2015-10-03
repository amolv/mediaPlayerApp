angular.module('starter.controllers')
.controller('browseExternal', ['$rootScope', '$scope', function($rootScope, $scope) {
	console.log("browseExternal");
	$scope.filepathChooser = function() {
    window.plugins.mfilechooser.open(['.pdf'], function (uri) {
       //Here uri provides the selected file path.
    console.log('file path', uri);
    alert(uri);
    $scope.pdfUrl = uri;
       pdfDelegate
        .$getByHandle('my-pdf-container')
        .load($scope.pdfUrl);
        alert($scope.pdfUrl);
  }, function (error) {
      console.log('Error', error);
   alert(error);
  });
 };
}])
