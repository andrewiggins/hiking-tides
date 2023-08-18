import { Options } from "./Options";

export function App({ data }) {
	return (
		<>
			<Options />
			{JSON.stringify(data)}
		</>
	);
}
