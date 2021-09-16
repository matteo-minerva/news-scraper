module.exports = async (page) => {
	const distance = 100;
	const delay = 100;
	while (
		await page.evaluate(
			() =>
				document.scrollingElement.scrollTop + window.innerHeight <
				document.scrollingElement.scrollHeight
		)
	) {
		await page.evaluate((y) => {
			document.scrollingElement.scrollBy(0, y);
		}, distance);
		await page.waitForTimeout(delay);
	}
};
