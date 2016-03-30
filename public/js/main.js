var twitterStream = angular.module('myApp', ['chart.js'])

twitterStream.controller("mainCtrl", ['$scope', 'socket',
function ($scope, socket) {
  //chart labels
  $scope.labels = ["RedSox", "Rockies", "Cardinals", "Royals", "Yankees", "BlueJays", "Cubs", "Twins", "Angels", "Astros", "Pirates", "Reds", "Brewers", "Athletics", "WhiteSox", "Marlins", "Rays", "DiamondBacks", "Nationals", "Rangers", "Padres"];
  //chart colors
  $scope.colors = ['#14203f' , '#2c2c51' , '#b83239' , '#bf1736' , '#024784' , '#004588' , '#0a2f87' , '#022a5d' , '#fe5a1e' , '#bc0227' , '#e3742c' , '#fcb923' , '#d00022' , '#ae8d48' , '#09331e' , '#010001' , '#f4660a' , '#102b56' , '#a61934' , '#b30007' , '#073076' , '#002d64' ];
  //intial data values
  $scope.trumpData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  $scope.sandersData = [0,0,0,0,0];

  socket.on('newTweet', function (tweet) {
    console.log(tweet);
    $scope.tweet = tweet.text
    $scope.user = tweet.user.screen_name
    //parse source from payload
    var textArr = tweet.text.split(' ')
    //all hashtags in the tweet
    var hashtags = tweet.entities.hashtags.map(function(el){
      return el.text.toLowerCase()
    })

    //check source and increment for #trump tweets
    if (hashtags.indexOf('redsox') !== -1 ){
      $scope.trumpData[0]++
    
    }
    if (hashtags.indexOf('rockies') !== -1  ){
      $scope.trumpData[1]++
    
    }
    if (hashtags.indexOf('cardinals') !== -1 ){
      $scope.trumpData[2]++
    
    }
    if (hashtags.indexOf('royals') !== -1 ){
      $scope.trumpData[3]++
    
    }
    if (hashtags.indexOf('yankees') !== -1){
      $scope.trumpData[4]++
    
    }
    if (hashtags.indexOf('bluejays') !== -1){
      $scope.trumpData[5]++
    
    }
    if (hashtags.indexOf('cubs') !== -1){
      $scope.trumpData[6]++
    
    }if (hashtags.indexOf('twins') !== -1){
      $scope.trumpData[7]++
    
    }
    if (hashtags.indexOf('angels') !== -1){
      $scope.trumpData[8]++
    
    }
    if (hashtags.indexOf('astros') !== -1){
      $scope.trumpData[9]++
    
    }
    if (hashtags.indexOf('pirates') !== -1){
      $scope.trumpData[10]++
    
    }
    if (hashtags.indexOf('reds') !== -1){
      $scope.trumpData[11]++
    
    }
    if (hashtags.indexOf('brewers') !== -1){
      $scope.trumpData[12]++
    
    }
    if (hashtags.indexOf('athletics') !== -1){
      $scope.trumpData[13]++
    
    }
    if (hashtags.indexOf('whitesox') !== -1){
      $scope.trumpData[14]++
    
    }
    if (hashtags.indexOf('marlins') !== -1){
      $scope.trumpData[15]++
    
    }
    if (hashtags.indexOf('rays') !== -1){
      $scope.trumpData[16]++
    
    }
    if (hashtags.indexOf('diamondbacks') !== -1){
      $scope.trumpData[17]++
    
    }
    if (hashtags.indexOf('nationals') !== -1){
      $scope.trumpData[18]++
    
    }
    if (hashtags.indexOf('rangers') !== -1){
      $scope.trumpData[19]++
    
    }
    if (hashtags.indexOf('padres') !== -1){
      $scope.trumpData[20]++
    
    }


// textArr = tweet.text.split(' ')
// textArr.indexOf('#Yankees') !== -1
//     //check source and increment for #feelthebern tweets
//     else if (hashtags.indexOf('yankees') !== -1) {
//       switch (tweet.text) {
//         case '#Rockies': $scope.sandersData[0]++
//         break;
//         case 'iPad': $scope.sandersData[1]++
//         break;
//         case 'Android': $scope.sandersData[2]++
//         break;
//         case 'Web Client': $scope.sandersData[3]++
//         break;
//         default: $scope.sandersData[4]++
//       }
//     }
  });
}
]);


/*---------SOCKET IO METHODS (careful)---------*/

twitterStream.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
});
