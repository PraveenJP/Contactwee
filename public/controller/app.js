var app = angular.module('contactwee',[]);

app.controller('contactCtrl',['$scope','$http',function($scope,$http){

	$scope.addloader = false;
	$scope.editloader = false;
	$scope.delloader = false;
	$scope.addicon = true;
	$scope.editicon = true;
	$scope.delicon = true;
	document.getElementById('update').disabled = true;

	$scope.refresh = function() {
		document.getElementById('update').disabled = true;
		document.getElementById('add').disabled = false;
		$http.get('/contact').success(function(response){
			//console.log(response);
			$scope.contactwee = response;
			$scope.contact = "";
		});
	};	

	$scope.refresh();

	$scope.addContact = function(){		
		console.log($scope.contact);
		if($scope.contactwee.length >= 10){
			alert('Limited Contacts Only! Sorry *');
		}else if($scope.contact != "" ){
			document.getElementById('add').disabled = true;
			$scope.addicon = false;
			$scope.addloader = true;
			$http.post('/contact', $scope.contact).success(function(response){
				//console.log(response);
				$scope.refresh();
				$scope.addloader = false;
				$scope.addicon = true;
				document.getElementById('add').disabled = false;
			});
		}else{
			alert('All feilds required *');
		}
	}

	$scope.remove = function(id){
		document.getElementById('delete').disabled = true;
		$scope.delicon = false;
		$scope.delloader = true;
		$http.delete('/contact/' + id).success(function(resposne){
			$scope.refresh();
			$scope.delloader = false;
			$scope.delicon = true;
			document.getElementById('delete').disabled = false;
		});
	}

	$scope.edit = function(id){
		document.getElementById('add').disabled = true;
		document.getElementById('update').disabled = false;
		$http.get('/contact/' + id).success(function(response){
			$scope.contact = response;
		});
	}

	$scope.update = function(){
		//console.log($scope.contact._id);
		if($scope.contact != ""){
			document.getElementById('update').disabled = true;
			$scope.editicon = false;
			$scope.editloader = true;
			$http.put('/contact/' + $scope.contact._id,$scope.contact).success(function(response){
				$scope.refresh();
				$scope.editloader = false;
				$scope.editicon = true;
				document.getElementById('update').disabled = false;
			});
			document.getElementById('add').disabled = false;
		}else{
			alert('All feilds required *');
		}
	}

}]);