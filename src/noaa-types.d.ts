interface StationsResponse {
	count: number;
	unit: unknown;
	stations: Station[];
}

interface Station {
	state: string;
	tidepredoffsets: {
		self: string;
	};
	type: string;
	timemeridian: number;
	reference_id: string;
	timezonecorr: number;
	id: string;
	name: string;
	lat: number;
	lng: number;
	affiliations: string;
	portscode: string;
	products: unknown;
	disclaimers: unknown;
	notices: unknown;
	self: unknown;
	expand: unknown;
	tideType: string;
}

interface TidePredictionsRequest {
	/** Default: predictions */
	product: "predictions";
	begin_date: string;
	end_date: string;
	/** Default: MLLW */
	datum:
		| "CRD"
		| "IGLD"
		| "LWD"
		| "MHHW"
		| "MHW"
		| "MTL"
		| "MSL"
		| "MLW"
		| "MLLW"
		| "NAVD"
		| "STND";
	station: Station["id"];
	/** Default: lst_ldt */
	time_zone: "gmt" | "lst" | "lst_ldt";
	/** Default: english */
	units: "english" | "metric";
	/**
	 * h = hourly
	 * hilo = high/low times and heights
	 * # = tide predictions on intervals of # minutes
	 *
	 * Different products except different data here
	 */
	interval: "h" | "hilo" | "1" | "5" | "6" | "10" | "15" | "30" | "60";
	format: "json" | "csv" | "xml";
	application: string;
}

interface TidePredictionsOptions
	extends Omit<
		TidePredictionsRequest,
		"application" | "product" | "begin_date" | "end_date" | "format"
	> {
	begin_date: Date;
	end_date: Date;
}

interface TidePredictionsResponse {
	predictions: Array<{
		/** Date & time of prediction */
		t: string;
		/** Height of tide in requested unit */
		v: string;
		/** Type of tide (H = high, L = low, undefined = height at time) */
		type: "H" | "L" | undefined;
	}>;
}

interface ErrorResponse {
	error: {
		message: string;
	};
}
