const attempts = new Map<string, { count: number; firstAttempt: Date }>();
const MAX = 5;
// const WINDOW_MS = 60 * 60 * 1000; // 1h
const WINDOW_MS = 1;

export function recordInvalidOtp(key: string) {
	const entry = attempts.get(key) || { count: 0, firstAttempt: new Date() };
	if (Date.now() - entry.firstAttempt.getTime() > WINDOW_MS) {
		entry.count = 0;
		entry.firstAttempt = new Date();
	}
	entry.count++;
	attempts.set(key, entry);
	return entry.count;
}

export function canTryOtp(key: string): boolean {
	const entry = attempts.get(key);
	if (!entry) return true;
	if (Date.now() - entry.firstAttempt.getTime() > WINDOW_MS) {
		attempts.delete(key);
		return true;
	}
	return entry.count < MAX;
}
