angular.module("ownIt", [])
  .controller("OwnItController", function($http, $scope) {
    $scope.items = [];
    $scope.register = function(){
      var data = {
        fname: $scope.fname,
        lname: $scope.lname,
        username: $scope.username,
        password: $scope.password,
        email: $scope.email
      }
      console.log(data);
      $http({
        method: "POST",
        url: "/createUser",
        data: data
      }).then(function(result){
        //console.log(result);
      });
    };

    $scope.login = function(){
      var data = { username: $scope.username };
      $http({
        method: "POST",
        url: "/login",
        data: data
      }).then(function(result){
        $scope.loggedIn = true;
        console.log(result);
        $scope.userId = result.data._id;
        $scope.username = result.data.username;
        $scope.wallet = result.data.wallet;
        $scope.ownedItems = result.data.ownedItems;
      });
    };

    $scope.addItem = function(){
    swal({ title: "Are you sure?",   text: "Are you sure you want to sell this item?",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, sell it!",   closeOnConfirm: false }, 

      function(){   swal("On Sale!", "Your Item is now on sale!", "success"); 
        var data = {name: $scope.name, price: $scope.price, desc: $scope.desc, ownerId: $scope.userId}
        $http({
          method: "POST",
          url: "/addItem",
          data: data
        }).then(function(result){
          console.log(result);
          $scope.items.push(result.data);
        });
      });
    };

    $scope.getItems = function() {
      $http({
        method: 'GET',
        url: '/items'
      }).then (function (result){
        angular.forEach(result.data, function (eachOne){
          $scope.items.push(eachOne);
        });
      });
    };

    $scope.addMoney = function(){
      var data = {wallet : Number($scope.addAmount) + Number($scope.wallet)};
      $http({
        method: "POST",
        url: "/addMoney/" + $scope.userId,
        data: data
      }).then (function (result){
        $scope.wallet = result.data.wallet;
      });
    };

     $scope.buyItem = function(itemId){
      if ($scope.userId === undefined){
        swal({title: "Error!",   text: "You need to be logged in to buy an item!",   type: "error",   confirmButtonText: "Okay" });
      }else{
        var data = {itemId: itemId};
      $http({
        method: "POST",
        url: "/buyItem/" + $scope.userId,
        data: data
      }).then (function (result){
        console.log("result.data.wallet:");
        console.log(result.data.wallet);
        // $scope.wallet = result.data.wallet;
      });
      }
    };

    $scope.getItems();
  });