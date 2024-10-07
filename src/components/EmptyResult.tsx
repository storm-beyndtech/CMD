import emptyResultIcon from "../assets/Empty.svg";

export default function EmptyResult() {
	return (
		<div className="min-h-80 bg-white grid place-content-center border border-gray-100 p-4 rounded-[14px]">
			<div className="grid gap-2.5 text-center">
				<img src={emptyResultIcon} alt="empty result" className="mx-auto"/>
				<p className="font-semibold text-gray-700">No Lab Results</p>
				<p className="text-xs text-gray-400">Lab result not uploaded yet</p>
			</div>
		</div>
	);
}
