var app = angular.module('contactwee',[]);

app.controller('contactCtrl',['$scope','$http',function($scope,$http){

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
			$http.post('/contact', $scope.contact).success(function(response){
				//console.log(response);
				$scope.refresh();
			});
		}else{
			alert('All feilds required *');
		}
	}

	$scope.remove = function(id){
		$http.delete('/contact/' + id).success(function(resposne){
			$scope.refresh();
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
			$http.put('/contact/' + $scope.contact._id,$scope.contact).success(function(response){
				$scope.refresh();
			});
			document.getElementById('add').disabled = false;
		}else{
			alert('All feilds required *');
		}
	}

}]);