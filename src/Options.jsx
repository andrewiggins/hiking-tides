import { signal, effect } from "@preact/signals";
import { useState, useEffect } from "preact/hooks";
import { getStations, parseDate } from "./api";

/**
 * @typedef {import('@preact/signals').Signal<T>} Signal<T>
 * @template T
 */

// Read initial values from URL
const searchParams = new URLSearchParams(window.location.search);
const initialStation = searchParams.get("station") ?? "9442396";
const initialBeginDate =
	parseDate(searchParams.get("begin_date")) ?? new Date();
const initialEndDate = parseDate(searchParams.get("end_date")) ?? new Date();
const initialUnit = /** @type {TidePredictionsOptions["units"]} */ (
	searchParams.get("units") ?? "english"
);
const initialTimeZone = /** @type {TidePredictionsOptions["time_zone"]} */ (
	searchParams.get("time_zone") ?? "lst_ldt"
);
const initialDatum = /** @type {TidePredictionsOptions["datum"]} */ (
	searchParams.get("datum") ?? "MLLW"
);
const initialInterval = /** @type {TidePredictionsOptions["interval"]} */ (
	searchParams.get("interval") ?? "hilo"
);

/** @type {{ [key in keyof TidePredictionsOptions]: Signal<TidePredictionsOptions[key]> }} */
export const currentOptions = {
	station: signal(initialStation),
	begin_date: signal(initialBeginDate),
	end_date: signal(initialEndDate),
	units: signal(initialUnit),
	time_zone: signal(initialTimeZone),
	datum: signal(initialDatum),
	interval: signal(initialInterval),
};

function StationSelector() {
	const [stations, setStations] = useState(/** @type {Station[]} */ ([]));
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getStations().then((res) => {
			setStations(res.stations);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <div>Loading stations...</div>;
	}

	return (
		<div>
			<label>
				Station: <input list="stations" onChange={(e) => console.log(e)} />
				<datalist id="stations">
					{stations.map((station) => (
						<option key={station.id} value={station.id}>
							{station.name} ({station.id})
						</option>
					))}
				</datalist>
			</label>
		</div>
	);
}

export function Options() {
	return (
		<div>
			<h2>Options</h2>
			<StationSelector />
			<div>
				<label>
					Begin Date:{" "}
					<input
						type="date"
						onChange={(e) =>
							(currentOptions.begin_date.value = e.currentTarget.valueAsDate)
						}
					/>
				</label>
			</div>
			<div>
				<label>
					End Date:{" "}
					<input
						type="date"
						onChange={(e) =>
							(currentOptions.end_date.value = e.currentTarget.valueAsDate)
						}
					/>
				</label>
			</div>
			<div>
				<label>
					Units:{" "}
					<select
						onChange={(e) =>
							(currentOptions.units.value = /** @type {any} */ (
								e.currentTarget.value
							))
						}
					>
						<option value="english">english</option>
						<option value="metric">metric</option>
					</select>
				</label>
			</div>
			<details>
				<summary>
					<h2>Advanced Options</h2>
				</summary>
				<div>
					<label>
						Time Zone:{" "}
						<select
							onChange={(e) =>
								(currentOptions.time_zone.value = /** @type {any} */ (
									e.currentTarget.value
								))
							}
						>
							<option value="lst_ldt">lst_ldt</option>
							<option value="lst">lst</option>
							<option value="gmt">gmt</option>
						</select>
					</label>
				</div>
				<div>
					<label>
						Datum:{" "}
						<select
							onChange={(e) =>
								(currentOptions.datum.value = /** @type {any} */ (
									e.currentTarget.value
								))
							}
						>
							<option value="CRD">CRD</option>
							<option value="IGLD">IGLD</option>
							<option value="LWD">LWD</option>
							<option value="MHHW">MHHW</option>
							<option value="MHHW">MHW</option>
							<option value="MHHW">MTL</option>
							<option value="MTL">MSL</option>
							<option value="MTL">MLW</option>
							<option value="MLLW">MLLW</option>
							<option value="NAVD">NAVD</option>
							<option value="STND">STND</option>
						</select>
					</label>
				</div>
			</details>
		</div>
	);
}
