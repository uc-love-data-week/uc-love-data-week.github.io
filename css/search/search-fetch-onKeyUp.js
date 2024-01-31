/*****
 *  the basic flow of this is
 *   - once the webpage is fully loaded (`document.addEventListener('DOMContentLoaded', () => {`)
 *   - fetch the json file
 *   - then parse it into a javascript object
 *   - which is then added to a window variable (`window.myFetchedData`), which is just waiting . . . 
 *   - meanwhile...
 *   - in the search.html file, when someone releases a keyboard key in the search box (onKeyUp)
 *   - the function `search_workshops` will be called 
 *   - it will check to make sure `window.myFetchedData` exists and has a value and if it does then . . . 
 *   - it checks the search box input against the fulltext 
 *   - and if there's a match will update html elements based on id
 * 
 *   - on the search.html page, the form has (onsubmit="search_workshops(); return false;")
 *      which allows the user to press enter and click the search button, but the 
 *      search will remain based on the content in the text field.
 *      the page is not reloaded. everything is interactive client-side.
 * 
 * *******/
document.addEventListener('DOMContentLoaded', () => {
	fetch('../feeds/workshops.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
//			console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'fetchData fired');
	        return response.json();
	    })
	    .then(data => {
//	    	const parsedData = JSON.parse(JSON.stringify(data)); // Here, you parse the JSON
	    	/*****
	    	 * if only it were as easy as the above stringify function, but it isn't, because it stringifies everything, such as "title:"
	    	 * which isn't necessarily needed; 
	    	 * so, the below nested for loops flatten the json file into a javascript object with the following structure
	    	 * 	{
	    	 * 		fullText: // this is what the main search will check against. most everything else right now is to make it easier to format html
			 * 		title: 
			 * 		type: 
			 * 		description: 
			 * 		duration: 
			 * 		year: // taken from the year_NNNN values
			 * 		recording: 
			 * 		slides: 
			 * 		reader: 
			 * 		speakers: 
			 * 	}
	    	 * ******/
	    	var workshops = [];
			for (const key in data) {
				if (Object.prototype.hasOwnProperty.call(data, key)) {
					var years = data[key];
/**/
					for (const keyYear in years) {
						if (Object.prototype.hasOwnProperty.call(years, keyYear)) {
							var yearsWorkshops = years[keyYear];

							for (const keyWorkshop in yearsWorkshops) {
								if (Object.prototype.hasOwnProperty.call(yearsWorkshops, keyWorkshop)) {
									var workshop = yearsWorkshops[keyWorkshop];
								    let speakers = [];
								    let fullText = [workshop.title, workshop.type, workshop.description, workshop.duration, keyYear.slice(5,)];									

								    // get speakers list
								    for (const keySpeaker in workshop.speakers) {
								    	if (Object.prototype.hasOwnProperty.call(yearsWorkshops, keyWorkshop)) {
								    		var speaker = workshop.speakers[keySpeaker];
								    		fullText.push([speaker.name+' '+speaker.org]);								    		
								    		speakers.push(
								    		{
								    			name: speaker.name,
								    			organization: speaker.org
								    		});
								    	}// endif speakers
								    }// endfor speakers

//								    console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'workshop full text ' + fullText);
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
								    	); // end workshops.push
								} // endif keyWorkshop
							}// endfor keyWorksohp
						}// endif years
					}/**/ //endfor keyyear
				}// endif key
			}// endfor data
//	    	console.log('workshop javascript object:', workshops);

	    	window.myFetchedData = workshops;
	    })
	    .catch(error => {
	    	console.error('There was a problem with the fetch operation:', error);
	    });
});


function search_workshops() {
	if(window.myFetchedData){
		workshops = window.myFetchedData;
		let input = document.getElementById('searchIn').value;
		input = input.toLowerCase();
		let workshopHTMLList = document.querySelector('#list-holder');
		workshopHTMLList.innerHTML = ""
	//	var input = "dryad";
		for (i = 0; i < workshops.length; i++) {
			let obj = workshops[i];
			if (obj.fullText.toLowerCase().includes(input)) {
				const elem = document.createElement("li");

				// logic for displaying possibly null valued variables and speakers
				const recording = obj.recording ? `<a href = "${obj.recording}" target="_blank">Recording</a>` : "No recording available";
				const slides = obj.slides ? `<a href = "${obj.slides}" target="_blank">Slides</a>` : "No slides available";
				const reader = obj.reader ? ` -- <a href = "${obj.reader}" target="_blank">Reader</a>` : "";

				let speakers = []

				for (const speakerKey in obj.speakers) {
					speaker = obj.speakers[speakerKey];
//					console.log(consoleSayings[Math.floor((Math.random() * consoleSayings.length) )]+'speakers: '+speaker.name + speaker.organization);
					speakers.push(speaker.name)
				}
				speakers = speakers.join(" - ");
					

				// write the html
				elem.innerHTML = `<strong>${obj.title}</strong> <i>(${obj.year})</i><br>
									${speakers}<br>
									${recording} -- ${slides} ${reader} <br><br>
									${obj.description}<br><br>

				`;
				workshopHTMLList.appendChild(elem); 
				let h2Header = document.querySelector('#kh2');
				h2Header.innerHTML = "Search Results";
//				console.log(input + " is in search");
//				console.log(obj);
//				console.log(obj.fullText);/**/
			}
		}
	}  else {
		console.error('Data not yet fetched or processed');
	}
};
