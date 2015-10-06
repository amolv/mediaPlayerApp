angular.module('starter.controllers')
.controller('uploadFile', function( $rootScope, $scope,$http, $ionicPopup, pdfDelegate ) {
	$scope.imagefiles = [];
	var baseURL="http://n2.transparent.sg:3000/api/";
	/*$scope.pdfUrl ="http://n2.transparent.sg:3000/assets/pdfs/test/1444037006795.pdf"
	pdfDelegate.$getByHandle('my-pdf-container').load($scope.pdfUrl);*/

	console.log( pdfDelegate.getPageCount() );
		// var currPage = 1; //Pages are 1-based not 0-based
		// var numPages = 0;
		// //var thePDF = null;

		// PDFJS.getDocument($scope.pdfUrl).then(function(pdf) {

		// //Set PDFJS global object (so we can easily access in our page functions
		// console.log(pdf);
		// thePDF = pdf;

		// //How many pages it has
		// numPages = pdf.numPages;
		// console.log(numPages);
		// //Start with first page
		// pdf.getPage( 1 ).then( handlePages );
		// });

		// function handlePages(page){
		// 	//This gives us the page's dimensions at full scale
		// 	var viewport = page.getViewport( 1 );

		// 	//We'll create a canvas for each page to draw it on
		// 	var canvas = document.getElementById( "canvas" );
		// 	console.log(canvas);
		// 	canvas.style.display = "block";
		// 	var context = canvas.getContext('2d');
		// 	canvas.height = viewport.height;
		// 	canvas.width = viewport.width;

		// 	//Draw it on the canvas
		// 	page.render({canvasContext: context, viewport: viewport});

		// 	//Add it to the web page
		// 	document.getElementById('to-pdf').appendChild( canvas );

		// 	//Move to next page
		// 	currPage++;
		// 	if ( thePDF !== null && currPage <= numPages )
		// 	{
		// 	thePDF.getPage( currPage ).then( handlePages );
		// 	}
			
		// 	var pdf = new jsPDF('p','pt','a4');
		// 	pdf.addHTML(document.getElementById('to-pdf'),function() {
		// 	pdf.save('web.pdf');
		// 	});

		// }


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
					$scope.pdfUrl ="http://n2.transparent.sg:3000/assets/"+res;
					pdfDelegate.$getByHandle('my-pdf-container').load($scope.pdfUrl);
				}).error(function() {	
				// alert("Please check your internet connection or data source..");
				});      
			};
			oFReader.readAsDataURL( newfile );
		});
	};

	  function getPosition(element) {
	    var xPosition = 0;
	    var yPosition = 0;

	    while(element) {
	        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
	        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
          element = element.offsetParent;
	    }
	    return { x: xPosition, y: yPosition };
	}
	
		var draggable = document.getElementById('canvas1');
	draggable.addEventListener('touchmove', function(event) {
	    var touch = event.targetTouches[0];
	    // Place element where the finger is
	    draggable.style.left = touch.pageX-80 + 'px';
	    draggable.style.top = touch.pageY-80 + 'px';
      //console.log(draggable.style.left+''+draggable.style.top);
	    event.preventDefault();
  	}, false);


	$scope.getTouchposition = function(event){

		var img1 = document.getElementById('img1');
		var confirmPopup = $ionicPopup.confirm({
			title: 'Sign here',
			template: '<div id="sign" style="width: 90%;height: 90%;background-color: #fff; margin: 10px;"><canvas id="signatureCanvas" ng-signature-pad="signature" width="210"></canvas></div>',
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.pdfhide=true;
				var img2 = document.getElementById('signatureCanvas');
				var canvas = document.getElementById("canvas");
				var context = canvas.getContext("2d");

				var canvas1 = document.getElementById("canvas1");
				var context1 = canvas1.getContext("2d");

				var width = img1.width;
				var height = img1.height;
				canvas.width = width;
				canvas.height = height;
				var pixels = 4 * width * height;

				context.drawImage(img1, 0, 0);

				var image1 = context.getImageData(0, 0, width, height);
				var imageData1 = image1.data;
				image1.data = imageData1;
				context.putImageData(image1, 0, 0);

				context1.drawImage(img2, 0, 0);
				var image2 = context1.getImageData(0, 0, width, height);
				var imageData2 = image2.data;
				context1.putImageData(image2, 0, 0);
			} else {
			console.log('You are not sure');
			}
		});
	}

	$scope.merge = function(event){
	    
	    
	    $scope.hide_old=true;
	    var img2 = document.getElementById('canvas1');
	    var img1 = document.getElementById('img1');
	    var canvasPosition = getPosition(img2);
	    console.log(canvasPosition.x);
	    console.log(canvasPosition.y);
	    var canvas = document.getElementById("to-pdf");
	    var context = canvas.getContext("2d");
	    var width = img1.width;
	    var height = img1.height;
	    canvas.width = width;
	    canvas.height = height;
	    var pixels = 4 * width * height;
	    context.drawImage(img1, 0, 0);
	    var image1 = context.getImageData(0, 0, width, height);
	    var imageData1 = image1.data;
	    context.moveTo(canvasPosition.x-98,canvasPosition.y-280);
	    context.lineTo(canvasPosition.x,canvasPosition.y);
	    context.drawImage(img2,0, 0 );
		
	 	var dataURL = canvas.toDataURL();
	
	// // var imgData = canvas.toDataURL("image/jpeg", 1.0);
	// // var pdf = new jsPDF();
	// // pdf.addImage(imgData, 'JPEG', 0, 0);
	// // pdf.save("download.pdf");
	 	var pdf = new jsPDF('p','pt','a4');
	 	pdf.addHTML(document.body,function() {
	 		pdf.save('web.pdf');
		});
  }


})
