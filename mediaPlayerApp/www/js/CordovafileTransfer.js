angular.module('starter.controllers')
.controller('cordovaFileTransfer', ['$rootScope', '$scope', function($rootScope, $scope) {
	console.log("cordovaFileTransfer");
	$scope.download = function() {
	    $rootScope.show('Loading...');
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
	        fs.root.getDirectory(
	            "ExampleProject",
	            {
	                create: true
	            },
	            function(dirEntry) {
	                dirEntry.getFile(
	                    "test.png", 
	                    {
	                        create: true, 
	                        exclusive: false
	                    }, 
	                    function gotFileEntry(fe) {
	                        var p = fe.toURL();
	                        fe.remove();
	                        ft = new FileTransfer();
	                        ft.download(
	                            encodeURI("http://ionicframework.com/img/ionic-logo-blog.png"),
	                            p,
	                            function(entry) {
	                               	$rootScope.hide();
	                                $scope.imgFile = entry.toURL();
	                            },
	                            function(error) {
	                                $ionicLoading.hide();
	                                alert("Download Error Source -> " + error.source);
	                            },
	                            false,
	                            null
	                        );
	                    }, 
	                    function() {
	                        $ionicLoading.hide();
	                        console.log("Get file failed");
	                    }
	                );
	            }
	        );
	    },
	    function() {
	        $ionicLoading.hide();
	        console.log("Request for filesystem failed");
	    });
	}
 
    $scope.load = function() {
    
    }
}])
