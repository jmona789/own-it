angular.module("ownIt", [])
  .controller("OwnItController", function($http, $scope) {
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
        });
      });
    };
  });