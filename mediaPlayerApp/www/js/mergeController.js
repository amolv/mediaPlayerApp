angular.module('starter.controllers')
.controller('MergePdf', ['$rootScope', '$scope', function($rootScope, $scope) {
	

	$scope.showpdfincanvas = function(  ){
		
		PDFJS.getPdf('http://n2.transparent.sg:3000/assets/documents/1442934184799document.pdf', function getPdfHelloWorld(data) {
		  //
		  // Instantiate PDFDoc with PDF data
		  //
		  var pdf = new PDFJS.PDFDoc(data);
		  var page = pdf.getPage(1);
		  var scale = 1.5;
		 
		  //
		  // Prepare canvas using PDF page dimensions
		  //
		  var canvas = document.getElementById('the-canvas');
		  var context = canvas.getContext('2d');
		  canvas.height = page.height * scale;
		  canvas.width = page.width * scale;
		 
		  //
		  // Render PDF page into canvas context
		  //
		  page.startRendering(context);
		});

	}

}])
