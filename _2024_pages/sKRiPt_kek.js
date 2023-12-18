var workshops = [];
$(document).ready(function(){
//		console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'document is ready');	
		

		$.getJSON( "../feeds/workshops.json", function(data) {
//			console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'$.getJSON fired');

			$.each( data.workshops, function( keyYear, val ) {
				
//				console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'key= ' + keyYear + '; val= '+val);
				$.each( val, function( key, workshop ) {
//					console.log( "Key=" + key + "; title=" + workshop.title + "; type=" + workshop.type + "; description=" + workshop.description + "; duration=" + workshop.duration + "; recording=" + workshop.recording + "; slides=" + workshop.slides + "; reader=" + workshop.reader  );
				    let speakers = [];
				    let speakers_campus = [];
				    let fullText = [workshop.title, workshop.type, workshop.description, workshop.duration, keyYear.slice(5,)];
/**/
					$.each( workshop.speakers, function( key, val ) {
//				    	console.log("key=" + key + " speaker name: " +val.name + " speaker org: " +val.org);
				    	fullText.push([val.name+' '+val.org]);
				    	speakers.push(
					    		{
									speaker: val.name,
									organization: val.org
								}
				    		);
				    	
				    });
//				    console.log('stringify? '+JSON.stringify(workshop));

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
		}); // end getJSON


})//end document.READY function


			function search_workshops() {

				let input = document.getElementById('searchin').value;
				input = input.toLowerCase();
				let workshopHTMLList = document.querySelector('#list-holder');
				workshopHTMLList.innerHTML = ""

//				var input = "dryad";
				for (i = 0; i < workshops.length; i++) {
					let obj = workshops[i];
				    if (obj.fullText.toLowerCase().includes(input)) {
				    	const elem = document.createElement("li");
				    	elem.innerHTML = `${obj.fullText}`;
				    	workshopHTMLList.appendChild(elem);
				    	let h2Header = document.querySelector('#kh2');
						h2Header.innerHTML = "Search Results";

/*				      console.log(input + " is in search");
				      console.log(obj);
				      console.log(obj.fullText);/**/
				    }
				}


			};
