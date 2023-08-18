import { render } from "preact";
import "./index.css";
import { getTidePredictions } from "./api";
import { Options } from "./Options";
import { App } from "./App";

const root = document.getElementById("root");
render(<div>Loading...</div>, root);

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

getTidePredictions({
	begin_date: today,
	end_date: tomorrow,
	datum: "MLLW",
	station: "9442396",
	time_zone: "lst_ldt",
	units: "metric",
	interval: "hilo",
}).then((data) => {
	render(<App data={data} />, root);
});
