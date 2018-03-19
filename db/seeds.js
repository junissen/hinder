var db = require("../models");

var groupCategoryObject = [
	{
		category_name: 'Work',
		bio: 'For coworkers'
	},
	{
		category_name: 'Friends',
		bio: 'For friends'
	},
	{
		category_name: 'Team',
		bio: 'For teams'
	},
	{
		category_name: 'Fantasy League',
		bio: 'For fantasy leagues'
	}
];

var groupObject = [
	{
		group_name: 'Group A',
		bio: 'Default Group A for Work Groups',
		photo: 'https://images-production.global.ssl.fastly.net/uploads/photos/file/117262/michae-scott-quotes-5.jpg?auto=compress&crop=top&fit=clip&h=500&q=55&w=698',
		category_id: 1
	},
	{
		group_name: 'Group B',
		bio: 'Default Group B for Work Groups',
		photo: 'https://vignette.wikia.nocookie.net/theoffice/images/c/cd/Dwight_Schrute.jpg/revision/latest?cb=20110105114630',
		category_id: 1
	},
	{
		group_name: 'Group A',
		bio: 'Default Group A for Fantasy League',
		photo: 'https://uproxx.files.wordpress.com/2014/09/rafi-the-league.jpg?quality=95&w=650',
		category_id: 2
	},
	{
		group_name: 'Group B',
		bio: 'Default Group B for Fantasy League',
		photo: 'https://uproxx.files.wordpress.com/2014/09/andre-the-league-main.jpg?quality=95&w=650&h=433',
		category_id: 2
	}
]

var hinderCategoryObject = [
	{
		hinder_type: 'sound'
	},
	{
		hinder_type: 'photo'
	},
	{
		hinder_type: 'gif'
	},
	{
		hinder_type: 'message'
	}
];

var hinderObject = [
	{
		category_id: 1,
		group_id: 1,
		pranker_id: 1,
		target_id: 2
	},
	{
		category_id: 2,
		group_id: 1, 
		pranker_id: 3,
		target_id: 4
	},
	{
		category_id: 3,
		group_id: 2, 
		pranker_id: 5,
		target_id: 6
	},
	{
		category_id: 4,
		group_id: 2,
		pranker_id: 7,
		target_id: 8
	},
	{
		category_id: 1,
		group_id: 3,
		pranker_id: 9,
		target_id: 10
	},
	{
		category_id: 2,
		group_id: 3, 
		pranker_id: 11,
		target_id: 12
	},
	{
		category_id: 3,
		group_id: 4, 
		pranker_id: 13,
		target_id: 14
	},
	{
		category_id: 4,
		group_id: 4,
		pranker_id: 15,
		target_id: 16
	}
];

var userObject = [
	{
		user_name: 'pamBeesly',
		password:'pam1234',
		photo: 'https://theofficeanalytics.files.wordpress.com/2017/09/pam-halpert-1.jpg?w=1200',
		group_id: 1
	},
	{
		user_name: 'dwightSchrute',
		password: 'dwight1234',
		photo: 'https://pbs.twimg.com/profile_images/1863312401/Dwight.jpg',
		group_id: 1
	},
	{
		user_name: 'jimHalpert',
		password: 'jim1234',
		photo: 'https://img.buzzfeed.com/buzzfeed-static/static/2017-08/9/11/asset/buzzfeed-prod-fastlane-01/sub-buzz-22381-1502291405-3.jpg?downsize=715:*&output-format=auto&output-quality=auto',
		group_id: 1
	},
	{
		user_name: 'michaelScott',
		password: 'michael1234',
		photo: 'https://list25.com/wp-content/uploads/2017/07/Michael-scott-quotes.jpg',
		group_id: 1
	},
	{
		user_name: 'andyBernard',
		password:'andy4321',
		photo: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fewedit.files.wordpress.com%2F2015%2F01%2Fandy-the-office_320.jpg%3Fw%3D320&w=700&q=85',
		group_id: 2
	},
	{
		user_name: 'kevinMalone',
		password: 'kevin1234',
		photo: 'https://vignette.wikia.nocookie.net/theoffice/images/e/ec/Kevin3.jpg/revision/latest/scale-to-width-down/220?cb=20140726053223',
		group_id: 2
	},
	{
		user_name: 'tobyFlenderson',
		password: 'toby1234',
		photo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Toby_Flenderson_promo_picture.jpg/235px-Toby_Flenderson_promo_picture.jpg',
		group_id: 2
	},
	{
		user_name: 'erinHannon',
		password: 'erin1234',
		photo: 'http://images2.fanpop.com/image/photos/10600000/Manager-and-Salesman-erin-hannon-10670032-1248-704.jpg',
		group_id: 2
	},
	{
		user_name: 'pete',
		password: 'pete1234',
		photo: 'https://vignette.wikia.nocookie.net/theleague/images/7/7d/The-league-1.jpeg/revision/latest?cb=20111216203415',
		group_id: 3
	},
	{
		user_name: 'ruxin',
		password: 'ruxin1234',
		photo: 'http://img.sharetv.com/shows/characters/thumbnails/the_league.ruxin.jpg',
		group_id: 3
	},
	{
		user_name: 'taco',
		password: 'taco1234',
		photo: 'https://vignette.wikia.nocookie.net/theleague/images/6/6c/League1-17.jpg/revision/latest?cb=20160130052150',
		group_id: 3
	},
	{
		user_name: 'rafi',
		password: 'rafi1234',
		photo: 'http://thirdmonk.net/postcont/2013/10/rafi-the-league-collection-cover.jpg',
		group_id: 3
	},
	{
		user_name: 'kevin',
		password: 'kevin1234',
		photo: 'https://vignette.wikia.nocookie.net/theleague/images/a/ab/Kevin.jpg/revision/latest?cb=20130310210224',
		group_id: 4
	},
	{
		user_name: 'andre',
		password: 'andre1234',
		photo: 'http://d24v5oonnj2ncn.cloudfront.net/wp-content/uploads/2012/10/12234215/Paul-Scheer-The-League.jpg',
		group_id: 4
	},
	{
		user_name: 'jenny',
		password: 'jenny1234',
		photo: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-12/7/13/campaign_images/webdr11/14-reasons-why-jenny-from-the-league-is-your-new--2-6712-1417977930-18_dblbig.jpg',
		group_id: 4
	},
	{
		user_name: 'shiva',
		password: 'shiva1234',
		photo: 'https://i.amz.mshcdn.com/6oNc4zjr6tWoTqGw6slv_XwAupg=/fit-in/1200x9600/http%3A%2F%2Fmashable.com%2Fwp-content%2Fuploads%2F2015%2F09%2FThe-League-The-Shiva-640x310.jpg',
		group_id: 4
	}
]


var populateTables = function populateTables() {

	// Populate group category table

	for (var i = 0; i < groupCategoryObject.length; i ++) {

		db.group_category.create({
			category_name: groupCategoryObject[i].category_name,
			bio: groupCategoryObject[i].bio
		}).then(function(result) {
			console.log(result)
		})

	}

	// Populate group table

	for (var i = 0; i < groupObject.length; i ++) {

		db.group.create({
			group_name: groupObject[i].group_name,
			bio: groupObject[i].bio,
			photo: groupObject[i].photo,
			category_id: groupObject[i].category_id
		}).then(function(result) {
			console.log(result)
		})

	}

	// Populate hinder category table

	for (var i = 0; i < hinderCategoryObject.length; i ++) {

		db.hinder_category.create({
			hinder_type: hinderCategoryObject[i].hinder_type
		}).then(function(result) {
			console.log(result)
		})

	}

	// Populate hinder table

	for (var i = 0; i < hinderObject.length; i ++) {

		db.hinder.create({
			category_id: hinderObject[i].category_id,
			group_id: hinderObject[i].group_id,
			pranker_id: hinderObject[i].pranker_id,
			target_id: hinderObject[i].target_id
		}).then(function(result) {
			console.log(result)
		})

	}

	// Populate user table

	for (var i = 0; i < userObject.length; i ++) {

		db.user.create({
			user_name: userObject[i].user_name,
			password: userObject[i].password,
			photo: userObject[i].photo,
			group_id: userObject[i].group_id
		}).then(function(result) {
			console.log(result)
		})

	}


};


module.exports = populateTables 