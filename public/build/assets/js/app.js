(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'naif.base64',
    'ngStorage',
    'ngRoute',

    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
    ])
  .config(config)
  .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider', '$routeProvider'];

  function config($urlProvider, $locationProvider, $httpProvider, $routeProvider) {
    $urlProvider.otherwise("/");
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push('authInterceptor');
  }

  function run() {
    FastClick.attach(document.body);
  }
})();

(function() {
	'use strict';

	angular.module('application').controller('FindSpeakersCtrl', FindSpeakersCtrl);

	FindSpeakersCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$localStorage'];

	function FindSpeakersCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller, $localStorage) {
		angular.extend(this, $controller('DefaultController', {
			$scope: $scope,
			$stateParams: $stateParams,
			$state: $state
		}));
		
		if (!$rootScope.amILoggedIn()) {
			return $state.go('home');
		}
		$scope.$storage = $localStorage;

		var userId = $scope.$storage.id;
		$rootScope.id = userId;
		$rootScope.token = $scope.$storage.token;

		$scope.inJapanese = function() {
			if(!UserSvc.currentLanguage) return false;
			return UserSvc.currentLanguage !== UserSvc.japanese;
		}

    $scope.allSpeakers = [];
    
    UserSvc.getAllSpeakers()
    .then(function(resp) {
    	$scope.allSpeakers = resp.data;
    })
    .catch(function(err) {
      console.log(err);
    });
  }
})();

(function() {
	'use strict';

	angular.module('application').controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['$timeout', 'FoundationApi', 'UserSvc', '$window',  '$cookies', '$scope', '$stateParams', '$state', '$controller', '$localStorage', '$rootScope', 'SweetAlertSvc'];

	function HomeCtrl($timeout, FoundationApi, UserSvc, $window, $cookies, $scope, $stateParams, $state, $controller, $localStorage, $rootScope, SweetAlertSvc) {

		angular.extend(this, $controller('DefaultController', {
			$scope: $scope,
			$stateParams: $stateParams,
			$state: $state,
			$localStorage: $localStorage
		}));

		$scope.inJapanese = function() {
			if(!UserSvc.currentLanguage) return false;
			return UserSvc.currentLanguage !== UserSvc.japanese;
		}

		$scope.loginUser = function() {
			UserSvc.login($scope.login)
			.then(function(resp, status, headers, config) {
				$scope.$storage.id =  resp.data.id;
				$scope.$storage.token = resp.data.token;
				$state.go('profile');
			})
			.catch(function(err) {
				console.log(err);
				delete $scope.$storage.token;
				err.type = 'loginError';
				$scope.$broadcast('error', err);
			});
		}

		$scope.$storage = $localStorage;

		$scope.signUpInProgress = false;

		$scope.proceedToSignup = function() {
			$scope.signUpInProgress = true;
			var email = $scope.email;
			var category = $scope.category

			UserSvc.checkEmail(email)
			.then(function(resp) {
				if(!UserSvc.currentLanguage) {
					SweetAlertSvc.american(category);
				} else {
					(UserSvc.currentLanguage !== UserSvc.japanese) ? SweetAlertSvc.japanese(category) :SweetAlertSvc.american(category)
				}
				$scope.$storage.email = email;
				if ($scope.category === 'sempai') {
					$state.go('speakerregister');
				} else {
					$state.go('signup');
				}
			})
			.catch(function(err){
        // email is taken
        $scope.signUpInProgress = false;        
        err.type = 'signupError';
        $scope.$broadcast('error', err);
      }) 
		}
	}
})();

(function() {
  'use strict';

  angular.module('application').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$timeout', 'FoundationApi', 'UserSvc', '$window',  '$cookies', '$scope', '$stateParams', '$state', '$controller', '$localStorage', '$rootScope'];

  function LoginCtrl($timeout, FoundationApi, UserSvc, $window, $cookies, $scope, $stateParams, $state, $controller, $localStorage, $rootScope) {

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $localStorage: $localStorage
    }));

    $scope.inJapanese = function() {
    	if(!UserSvc.currentLanguage) {return false;}
			return UserSvc.currentLanguage !== UserSvc.japanese;
    }

    $scope.welcome = "Log In";

    $scope.$storage = $localStorage;

    $scope.logInProgress = false;

    $scope.loginUser = function() {
		  $scope.logInProgress = true;
      UserSvc.login($scope.login)
      .then(function(resp, status, headers, config) {
        $scope.$storage.id =  resp.data.id;
        $scope.$storage.token = resp.data.token;
        $state.go('profile');
      })
      .catch(function(err) {
        console.log(err);
        delete $scope.$storage.token;
		    $scope.logInProgress = false;        
        err.type = 'loginError';
        $scope.$broadcast('error', err);
      });
    }
  }
})();    
(function() {
  'use strict';

  angular.module('application').controller('MessageCtrl', MessageCtrl);

  MessageCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$localStorage', 'MessageSvc'];

  function MessageCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller, $localStorage, MessageSvc) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
    
    if (!$rootScope.amILoggedIn()) {
      return $state.go('home');
    }
    $scope.$storage = $localStorage;

    var userId = $scope.$storage.id;
    $rootScope.id = userId;
    $rootScope.token = $scope.$storage.token;

    $scope.allMessages = [];

    MessageSvc.loadAllMessages()
    .then(function(resp) {
      $scope.allMessages = resp.data;
      
    })
    .catch(function(err) {
      console.log(err);
    })

  }
})();

(function() {
  'use strict';

  angular.module('application').controller('NavBarCtrl', NavBarCtrl);

  NavBarCtrl.$inject = ['$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$localStorage', 'UserSvc'];

  function NavBarCtrl($cookies, $scope, $rootScope, $stateParams, $state, $controller, $localStorage, UserSvc) {
    
    $scope.$storage = $localStorage;
    $scope.uiRouterState = $state;

    $scope.currentlanguage = UserSvc.currentLanguage || UserSvc.japanese;

    $scope.switchLanguage = function() {
      console.log("UserSvc.currentLanguage CLICK!", UserSvc.currentLanguage);
			if ($scope.currentlanguage == UserSvc.japanese) {
		 		$scope.currentlanguage = UserSvc.american;
		 		UserSvc.currentLanguage = UserSvc.american;
      console.log("UserSvc.currentLanguage AFTER CLICK!", UserSvc.currentLanguage);
		 	} else {
        console.log("to JP")
		 		$scope.currentlanguage = UserSvc.japanese;
		 		UserSvc.currentLanguage = UserSvc.japanese;
      console.log("UserSvc.currentLanguage AFTER CLICK!", UserSvc.currentLanguage);

		 	}
    }

    $scope.inJapanese = function() {
    	if(!UserSvc.currentLanguage) {return false;}
			return UserSvc.currentLanguage !== UserSvc.japanese;
    }

    $scope.logout = function(){
      delete $scope.$storage.token;
      $state.go('home');
    }

///Move to app.js

    $rootScope.amILoggedIn = function() {
      return !!$scope.$storage.token;
    }

    $rootScope.amINotLoggedIn = function() {
      return (!$scope.$storage.token || ($scope.uiRouterState.current.name === "login"));
    }

    $rootScope.amIAdmin = function() {
      // var token = $window.sessionStorage.token;
    }
  }
})();

(function() {
  'use strict';

  angular.module('application').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['UserSvc', '$scope', '$window', '$rootScope', '$stateParams', '$state', '$controller', '$http', '$localStorage', 'SweetAlertSvc'];

  function ProfileCtrl(UserSvc, $scope, $window, $rootScope, $stateParams, $state, $controller, $http, $localStorage, SweetAlertSvc) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));

    if (!$rootScope.amILoggedIn()) {
      return $state.go('home');
    }    
    $scope.$storage = $localStorage;

    var userId = $scope.$storage.id;
    $rootScope.id = userId;
    $rootScope.token = $scope.$storage.token;

    $scope.inJapanese = function() {
    	if(!UserSvc.currentLanguage) return false;
			return UserSvc.currentLanguage !== UserSvc.japanese;
    }
    
    function getUserInfo() {
      UserSvc.getUserInfo(userId)
      .then(function(res) {
            console.log("res.data", res.data);
        if(res.data.speaker === true) {
          UserSvc.getSpeakerInfo(userId)
          .then(function(resp) {
            $scope.user = res.data;
            $scope.isSpeaker = function() {
              return $scope.user.speaker = true;
            }
            $scope.speakerDetail = resp.data;
          })
        } else {
        $scope.user = res.data;
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    }
    getUserInfo();

    $scope.initializeModal = function() {
      $scope.updateduser = JSON.parse(JSON.stringify($scope.user)); 
      $scope.updatedspeakerDetail = $scope.speakerDetail;     
    }

    $scope.saveChanges = function() {
      if (!$scope.updateduser || !$scope.updateduser.organization || !$scope.updateduser.position || !$scope.updateduser.region) {
        if(!UserSvc.currentLanguage || UserSvc.currentLanguage !== UserSvc.japanese) {
          return SweetAlertSvc.noBlankEditEN();
        } else {
          return SweetAlertSvc.noBlankEditJP();
        }
      }    
      UserSvc.updateUser($scope.updateduser)
      .then(function(res) {
        $scope.user = $scope.updateduser;
        if (res.data.speaker === true) {
          UserSvc.updateSpeakerDetail($scope.updatedspeakerDetail, res.data._id)
          .then(function(resp) {
            getUserInfo();
          })
          .catch(function(err) {
            console.log('err', err);
          });
        }
      })
      .catch(function(err) {
        console.log('err', err);
      });
    }
  }
})();

(function() {
  'use strict';

  angular.module('application').controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['UserSvc', '$scope', '$window', '$stateParams', '$state', '$controller', '$http', '$localStorage', '$rootScope'];

  function SignUpCtrl(UserSvc, $scope, $window, $stateParams, $state, $controller, $http, $localStorage, $rootScope) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $localStorage: $localStorage
    }));

    $scope.$storage = $localStorage;

    $scope.inJapanese = function() {
    	if(!UserSvc.currentLanguage) {return false;}
			return UserSvc.currentLanguage !== UserSvc.japanese;
    }

    $scope.signUpProgress = false;

    $scope.allDone = function(user){
	    $scope.signUpProgress = true;	
      var newUser = {
        name: user.name,
        organization: user.organization,
        position: user.position,
        region: user.region,
        password: user.password,
        password2: user.confirmpassword,
        email: $scope.$storage.email
      }

      UserSvc.register(newUser)
      .then(function(resp){
        $scope.$storage.id =  resp.data.id
        $rootScope.id =  resp.data.id
        $scope.$storage.token = resp.data.token;
        $rootScope.token = resp.data.token;
        $state.go('profile');
      })
      .catch(function(error){
        delete $scope.$storage.token;
        console.log("error:", error)
        $state.go('home');
      })
    }

    $scope.validateUserInput = function(){
      return $scope.user && $scope.user.name && $scope.user.password && $scope.user.organization && $scope.user.position && $scope.user.region　&& ($scope.user.password === $scope.user.confirmpassword);
    }
  }
})();

(function() {
	'use strict';

	angular.module('application').controller('SpeakerProfileCtrl', SpeakerProfileCtrl);

	SpeakerProfileCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$http'];

	function SpeakerProfileCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller, $http) {
		'use strict';
		if (!$rootScope.amILoggedIn()) {
			return $state.go('home');
		}
		
		$scope.inJapanese = function() {
			if(!UserSvc.currentLanguage) {return false};
			return UserSvc.currentLanguage !== UserSvc.japanese;
		}

		UserSvc.getSpeakerInfo($stateParams.speakerId)
		.then(function(resp) {
			$scope.isSpeaker = function() {return resp.data.speaker}
			$scope.speaker = resp.data;
		})
		.catch(function(err) {
			console.log(err);
		});
	}
})();

(function() {
	'use strict';

	angular.module('application').controller('SpeakerRegisterCtrl', SpeakerRegisterCtrl);

	SpeakerRegisterCtrl.$inject = ['UserSvc', '$scope', '$stateParams', '$state', '$controller', '$http', '$localStorage', '$rootScope'];

	function SpeakerRegisterCtrl(UserSvc, $scope, $stateParams, $state, $controller, $http, $localStorage, $rootScope) {
		angular.extend(this, $controller('DefaultController', {
			$scope: $scope,
			$stateParams: $stateParams,
			$state: $state,
			$localStorage: $localStorage
		}));

		$scope.$storage = $localStorage;

		$scope.speakerImage = function(){
			return $scope.speakerpic ? 'data:image/jpeg;base64,' + $scope.speakerpic.base64 : "http://placehold.it/250x200";
		}

    $scope.inJapanese = function() {
    	if(!UserSvc.currentLanguage) {return false;}
			return UserSvc.currentLanguage !== UserSvc.japanese;
    }

    $scope.isPicSizeAlright = function() {
      var pic = $scope.speakerpic.base64;
      var imageSizeLimit = 2000000;
      var byteChars = atob(pic);
      var byteNumbers = new Array(byteChars.length);

      for (var i = 0; i < byteChars.length; i++) {
          byteNumbers[i] = byteChars.charCodeAt(i);
      }
      console.log("scope pic", byteNumbers.length)
      if(byteNumbers.length >= imageSizeLimit) {
         $scope.pic = "";
        return console.log("Image size too big");
      }
        return console.log("Image size okay");
    }

		$scope.registerInProgress = false;

		$scope.allDone = function(speaker, speakerDetail){
			$scope.registerInProgress = true;

			var newSpeaker = {
				name: speaker.name,
				organization: speaker.organization,
				position: speaker.position,
        region: speaker.region,
				password: speaker.password,
				password2: speaker.confirmpassword,
				email: $scope.$storage.email
      }

			UserSvc.register(newSpeaker)
			.then(function(resp){
				$scope.$storage.id =  resp.data.id
				$rootScope.id =  resp.data.id
				$scope.$storage.token = resp.data.token;
				$rootScope.token = resp.data.token;

				var newSpeakerDetail = {
					id: $scope.$storage.id,
          profilePic: 'data:image/jpeg;base64,' + $scope.speakerpic.base64,
					expertise: speakerDetail.expertise,
					fee: speakerDetail.fee,
					topics: speakerDetail.topics,
					header: speakerDetail.header,
					selfintroduction: speakerDetail.selfintroduction,
					background: speakerDetail.background
				}

				UserSvc.registerspeaker(newSpeakerDetail)
				.then(function(resp){
					$state.go('profile');
				})
				.catch(function(error){
					$scope.registerInProgress = false;
				})
			})
			.catch(function(error){
				$scope.registerInProgress = false;      	
			})      
		}

		$scope.validate = function(){
			return $scope.speaker && $scope.speaker.name && $scope.speaker.password && $scope.speaker.organization && $scope.speaker.position && $scope.speaker.region && ($scope.speaker.password === $scope.speaker.confirmpassword) && $scope.speakerpic && $scope.speakerDetail && $scope.speakerDetail.fee && $scope.speakerDetail.header
		}    
	}
})();

angular.module('application').directive('errorMessage', errorMessage);

errorMessage.$inject = ['UserSvc'];

function errorMessage(UserSvc) {
  return {
    restrict: "AE",
    templateUrl: "templates/errorMessage.html",
    scope: {
      type: "@",
    },
    controller: function($scope, $timeout) {
      'use strict';
      var errormessages = { 
        0: "Email address already in use",
        1: "そのメールアドレスは既に登録されています。",
        2: "Incorrect email or password",
        3: "メールアドレスまたはパスワードが一致しません。"
      }

      $scope.$on('error', function(event, error) {
        if ($scope.type === error.type) {
          if( error.data == "email is already in use") {
            if(!UserSvc.currentLanguage || (UserSvc.currentLanguage !== UserSvc.american)) {
              $scope.message = errormessages[0];
            } else  { 
              $scope.message = errormessages[1];
            }            
          } else {
            if(!UserSvc.currentLanguage || (UserSvc.currentLanguage !== UserSvc.american)) {
              $scope.message = errormessages[2];
            } else  { 
              $scope.message = errormessages[3];
            }
          }          
          $scope.hasError = true;
          $timeout(function() {
            $scope.hasError = false;
          }, 2500);
        }
      })
    }
  }
}

angular.module('application').directive('routeLoadingIndicator', routeLoadingIndicator);

routeLoadingIndicator.$inject = ['$rootScope'];

function routeLoadingIndicator($rootScope) {
	return {
		restrict: 'E',
		template: "<h1 ng-if='isRouteLoading'> Loading...<h1>",
		link: function(scope) {
			scope.isRouteLoading = false;

			$rootScope.$on('$routeChangeStart', function() {
				scope.isRouteLoading = true;
			});

			$rootScope.$on('$routeChangeSuccess', function() {
				scope.isRouteLoading = false;
			});
		}
	};
};

angular.module('application').directive('speakerCard', speakerCard);

function speakerCard() {
  return {
    restrict: "AE",
    templateUrl: "templates/speakerCard.html",
    scope: {
      user: "@"
    },
    controller: function($scope, UserSvc, $state) {
      'use strict';
      $scope.data = JSON.parse($scope.user);
    }
  }
}

angular.module('application').directive('userRow', userRow);

function userRow() {
  return {
    restrict: "A",
    templateUrl: "templates/userRow.html",
    scope: {
      data: "@"
    },
    controller: function(AdminSvc, $scope, $http) {
      'use strict';
      $scope.user = JSON.parse($scope.data);
      $scope.updatedUser = JSON.parse($scope.data);

      function populateUsers() {
        $scope.$emit('populateUsers');
      }

      $scope.makeAdmin = function(user){
        AdminSvc.makeAdmin(user)
          .then(function(res) {
          populateUsers();
          console.log('Updated to admin successfully', res);
        }).catch(function(err) {
          console.error(err);
        })
      }

      $scope.removeUser = function(user) {
        AdminSvc.removeUser(user)
          .then(function(res) {
            populateUsers();
            console.log('deleted user');
          })
          .catch(function(err) {
            console.log('err', err);
          });
      }

      $scope.editUser = function() {
        AdminSvc.editUser($scope.updatedUser)
          .then(function(res) {
            populateUsers();
            console.log('updated user');
          })
          .catch(function(err) {
            console.log('err', err);
          });
      }
    }
  };
}

(function() {
	"use strict";

	angular.module("application").service('SweetAlertSvc', SweetAlertSvc);
	function SweetAlertSvc() {
    this.noBlankEditJP = function() {
      swal({
        title:"空欄に変更はできません", 
        type: "warning",
        confirmButtonColor: "#304476",
        confirmButtonText: "OK",
        timer: 1500
      })
    }
    
    this.noBlankEditEN = function() {
      swal({
        title:"You cannot change these fields to blank.",
        type: "warning",
        confirmButtonColor: "#304476",
        confirmButtonText: "OK",
        timer: 1500
      })
    }

		this.japanese = function(category) {
			if (category === 'sempai') {
				swal({
					title: "ご関心をお持ちいただき<br>ありがとうございます!",   
					text: "「Sempai」として登録を完了するには<br>管理者の承認が必要です。このまま本登録の手続きに進んでしょうか？",
					html: true,
					type: "info",   
					showCancelButton: true,   
					confirmButtonColor: "#DEBC37",   
					confirmButtonText: "OK",   
					closeOnConfirm: false 
				}, 
				function(){
					swal({
						title:"仮登録をいたしました", 
						text: "このまま本登録にお進みください。", 
						confirmButtonColor: "#DEBC37",
						timer: 1000          
					})         
				})  
			} else {
				swal({
					title: "ご関心をお持ちいただき<br>ありがとうございます!",   
					text: "教員の方としてこのままご本登録のお手続きに<br>進んでよろしいでしょうか？",
					html: true,
					type: "info",
					showCancelButton: true,   
					confirmButtonColor: "#DEBC37",   
					confirmButtonText: "OK",   
					closeOnConfirm: false 
				}, 
				function(){
					swal({
						title:"仮登録をいたしました", 
						text: "このまま本登録にお進みください。", 
						confirmButtonColor: "#DEBC37",
						timer: 1000
					})
				})        
			}	
		}

		this.american = function(category) {
			if (category === 'sempai') {
				swal({
					title: "Thank you for pre-registering!",   
					text: "You will need permission of administrator to fully register.<br>Are you sure you want to proceed?",
					html: true,
					type: "info",   
					showCancelButton: true,   
					confirmButtonColor: "#DEBC37",   
					confirmButtonText: "Yes!",   
					closeOnConfirm: false 
				},
				function(){
					swal({
						title:"Preregistration Complete.", 
						text: "Please proceed to complete the registration", 
						confirmButtonColor: "#DEBC37",
						timer: 1000          
					})         
				})  
			} else {
				swal({
					title: "Thank you for<br>registering with us!",   
					text: "Are you sure you want to <br>proceed as a teacher?",
					html: true,
					type: "info",
					showCancelButton: true,   
					confirmButtonColor: "#DEBC37",   
					confirmButtonText: "Yes!",   
					closeOnConfirm: false 
				},
				function(){
					swal({
						title:"Preregistration Complete", 
						text: "Please proceed to complete the registration", 
						confirmButtonColor: "#DEBC37",
						timer: 1000
					})
				})        
			}	
		}
	}
})();

(function() {
  'use strict';

  angular.module('application').factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$window'];

  function authInterceptor($rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($rootScope.token) {
          config.headers.Authorization = 'Bearer ' + $rootScope.token;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          console.log('user not authenticated')
        }
        return response || $q.when(response);
      }
    };
  };
})();

(function() {
  'use strict';

  angular.module('application').service('MessageSvc', MessageSvc);

  MessageSvc.$inject = ['$http'];

  function MessageSvc($http) {
    var url = "http://localhost:3000";
    // var url = 'https://lit-hamlet-87436.herokuapp.com';

  this.loadAllMessages = function() {
    return $http.get(url + '/messages');
  }
  }
})();

(function() {
	'use strict';

	angular.module('application').service('UserSvc', UserSvc);

	UserSvc.$inject = ['$http'];

	function UserSvc($http) {
		this.userInfo = null;

    var url = "http://localhost:3000";
    // var url = 'https://lit-hamlet-87436.herokuapp.com';

    this.japanese = "sempai-catalog-project/assets/css/image/japan.png";
    this.american = "sempai-catalog-project/assets/css/image/us-flag.png";

    this.currentLanguage;

    this.checkEmail = function(email){
    	return $http.post(url + '/users/checkemail', {email: email});
    }

    this.register = function(newUser){
    	return $http.post(url + '/users/register', newUser);
    }

    this.login = function(info) {
    	return $http.post(url + '/users/login', info);
    }

    this.getUserInfo = function(id) {
    	return $http.get(url + '/users/' + id);
    }

    this.getUserInfoUnpopulated = function(id) {
    	return $http.get(url + '/users/unpopulated/' + id);
    }

    this.getAllSpeakers = function(){
    	return $http.get(url + '/users');
    }

    this.getSpeakerInfo = function(speakerid) {
    	return $http.get(url + '/users/speaker/' + speakerid);
    }

    this.registerspeaker = function(speakerdetail) {
    	return $http.post(url + "/users/speakerdetail/register/" + speakerdetail.id, speakerdetail)
    }

    this.updateSpeakerDetail = function(speakerdetail, speakerid) {
    	return $http.put(url + "/users/editspeakerdetail/" + speakerid, speakerdetail);
    }

    this.updateUser = function(user) {
    	return $http.put(url + "/users/edit/" + user._id, user);
    }
  }
})();
