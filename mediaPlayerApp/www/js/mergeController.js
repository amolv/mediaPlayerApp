angular.module('starter.controllers')
.controller('MergePdf', ['$rootScope', '$scope','pdfDelegate', function($rootScope, $scope,pdfDelegate) {
	

	$scope.showpdfincanvas = function(  ){
		
		$scope.pdfUrl ="http://n2.transparent.sg:3000/assets/documents/1442934184799document.pdf";
		pdfDelegate.
		$getByHandle('my-pdf-container')
		.load($scope.pdfUrl);


	}

}])
