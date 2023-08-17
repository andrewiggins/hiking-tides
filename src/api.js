const apiHost = "https://api.tidesandcurrents.noaa.gov";
// const appId = "andrewiggins.github.io/hiking-tides";
const appId = "NOS.COOPS.TAC.TidePred";

/** @type {(date: Date) => string} */
function formatDate(date) {
	const monthNum = date.getMonth() + 1;
	const month = monthNum < 10 ? `0${monthNum}` : monthNum;

	const dayNum = date.getDate();
	const day = dayNum < 10 ? `0${dayNum}` : dayNum;

	return `${date.getFullYear()}${month}${day}`;
}

/** @returns {Promise<StationsResponse>} */
export function getStations() {
	return fetch(
		`${apiHost}/mdapi/prod/webapi/stations.json?type=tidepredictions`
	).then((response) => response.json());
}

/**
 * Docs: https://api.tidesandcurrents.noaa.gov/api/prod/
 * @param {TidePredictionsOptions} options
 * @returns {Promise<TidePredictionsResponse>}
 */
export function getTidePredictions(options) {
	/** @type {TidePredictionsRequest} */
	const request = {
		...options,
		begin_date: formatDate(options.begin_date),
		end_date: formatDate(options.end_date),
		application: appId,
		product: "predictions",
		format: "json",
	};

	const url = new URL(apiHost);
	url.pathname = "/api/prod/datagetter";
	url.search = new URLSearchParams(/** @type {any}*/ (request)).toString();

	return fetch(url).then((response) => response.json());
}
