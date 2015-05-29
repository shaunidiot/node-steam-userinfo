var request = require('request');
var cheerio = require('cheerio');
var apikey = '';

var getUserInfo = function (steamid, callback){
	var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+apikey+'&steamids='+ steamid
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

var setup = function(key, callback){
	apikey = key;
}

module.exports = {
	getUserInfo: getUserInfo,
	setup: setup
}