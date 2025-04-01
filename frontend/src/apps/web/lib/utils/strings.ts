/**
 * Trim and formats a text making all words or the first word captalized (make the first letter of each word uppercased), except
 * words lesser than 3 characters.
 *
 * @param text the text to have all words captalized
 * @param onlyFirstWord consider only the first word of the text. It's good for normal sentences/paragraphs.
 * @returns
 */
function captalize(text: string = "", onlyFirstWord = true) {
	if (text.length === 0) {
		return "";
	}
	const trimmedText = text.trim();
	const lowerredText = trimmedText.toLowerCase();
	const textWords = lowerredText.split(" ");
	if (onlyFirstWord) {
		const firstWord = textWords[0];
		return `${firstWord.charAt(0).toUpperCase()}${firstWord.slice(1)}`;
	}

	return textWords
		.map((word: string, index: number) => {
			if ((onlyFirstWord && index > 0) || (word.length < 3 && index > 0)) {
				return word;
			}
			return word[0].toUpperCase() + word.slice(1);
		})
		.join(" ");
}

export { captalize };
