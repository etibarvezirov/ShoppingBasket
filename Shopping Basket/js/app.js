var app = angular.module("myShop",[]);

app.controller("AppCtrl", [ '$scope','$http', function($scope, $http){

	$scope.appTitle = "Goods for sale";

	$scope.basket = "My Basket";

   
          $http.get('data/itemList.json')

          .then(function(response){
            
               $scope.items = response.data;
          });

   $scope.myItems = [];

   $scope.addItem = function(newItem){


   	if($scope.myItems.length == 0){

   		newItem.count = 1;

   		$scope.myItems.push(newItem);

   	} else {

   		var repeatItem = false;

   		for(var i=0;i<$scope.myItems.length;i++){

   			if($scope.myItems[i].id == newItem.id){

   				var repeatItem = true;

   				$scope.myItems[i].count++;
   			}
   		}

		   	if(!repeatItem){
		     
		     newItem.count = 1;

		   	 $scope.myItems.push(newItem);

		   	}
   	   }

   	   updatePrice();
   }

      var updatePrice = function(){

      	var totalPrice = 0;

      	for(var i=0;i<$scope.myItems.length;i++){

      		totalPrice += $scope.myItems[i].count * $scope.myItems[i].price;
      	}

      	$scope.totalPrice = totalPrice;
      }
    
    $scope.removeItem = function(deleteItem){

      var index = $scope.myItems.indexOf(deleteItem);
      $scope.myItems.splice(index,1);

      updatePrice();
    }
}]);

