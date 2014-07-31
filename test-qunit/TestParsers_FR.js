
//test("Test - International Standard Parser", function() {
//
//	var text = "Let's finish this before this 2013-2-7.";
//	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
//	ok(parser, parser)
//
//	parser.execAll();
//	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )
//
//	var result = parser.results()[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2013,1,7,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "Let's finish this before this 2013-02-07.";
//	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
//	ok(parser, parser)
//
//	parser.execAll();
//	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )
//
//	var result = parser.results()[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 1, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2013,1,7,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "Let's finish this before this 2013-02-29.";
//	var parser = chrono.parsers.InternationalStandardParser(text, new Date(2012,7,8));
//	ok(parser, parser)
//
//	parser.execAll();
//	ok(parser.results().length == 0, JSON.stringify( parser.results() ) )
//});

//test("Test - Slash", function() {
//
//	var text = "The Deadline is 8/10/2012";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 16, 'Wrong index')
//		ok(result.text == '8/10/2012', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "The Deadline is 1/10/13";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2013,0,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "The Deadline is 1/10/56";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2013,0,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//  	var text = "The Deadline is 1/10/56 - 3/10/56";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2013,0,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//
//		ok(result.end.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.end.month == 2, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.end.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.endDate);
//		var expectDate = (new Date(2013,2,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//
//	}
//
//	var text = "The Deadline is 05/06/13";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 4, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 6, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2013,4,6,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	//Should not parse date directly from URLs
//	var text = "http://blog.evernote.com/blog/2013/07/11/save-the-date-the-evernote-conference-is-back/";
//  	var results = chrono.parse(text);
//	ok(results.length == 0, JSON.stringify( results ) )
//
//});

test("FR Test - Little Endian with Month's name", function() {

	var text = "12 Juillet à 19h00";
	var results = chrono.parse(text, new Date(2014,6,7));
	ok(results.length == 1, JSON.stringify( results ) )
	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.text == '12 Juillet à 19h00', result.text)

		var resultDate = (result.startDate);
		var expectDate = (new Date(2014,6,12,19));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline est le 10 Août 2012";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

    var text = "The Deadline est le 07 Septembre 2012";
    var results = chrono.parse(text, new Date(2012,7,10));

    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.month == 8, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.day == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )
        ok(result.text == "07 Septembre 2012", result.text);
        var resultDate = (result.startDate);
        var expectDate = (new Date(2012,8,7,12));
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }



    var text = "The Deadline est le 10 Août";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}



	var text = "The Deadline est le 10 Août 2555 BE";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline est Mardi, 10 Janvier";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 2, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )

		ok(result.text == 'Mardi, 10 Janvier', result.text)
		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,0,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)

	}

});

//test("Test - Middle Endian with Month's name", function() {
//
//	var text = "The Deadline is August 10, 2012";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "The Deadline is August 10";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//
//	var text = "The Deadline is August 10 2555 BE";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "The Deadline is January 10";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2013,0,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "The Deadline is Tuesday, January 10";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//    ok(result.start.dayOfWeek == 2, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )
//		ok(result.text == 'Tuesday, January 10', result.text)
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2013,0,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "The Deadline is Tue, January 10";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//		ok(result.start.dayOfWeek == 2, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )
//		ok(result.start.impliedComponents, 'Implied Components - ' + JSON.stringify(result.start.impliedComponents) )
//
//		ok(result.text == 'Tue, January 10', result.text)
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2013,0,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "The Deadline is August 10-12, 2012";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.end, JSON.stringify(result.start) )
//		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.end.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "The Deadline is  August 10 to 12 2012";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.end, JSON.stringify(result.start) )
//		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.end.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "The Deadline is August 10 - 12";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//
//		ok(result.end, JSON.stringify(result.start) )
//		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.end.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "The Deadline is August 10 - November 12";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//
//
//		ok(result.end, JSON.stringify(result.start) )
//		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.end.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.endDate);
//		var expectDate = (new Date(2012,10,12,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "The Deadline is August 10 to November 12";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//
//
//		ok(result.end, JSON.stringify(result.start) )
//		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.end.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.endDate);
//		var expectDate = (new Date(2012,10,12,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "The Deadline is Aug 10 - Nov 12";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//
//
//		ok(result.end, JSON.stringify(result.start) )
//		ok(result.end.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.end.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.endDate);
//		var expectDate = (new Date(2012,10,12,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "The Deadline is Aug 10 - Nov 12, 2013";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2013,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//
//
//		ok(result.end, JSON.stringify(result.start) )
//		ok(result.end.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.end.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		var resultDate = (result.endDate);
//		var expectDate = (new Date(2013,10,12,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "The Deadline is Aug 10 - Nov 12, 2011";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//		ok(!result.start.impliedComponents, 'Implied Components - ' + JSON.stringify(result.start.impliedComponents) )
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2011,7,10,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//
//
//		ok(result.end, JSON.stringify(result.start) )
//		ok(result.end.year == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.end.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.end.day == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//		ok(!result.end.impliedComponents, 'Implied Components - ' + JSON.stringify(result.end.impliedComponents) )
//
//		var resultDate = (result.endDate);
//		var expectDate = (new Date(2011,10,12,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//});

test("FR Test - Date + Time", function() {

	var text = "The Deadline est le 10 Août 2012 22h12";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 22, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 12, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,22,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is le 10 Août 2012 à 22:12:59";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 22, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 12, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 59, 'Test Result - (Second) ' + JSON.stringify(result.start) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,22,12,59));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline c'est Vendredi à 10h";
	var results = chrono.parse(text, new Date(2012,7,9));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 10, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 5, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )

		ok(result.text == 'Vendredi à 10h', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,10,0,0));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Lundi à 10h";
	var results = chrono.parse(text, new Date(2012,7,9));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 13, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 10, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 1, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )
		ok(result.text == 'Lundi à 10h', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,13,10,0,0));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline est ce Jeudi à 10h";
	var results = chrono.parse(text, new Date(2012,7,9));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 16, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 10, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 0, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )

		ok(result.text == 'ce Jeudi à 10h', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,16,10,0,0));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}



	var text = "The Deadline is vendredi prochain à 9h30";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 17, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 9, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
		ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
		ok(result.start.dayOfWeek == 5, 'Test Result - (Day of Week) ' + JSON.stringify(result.start) )
		ok(result.text == 'vendredi prochain à 9h30', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,17,9,30,0));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 1000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}



	var text = "le 26 Juin 2013, à 00:40";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 26, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 0, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 40, 'Test Result - (Minute) ' + JSON.stringify(result.start) )

		ok(result.text == '26 Juin 2013, à 00:40', result.text )
	}

  var text = "à 11h15 demain";
  var results = chrono.parse(text, new Date(2012,7,10,10));
  ok(results.length == 1, JSON.stringify( results ) )

  var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result) )
    ok(result.text == 'à 11h15 demain', JSON.stringify(result) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour == 11, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute == 15, 'Test Result - (Minute) ' + JSON.stringify(result.start) )
    ok(result.start.second == 0, 'Test Result - (Second) ' + JSON.stringify(result.start) )
  }

  var text = "Chrono version 1.1";
  var results = chrono.parse(text, new Date(2012,7,10));
  ok(results.length == 0, JSON.stringify( results ) )

});

test('FR Test - Timezone', function() {

  var expected = "Thu Aug 29 2013 18:43:10 GMT+0900 (JST)";
  var text = "Jeudi, 29 Août 2013, 09:43:10 GMT";

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));

  var expected = 'Thu Aug 29 2013 18:24:03 GMT+0900 (JST)';
  var text = 'Jeudi, 29 Août 2013, 05:24:03 EDT'; //(GMT -4)

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var expected = 'Thu Aug 29 2013 18:54:48 GMT+0900 (JST)';
  var text = 'Jeudi, 29 Août 2013, 04:54:48 EST';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var expected = 'Fri Dec 20 2013 06:30:00 GMT+0900 (JST)';
  var text = 'Jeudi 19 Décembre 2013 16:30:00 GMT-0500 (EST)';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));

  var expected = 'Fri Dec 20 2013 06:30:00 GMT+0900 (JST)';
  var text = 'Jeudi 19 Décembre 2013 16:30:00 -0500 (EST)';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var expected = 'Fri Dec 20 2013 06:30:00 GMT+0900 (JST)';
  var text = 'Jeudi 19 Décembre 2013 16:30:00 -0500';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));

  var expected = 'Thu Dec 19 2013 20:30:00 GMT+0900 (JST)';
  var text = 'Jeudi 19 Décembre 2013 16:30:00 +0500';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var expected = 'Thu Dec 19 2013 20:30:00 GMT+0900 (JST)';
  var text = 'Jeudi 19 Décembre 2013 16:30:00 +05:00';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var expected = 'Thu Aug 29 2013 18:54:48 GMT+0900 (JST)';
  var text = 'Jeudi 29 Août 2013, 04:54:48 EST';

  var results = chrono.parse(text);
  ok(results.length == 1, JSON.stringify( results ) )
  ok(results[0].text == text, results[0].text);
  ok(results[0].start.date().getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));
  ok(results[0].start.date(540).getTime() == new Date(expected).getTime(),
    results[0].start.date() +' != '+ new Date(expected));


  var text = "It's 29 Août 2013, 06h22 in New York"; //GMT -5
  var results = chrono.parse(text, new Date());
  var resultDate = results[0].start.date(240);

  var expected = 'Thu Aug 29 2013 19:22:00 GMT+0900 (JST)';
  ok(resultDate.getTime() == new Date(expected).getTime(),
    resultDate +' != '+ new Date(expected));


  var text = "It's 29 Août 2013, 06h22 in Local";
  var results = chrono.parse(text, new Date());
  var resultDate = results[0].start.date(new Date().getTimezoneOffset());
  var resultDate2 = results[0].start.date();
  ok(resultDate.getTime() == resultDate2.getTime(),
    resultDate +' != '+ resultDate2);

});

test("FR Test - DateOnly", function() {

	var text = "The Deadline est le 23";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 23, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 17, 'Wrong index')
		ok(result.text == 'le 23', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,23,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline est le 32";
	var results = chrono.parse(text, new Date(2012,7,10));
	ok(results.length == 0, JSON.stringify( results ) )

    var text = "Retrouvons-nous sur le 5 rue denfert";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) )


    var text = " €3.20 ";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 0, text);

    var text = " 3.20 €";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 0, JSON.stringify( results ) )

});

//test("Test - Date & Time ago", function() {
//
//	var text = "5 days ago, we did something";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 5, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 0, 'Wrong index')
//		ok(result.text == '5 days ago', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,5,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "10 days ago, we did something";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 31, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 0, 'Wrong index')
//		ok(result.text == '10 days ago', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,6,31,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "5 minutes ago";
//	var results = chrono.parse(text, new Date(2012,7,10,12,14));
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 0, 'Wrong index')
//		ok(result.text == '5 minutes ago', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12,9));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "15 minute ago";
//	var results = chrono.parse(text, new Date(2012,7,10,12,14));
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 0, 'Wrong index')
//		ok(result.text == '15 minute ago', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,11,59));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "   1 hour ago";
//	var results = chrono.parse(text, new Date(2012,7,10,12,14));
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 3, 'Wrong index')
//		ok(result.text == '1 hour ago', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,11,14));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "   12 hours ago";
//	var results = chrono.parse(text, new Date(2012,7,10,12,14));
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 3, 'Wrong index')
//		ok(result.text == '12 hours ago', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,0,14));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "within 12 hours ago";
//	var results = chrono.parse(text, new Date(2012,7,10,12,14));
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 0, 'Wrong index')
//		ok(result.text == 'within 12 hours ago', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,0,14));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//})

//test("Test - Deadline", function() {
//
//	var text = "we have to do something in 5 days.";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 15, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 24, 'Wrong index')
//		ok(result.text == 'in 5 days', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,15,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "we have to do something within 10 day";
//	var results = chrono.parse(text, new Date(2012,7,10));
//
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 20, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 24, 'Wrong index')
//		ok(result.text == 'within 10 day', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,20,12));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "5 minutes ago";
//	var results = chrono.parse(text, new Date(2012,7,10,12,14));
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 0, 'Wrong index')
//		ok(result.text == '5 minutes ago', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12,9));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//	var text = "we have to do something within 15 minute";
//	var results = chrono.parse(text, new Date(2012,7,10,12,14));
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 24, 'Wrong index')
//		ok(result.text == 'within 15 minute', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,12,29));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//
//	var text = "within 1 hour";
//	var results = chrono.parse(text, new Date(2012,7,10,12,14));
//	ok(results.length == 1, JSON.stringify( results ) )
//	var result = results[0];
//	if(result){
//		ok(result.start, JSON.stringify(result.start) )
//		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
//		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
//		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
//
//		ok(result.index == 0, 'Wrong index')
//		ok(result.text == 'within 1 hour', result.text )
//
//		var resultDate = (result.startDate);
//		var expectDate = (new Date(2012,7,10,13,14));
//		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
//	}
//
//})


test("FR Test - General", function() {

	var text = "The Deadline is Aujourd'hui";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == "Aujourd'hui", result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,10,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Demain";
	var results = chrono.parse(text, new Date(2012,7,10,12));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == 'Demain', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,11,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}

	var text = "The Deadline is Demain à 12h30";
	var results = chrono.parse(text, new Date(2013,5,26,0,40));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 26, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour == 12, 'Test Result - (Hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute == 30, 'Test Result - (Minute) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == 'Demain à 12h30', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,5,26,12,30));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "The Deadline is ce soir à 1h30";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day == 11, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		ok(result.start.hour === 1, 'Test Result - (hour) ' + JSON.stringify(result.start) )
		ok(result.start.minute === 30, 'Test Result - (hour) ' + JSON.stringify(result.start) )

		ok(result.index == 16, 'Wrong index')
		ok(result.text == 'ce soir à 1h30', result.text )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,7,11,1,30));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}




	//Time only
	var text = "The Deadline est à 12h";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour === 12, 'Test Result - (hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute === 00, 'Test Result - (hour) ' + JSON.stringify(result.start) )

    ok(result.text == 'à 12h', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2012,7,10,12,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }

	var text = "The Deadline est à 11h00";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour === 11, 'Test Result - (hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute === 00, 'Test Result - (hour) ' + JSON.stringify(result.start) )

    ok(result.text == 'à 11h00', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2012,7,10,11,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }

	var text = "The Deadline is 23h    ";
	var results = chrono.parse(text, new Date(2012,7,10));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 7, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 10, 'Test Result - (Day) ' + JSON.stringify(result.start) )
    ok(result.start.hour === 23, 'Test Result - (hour) ' + JSON.stringify(result.start) )
    ok(result.start.minute === 00, 'Test Result - (hour) ' + JSON.stringify(result.start) )

    ok(result.text == '23h', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2012,7,10,23,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }

	var text = "The Deadline is Mardi en 8";
	var results = chrono.parse(text, new Date(2014,5,19));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

    ok(result.text == 'Mardi en 8', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2014,6,1,12,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }



    var text = "The Deadline is Mardi en 8";
    var results = chrono.parse(text, new Date(2014,5,23));

    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.day == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.text == 'Mardi en 8', result.text )

        var resultDate = (result.startDate);
        var expectDate = (new Date(2014,6,1,12,00));
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "The Deadline is Mardi en 15";
    var results = chrono.parse(text, new Date(2014,5,19));

    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.day == 8, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.text == 'Mardi en 15', result.text )

        var resultDate = (result.startDate);
        var expectDate = (new Date(2014,6,8,12,00));
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }



    var text = "The Deadline is Mardi en 15";
    var results = chrono.parse(text, new Date(2014,5,23));

    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.day == 8, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.text == 'Mardi en 15', result.text )

        var resultDate = (result.startDate);
        var expectDate = (new Date(2014,6,8,12,00));
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

	var text = "The Deadline ce Mardi";
	var results = chrono.parse(text, new Date(2014,5,23));

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
  if(result){
    ok(result.start, JSON.stringify(result.start) )
    ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
    ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
    ok(result.start.day == 24, 'Test Result - (Day) ' + JSON.stringify(result.start) )

    ok(result.text == 'ce Mardi', result.text )

    var resultDate = (result.startDate);
    var expectDate = (new Date(2014,5,24,12,00));
    ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
  }

    var text = "The Deadline ce Mardi";
    var results = chrono.parse(text, new Date(2014,5,25));

    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.day == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.text == 'ce Mardi', result.text )

        var resultDate = (result.startDate);
        var expectDate = (new Date(2014,6,1,12,00));
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "The Deadline Mardi prochain";
    var results = chrono.parse(text, new Date(2014,5,25));

    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.day == 1, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.text == 'Mardi prochain', result.text )

        var resultDate = (result.startDate);
        var expectDate = (new Date(2014,6,1,12,00));
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }

    var text = "The Deadline Mardi prochain";
    var results = chrono.parse(text, new Date(2014,5,23));

    ok(results.length == 1, JSON.stringify( results ) )

    var result = results[0];
    if(result){
        ok(result.start, JSON.stringify(result.start) )
        ok(result.start.year == 2014, 'Test Result - (Year) ' + JSON.stringify(result.start) )
        ok(result.start.month == 5, 'Test Result - (Month) ' + JSON.stringify(result.start) )
        ok(result.start.day == 24, 'Test Result - (Day) ' + JSON.stringify(result.start) )

        ok(result.text == 'Mardi prochain', result.text )

        var resultDate = (result.startDate);
        var expectDate = (new Date(2014,5,24,12,00));
        ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
    }
});

test("FR Test - General2", function() {

  var text = "Mercredi 3 Juillet 2013 14h";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)


  var text = " 18h";
  var result = chrono.parse(text)[0];
  ok(result.text == text.substr(1), result.text);


  var text = "meganoon";
  var result = chrono.parse(text);
  ok(result.length == 0, result)

  var text = "megamidi";
  var result = chrono.parse(text);
  ok(result.length == 0, result)

  var text = "à midi";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "à 12h";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)
  ok(result.start.hour == 12, JSON.stringify(result.start))
  ok(result.start.hour == 12, JSON.stringify(result.start))

  var text = "à minuit";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)

  var text = "ce soir";
  var result = chrono.parse(text, new Date(2012, 1, 1))[0];
  ok(result.text == text, result.text)
  ok(result.start.hour == 0, result.text)
  ok(result.start.year == 2012, result.text)
  ok(result.start.month == 1, result.text)
  ok(result.start.day == 2, result.text)

  var text = "ce soir à 20h";
  var result = chrono.parse(text, new Date(2012, 1, 1))[0];
  ok(result.text == text, result.text)
  ok(result.start.hour  == 20, result.text)
  ok(result.start.year  == 2012, result.text)
  ok(result.start.month == 1, result.text)
  ok(result.start.day   == 1, result.text)
  ok(result.start.meridiem   == 'pm', result.text)

  var text = "Jeudi";
  var result = chrono.parse(text)[0];
  ok(result.text == text, result.text)
  ok(result.start.dayOfWeek == 4, result.text)


  var text = "le 17";
  var result = chrono.parse(text, new Date(2013,6,10,3,33))[0];
  ok(result.text == text, result.text)
  ok(result.start.month == 6, result.text)
  ok(result.start.day == 17, JSON.stringify(result))

  var text = "le 17";
  var result = chrono.parse(text, new Date(2013,6,18,3,33))[0];
  ok(result.text == text, result.text)
  ok(result.start.month == 7, result.text)
  ok(result.start.day == 17, JSON.stringify(result))

  var text = "confimé pour midi le 17.";
  var result = chrono.parse(text, new Date(2013,6,10,3,33))[0];
  ok(result.text == 'midi le 17', result.text)
  ok(result.start.month == 6, result.text)
  ok(result.start.day == 17, JSON.stringify(result))
  ok(result.start.hour == 12, JSON.stringify(result))
  ok(result.start.impliedComponents.indexOf('hour') < 0, JSON.stringify(result))
  ok(result.start.impliedComponents.indexOf('minute') < 0, JSON.stringify(result))
  ok(result.start.impliedComponents.indexOf('month') >= 0, JSON.stringify(result))


    var text = "confimé pour le 17 dans l'après-midi";
    var result = chrono.parse(text, new Date(2013,6,10,3,33))[0];
    ok(result.text == "le 17 dans l'après-midi", result.text)
    ok(result.start.month == 6, result.text)
    ok(result.start.day == 17, JSON.stringify(result))
    ok(result.start.hour == 14, JSON.stringify(result))
    ok(result.start.impliedComponents.indexOf('hour') < 0, JSON.stringify(result))
    ok(result.start.impliedComponents.indexOf('minute') < 0, JSON.stringify(result))
    ok(result.start.impliedComponents.indexOf('month') >= 0, JSON.stringify(result))

    var text = "confimé pour le 17 le matin";
    var result = chrono.parse(text, new Date(2013,6,10,3,33))[0];
    ok(result.text == "le 17 le matin", result.text)
    ok(result.start.month == 6, result.text)
    ok(result.start.day == 17, JSON.stringify(result))
    ok(result.start.hour == 9, JSON.stringify(result))
    ok(result.start.impliedComponents.indexOf('hour') < 0, JSON.stringify(result))
    ok(result.start.impliedComponents.indexOf('minute') < 0, JSON.stringify(result))
    ok(result.start.impliedComponents.indexOf('month') >= 0, JSON.stringify(result))


  var text = "Adam <Adam@supercalendar.com> написал(а):\nThe date is 02.07.2013";
  var result = chrono.parse(text, new Date(2013,5,22,3,33))[0];
  ok(result.text == '02.07.2013', result.text)


  var text = "Mardi 25 à 9h";

  var result = chrono.parse(text, new Date(2013,5,22,3,33))[0];
  ok(result.text == text, result.text)
  ok(result.start.hour == 9, JSON.stringify(result))


    var text = "The Deadline is le 32 Juillet";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 0, text )




});
