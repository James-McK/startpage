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

	get("se_button").addEventListener("click", cycleSearchEngines);
	get("go_btn").addEventListener("click", check_if_search_empty);
	setInterval(updateTime, 1000);
}

/**
 * Do not allow searching if the user clicks "GO" when the search box is empty
 */
function check_if_search_empty(event) {
	if (document.forms["search_eng_form"]["q"].value == "") {
		event.preventDefault();
	}
}

// Called every 1000ms to update the time and display it
function updateTime() {
	let today = new Date();
	let time = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	get("time").innerHTML = time;
}

function displayTime(time) {
	get("time").innerHTML = time;
}

function determineGreet(hours) {
	get("greeting").innerText = `Good ${hours < 12 ? "Morning," : hours < 18 ? "Afternoon," : "Evening,"} ${username}!`;
}

/**
 * Listens for click event in se_button, once clicked, se increments by one and cycleSearchEngines() is called to update the icon, placeholder, and form action
 */
function cycleSearchEngines() {
	se++;
	const curData = search_engines[(se + 1) % search_engines.length];

	get("se_icon").src = "icons/" + curData.src;
	get("search").placeholder = "Searching with " + curData.placeholder;
	get("search_eng_form").action = curData.action;
}

function get(id) {
	return document.getElementById(id);
}

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
