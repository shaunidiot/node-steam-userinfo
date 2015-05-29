var request = require('request');
var cheerio = require('cheerio');

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
				console.log('Unable to get api key');
			}
		}
	});
}

module.exports = {
	GetUserInfo: function(steamid, callback){
		var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+steamid+'&steamids=76561197960435530'
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
}