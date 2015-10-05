angular.module('starter.controllers')
.controller('uploadFile', ['$rootScope', '$scope','$http', function($rootScope, $scope,$http) {
	$scope.imagefiles = [];
	var baseURL="http://n2.transparent.sg:3000/api/";
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
				console.log(pdfDate);
				console.log(baseURL);
				$http.post(baseURL + 'testPdf', pdfDate).success(function(res) {
					console.log(res);
					
				}).error(function() {	
				// alert("Please check your internet connection or data source..");
				});      
			};
			oFReader.readAsDataURL( newfile );
		});
	};
}])
