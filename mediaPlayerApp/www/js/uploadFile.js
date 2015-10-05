angular.module('starter.controllers')
.controller('uploadFile', ['$rootScope', '$scope', function($rootScope, $scope) {
	$scope.imagefiles = [];
	$scope.updateattachment = function(){
		angular.forEach(document.getElementById("file_browse").files, function(file) {
			var newfile = file;
			alert(newfile.webkitRelativePath);
			var oFReader = new FileReader();
			oFReader.onload = function (oFREvent) {
			$scope.imagefiles.push(oFReader.result);
			console.log($scope.imagefiles);
			var img = new Image();
			console.log(img);
			};
			oFReader.readAsDataURL( newfile );
		});
	};
}])
