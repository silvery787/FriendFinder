var friendsData = require("../data/friends");

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	});

	app.post("/api/friends", function(req, res) {
	// handling incoming survey results and the compatibility logic.
		let new_user = req.body;

		let scores = [];
		let lowest_score = 100;
		let match_undex = 0;

		for(let i=0; i<friendsData.length; i++){
			//get score difference for current friend from friendsData
			let score = 0;
			for(let j=0; j<new_user.scores.length; j++){
				score+= Math.abs(new_user.scores[j]-friendsData[i].scores[j]);
			}
			scores.push(score);
			if(score < lowest_score){
				lowest_score = score;
				match_undex = i;
			}
		}

		let new_friends_list = [];
		for(let i=0; i<friendsData.length; i++){
			if(scores[i]===lowest_score){
				new_friends_list.push(friendsData[i]);
				// console.log('matched: '+i);
			}
		}
		friendsData.push(new_user);

		return res.json({'users': new_friends_list});
		// res.json({friendsData[match_undex]});

	});

};