export function generateTimeSlots(
	start: string,
	end: string,
	stepMinutes: number,
): string[] {
	const result: string[] = [];

	const [startH, startM] = start.split(":").map(Number);
	const [endH, endM] = end.split(":").map(Number);

	const current = new Date();
	current.setHours(startH, startM, 0, 0);

	const endTime = new Date();
	endTime.setHours(endH, endM, 0, 0);

	while (current < endTime) {
		const hh = current.getHours().toString().padStart(2, "0");
		const mm = current.getMinutes().toString().padStart(2, "0");
		result.push(`${hh}:${mm}`);
		current.setMinutes(current.getMinutes() + stepMinutes);
	}

	return result;
}
