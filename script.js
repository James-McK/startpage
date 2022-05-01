// Name displayed in greeting
let username = "James";
// Counter that is incremented when the search engines are cycled through
let se = 3;

async function main() {
	// Display the correct greeting based on the current time of day, and display the current time
	window.addEventListener("load", (event) => {
		let today = new Date();
		let time = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

		determineGreet(new Date().getHours());
		displayTime(time);
	});

	document.getElementById("go_btn").addEventListener("click", function (event) {
		check_if_search_empty(event);
	});
}

/**
 * Listens for click event in se_button, once clicked, se increments by one and cycleSearchEngines() is called to update the icon, placeholder, and form action
 */
document.getElementById("se_button").addEventListener("click", function () {
	se++;
	cycleSearchEngines(se);
});

/**
 * Do not allow searching if the user clicks "GO" when the search box is empty
 */
function check_if_search_empty(event) {
	if (document.forms["search_eng_form"]["q"].value == "") {
		event.preventDefault();
	}
}

// Called every 1000ms to update the time and display it
setInterval(function () {
	let today = new Date();
	let time = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	document.getElementById("time").innerHTML = time;
}, 1000);

function displayTime(time) {
	document.getElementById("time").innerHTML = time;
}

const determineGreet = (hours) => (document.getElementById("greeting").innerText = `Good ${hours < 12 ? "Morning," : hours < 18 ? "Afternoon," : "Evening,"} ${username}!`);

const cycleSearchEngines = (se) => {
	const curData = search_engines[(se + 1) % search_engines.length];

	document.getElementById("se_icon").src = "icons/" + curData.src;
	document.getElementById("search").placeholder = "Searching with " + curData.placeholder;
	document.getElementById("search_eng_form").action = curData.action;
};

const search_engines = [
	{
		src: "ddg.svg",
		placeholder: "DuckDuckGo",
		action: "https://www.duckduckgo.com/",
	},
	{
		src: "goog.svg",
		placeholder: "Google",
		action: "https://www.google.com/search?q=",
	},
	{
		src: "reddit.svg",
		placeholder: "Reddit",
		action: "https://www.reddit.com/search?q=",
	},
	{
		src: "youtube.svg",
		placeholder: "YouTube",
		action: "https://www.youtube.com/results?q=",
	},
];

// Run the main function
main().catch(console.error);
