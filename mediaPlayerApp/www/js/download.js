angular.module('starter.controllers')
.controller('download', ['$rootScope', '$scope','pdfDelegate', function($rootScope, $scope,pdfDelegate) {
	$scope.imgFile ="http://n2.transparent.sg:3000/assets/documents/1442934184799document.pdf";
	pdfDelegate.
	$getByHandle('my-pdf-container')
	.load($scope.imgFile);
	$scope.download = function() {
	    $rootScope.show('Accessing Filesystem.. Please wait');
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
	        fs.root.getDirectory(
	            "ExampleProject",
	            {
	                create: true
	            },
	            function(dirEntry) {
	                dirEntry.getFile(
	                    "test.pdf", 
	                    {
	                        create: true, 
	                        exclusive: false
	                    }, 
	                    function gotFileEntry(fe) {
	                        var p = fe.toURL();
	                        fe.remove();
	                        ft = new FileTransfer();
	                        ft.download(
	                            encodeURI("http://n2.transparent.sg:3000/assets/documents/1442934184799document.pdf"),
	                            p,
	                            function(entry) {
	                                $rootScope.hide();
	                                $scope.imgFile = entry.toURL();
	                                alert($scope.imgFile);
									pdfDelegate
									.$getByHandle('my-pdf-container')
									.load($scope.imgFile);
	                            },
	                            function(error) {
	                                $rootScope.hide();
	                                alert("Download Error Source -> " + JSON.stringify(error));
	                            },
	                            false,
	                            null
	                        );
	                    }, 
	                    function() {
	                        $rootScope.hide();
	                        alert("Get file failed");
	                    }
	                );
	            }
	        );
	    },
	    function() {
	        $rootScope.hide();
	        alert("Request for filesystem failed");
	    });
	}


}])
