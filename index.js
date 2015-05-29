var request = require('request');
var cheerio = require('cheerio');
var sessionID;

//function heavily inspired by node-steam-tradeoffers method
function getAPIKey(){
	request('https://steamcommunity.com/dev/apikey', function(error, response, body){
		if(!error && response.statusCode == 200){
			var $ = cheerio.load(body);
			if($('#mainContents h2').html() == 'Access Denied'){
				console.log('access denied getting api key, probably limited account');
			} else if($('#bodyContents_ex h2').html() == 'Your Steam Web API Key'){
				var key = $('#bodyContents_ex p').html().split(' ')[1];
				return key;
			} else {
				console.log('Registering Web API key');
				request.post({
					uri: 'https://steamcommunity.com/dev/registerkey',
					agreeToTerms : 'agreed',
					sessionid: sessionID,
					submit: 'Register'
				}, function(error, response, body){
					return getAPIKey();
				});
			}
		}
	});
}

var getUserInfo = function (steamid, callback){
	var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+getAPIKey()+'&steamids='+ steamid
	request({
		url: url,
		json: true
	}, function(error, response, body){
		if(!error && response.statusCode === 200){
			callback(null, body);
		} else if (error){
			callback(error);
		}
	});
}

var setup = function(sID, callback){
	sessionID = sID;
}

module.exports = {
	getUserInfo: getUserInfo,
	setup: setup
}