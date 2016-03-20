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
  });