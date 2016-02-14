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
