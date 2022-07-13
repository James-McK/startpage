// Name displayed in greeting
let username = "James";

let searchQuery = "";

const search_engines = [
	{
		name: "DuckDuckGo",
		src: "ddg.svg",
		term: "ddg",
		url: "https://www.duckduckgo.com/",
		q: "?q=",
	},
	{
		name: "Google",
		src: "goog.svg",
		term: "g",
		url: "https://www.google.com/",
		q: "search?q=",
	},
	{
		name: "Reddit",
		src: "reddit.svg",
		term: "r",
		url: "https://www.reddit.com/",
		q: "search?q=",
	},
	{
		name: "YouTube",
		src: "youtube.svg",
		term: "yt",
		url: "https://www.youtube.com/",
		q: "results?q=",
	},
	{
		name: "Arch Wiki",
		src: "arch.svg",
		term: "arch",
		url: "https://wiki.archlinux.org/",
		q: "index.php?search=",
	},
	{
		name: "Arch Packages",
		src: "arch.svg",
		term: "pkg",
		url: "https://archlinux.org/packages/",
		q: "?q=",
	},
	{
		name: "AUR",
		src: "arch.svg",
		term: "aur",
		url: "https://aur.archlinux.org/packages",
		q: "?K=awesome",
	},
	{
		name: "GitHub",
		src: undefined,
		term: "gh",
		url: "https://github.com/",
		q: "search?q=",
	},
];

async function main() {
	// Add event listeners
	window.addEventListener("load", onPageLoad);
	get("goBtn").addEventListener("click", check_if_search_empty);
	get("search").addEventListener("input", onTextChanged);
	get("search").addEventListener("keydown", ({ key }) => {
		if (key === "Enter") get("goBtn").click();
	});
	setInterval(updateTime, 1000);
}

/**
 * Display the correct greeting based on the current time of day, and display the current time
 */
function onPageLoad() {
	updateTime();
	determineGreet(new Date().getHours());
	get("search").focus();
}

async function onTextChanged(event) {
	let value = event.target.value;

	if (value) {
		let engine = checkForSearchModifier(value);

		if (value.startsWith(engine.term))
			value = value.substring(engine.term.length);
		value = value.trim();

		get("se_icon").src = "icons/" + engine.src;
		get("search").name = "Searching with " + engine.name;

		if (value) searchQuery = engine.url + engine.q + value;
		else searchQuery = engine.url;

		get("goBtn").href = searchQuery;
	} else {
		searchQuery = "";
		get("goBtn").removeAttribute("href");
		get("se_icon").src = "./icons/search.svg";
	}
}

function checkForSearchModifier(search) {
	for (let engine of search_engines) {
		if (search.startsWith(engine.term + " ") || search === engine.term) {
			return engine;
		}
	}
	// If no match, use the default engine
	let dfEngine = {
		...search_engines.filter((engine) => engine.name === "DuckDuckGo")[0],
	};
	dfEngine.src = "search.svg";
	return dfEngine;
}

/**
 * Do not allow searching if the user clicks "GO" when the search box is empty
 */
function check_if_search_empty(event) {
	if (document.forms["search_eng_form"]["q"].value == "") {
		event.preventDefault();
	}
}

/**
 * Called every 1000ms to update the time and display it
 */
function updateTime() {
	let today = new Date();
	let time = today.toLocaleTimeString(["en-GB"], {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Europe/Belfast",
	});
	get("time").innerHTML = time;
}

/**
 * Display the correct greeting based on the given time of day
 */
function determineGreet(hours) {
	get("greeting").innerText = `Good ${hours < 12 ? "Morning," : hours < 18 ? "Afternoon," : "Evening,"} ${username}!`;
}

/**
 * Get the element with the given ID
 */
function get(id) {
	return document.getElementById(id);
}

// Run the main function
main().catch(console.error);
