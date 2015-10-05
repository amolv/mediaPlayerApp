angular.module('starter.controllers')
.controller('uploadFile', function( $rootScope, $scope,$http, $ionicPopup, pdfDelegate ) {
	$scope.imagefiles = [];
	var baseURL="http://n2.transparent.sg:3000/api/";
	

	//$scope.modal.show();
	$scope.updateattachment = function(){
		angular.forEach(document.getElementById("file_browse").files, function(file) {
			var newfile = file;
			var oFReader = new FileReader();
			oFReader.onload = function (oFREvent) {
				$scope.attachmentfile = oFReader.result
				$scope.attachname =  document.getElementById("file_browse").files[0].name;
				var pdfDate = {
					attachmentname : $scope.attachname,
					attachment : $scope.attachmentfile
				};
				// An elaborate, custom popup
				  var myPopup = $ionicPopup.show({
				    template: '<ion-spinner icon="spiral"></ion-spinner>',
				    title: 'Uploading...',
				    scope: $scope,
				    
				  });
				  
				$http.post(baseURL + 'testPdf', pdfDate).success(function(res) {
					console.log(res);

					// http://n2.transparent.sg:3000/assets/pdfs/test/1444037006795.pdf
					 myPopup.close();
					$scope.pdfUrl ="http://n2.transparent.sg:3000/assets/documents/1442934184799document.pdf";
					pdfDelegate.$getByHandle('my-pdf-container').load($scope.pdfUrl);

					
				}).error(function() {	
				// alert("Please check your internet connection or data source..");
				});      
			};
			oFReader.readAsDataURL( newfile );
		});
	};
})
