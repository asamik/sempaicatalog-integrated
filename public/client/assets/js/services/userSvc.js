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

    this.filteredList;

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
