import { signal } from "@preact/signals";

/**
 * @typedef {import('@preact/signals').Signal<T>} Signal<T>
 * @template T
 */

/** @type {{ [key in keyof TidePredictionsOptions]: Signal<TidePredictionsOptions[key]> }} */
export const currentOptions = {
	station: signal("9442396"),
	begin_date: signal(new Date()),
	end_date: signal(new Date()),
	units: signal("english"),
	time_zone: signal("lst_ldt"),
	datum: signal("MLLW"),
	interval: signal("hilo"),
};

export function Options() {
	return (
		<div>
			<h2>Options</h2>
			<div>
				<label>
					Station:{" "}
					<select
						onChange={(e) =>
							(currentOptions.station.value = e.currentTarget.value)
						}
					>
						<option value="9442396">Some station</option>
					</select>
				</label>
			</div>
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
			<h2>Advanced Options</h2>
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
		</div>
	);
}
