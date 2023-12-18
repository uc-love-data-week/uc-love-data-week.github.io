$(document).ready(function(){
		console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'document is ready');	
// Assign handlers immediately after making the request,
// and remember the jqxhr object for this request
		var workshops = [];

		$.getJSON( "../feeds/workshops.json", function(data) {
			console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'$.getJSON fired');

			$.each( data.workshops, function( keyYear, val ) {
				
				console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'key= ' + keyYear + '; val= '+val);
				$.each( val, function( key, workshop ) {
					console.log( "Key=" + key + "; title=" + workshop.title + "; type=" + workshop.type + "; description=" + workshop.description + "; duration=" + workshop.duration + "; recording=" + workshop.recording + "; slides=" + workshop.slides + "; reader=" + workshop.reader  );
				    let speakers = [];
				    let speakers_campus = [];
				    let fullText = [workshop.title, workshop.type, workshop.description, workshop.duration, keyYear.slice(5,)];
/**/
					$.each( workshop.speakers, function( key, val ) {
				    	console.log("key=" + key + " speaker name: " +val.name + " speaker org: " +val.org);
				    	fullText.push([val.name+' '+val.org]);
				    	speakers.push(
					    		{
									speaker: val.name,
									organization: val.org
								}
				    		);
				    	
				    });
				    console.log('stringify? '+JSON.stringify(workshop));

				    workshops.push(
							{
								fullText: fullText.join(' ').toLowerCase(),
								title: workshop.title,
								type: workshop.type,
								description: workshop.description, 
								duration: workshop.duration,
								year: keyYear.slice(5,),
								recording: workshop.recording, 
								slides: workshop.slides, 
								reader: workshop.reader, 
								speakers: speakers
							}

				    	);
//				    console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'workshops []' + workshops);/**/
			    });
			    

				
			});

				var input = "dryad";

	  for (i = 0; i < workshops.length; i++) {
	    let obj = workshops[i];

	    if (obj.fullText.toLowerCase().includes(input)) {
	      console.log(input + " is in search");
	      console.log(obj);
	      console.log(obj.fullText);
	    }
	  }

/*			
			  $.each( data.workshops.year_2021, function( key, val ) {

//			  	val = JSON.parse(val);
			    console.log( "Key=" + key + "; title=" + val.title + "; type=" + val.type + "; description=" + val.description + "; duration=" + val.duration + "; recording=" + val.recording + "; slides=" + val.slides + "; reader=" + val.reader  );

			    var speakers = [];
			    var speakers_campus = [];
			    $.each( val.speakers, function( key, val ) {
			    	console.log("key=" + key + " speaker name: " +val.name + " speaker org: " +val.org);
			    	speakers.push(val.name);
			    	speakers_campus.push(val.org);
			    });
			    console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'speakers []' + speakers);
			    workshops.push([val.title, speakers]);
			    //console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'workshops [] ' + workshops[1]);

			  });*/

//textJ = JSON.parse(data.workshops.year_2021)
//textJ = textJ.workshops.year_2021
//console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'textJ is '+textJ);

//console.log(textJ[Object.keys(textJ)[0]].title)

//			 console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'data.workshops.year_2021 is '+data.workshops.year_2021);

//			 console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'textJ[Object.keys(textJ)[0]].title is '+textJ[Object.keys(textJ)[0]].title);

		}) // end getJSON
		//
		.done(function(data) {
//		/**/console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'.done fired');
		/*console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'data is '+data);
		console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'data.workshops is '+data.workshops);
				      /**/
		

		});// end function(data)




})//end document.READY function



//  is depreciated in current versions
.error(function() {
	console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'error function fired');
})//end error(function)
