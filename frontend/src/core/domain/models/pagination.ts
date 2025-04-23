import { Model } from "./model";

const pagesSeparator = "-";
const pageSimblingsCount = 1;
const pageSectionCount = 3;
const lastVisiblePagesCount = 2;

class Pagination<T extends Model> {
	#page: number;
	#pageSize: number;
	#count: number;
	#total: number;
	#items: T[];

	constructor(page: number, pageSize: number, count: number, total: number, items: T[]) {
		this.#page = page;
		this.#pageSize = pageSize;
		this.#count = count;
		this.#total = total;
		this.#items = items;
	}

	static empty<T extends Model>(): Pagination<T> {
		return new Pagination<T>(1, 10, 0, 0, []);
	}

	get page(): number {
		return this.#page;
	}

	get pageSize(): number {
		return this.#pageSize;
	}

	get count(): number {
		return this.#count;
	}

	get total(): number {
		return this.#total;
	}

	get items(): T[] {
		return this.#items;
	}

	get maxPageCount(): number {
		return Math.ceil(this.total / this.pageSize);
	}

	get visiblePages() {
		const availablePageList = Array.from(
			{ length: this.maxPageCount },
			(_, i) => i
		);

		if (this.maxPageCount < 7) {
			return availablePageList;
		}

		const currSectionStart =
			this.page > 0 ? this.page - pageSimblingsCount : this.page;

		const currSectionEnd = Math.min(
			currSectionStart + pageSectionCount,
			this.maxPageCount
		);

		const lastItems = availablePageList.slice(-lastVisiblePagesCount);

		const currPageIsOneMoreFarThanSimbling =
			currSectionStart >= pageSimblingsCount + 1;

		const currPageIsSimblingsFarFromStart =
			currSectionStart === pageSimblingsCount;

		const visiblePages = [
			...new Set([
				...(currPageIsSimblingsFarFromStart ? [0] : []),
				...(currPageIsOneMoreFarThanSimbling ? [0, pagesSeparator] : []),
				...availablePageList.slice(currSectionStart, currSectionEnd)
			])
		];

		for (let i = 0; i < lastItems.length; i += 1) {
			const item = lastItems[i];
			if (visiblePages.includes(item)) {
				lastItems.shift();
				i -= 1;
			}
		}

		const currSectionEndIsOneMoreFarThanSimbling =
			lastItems.length > 0 &&
			lastItems[0] - currSectionEnd >= pageSimblingsCount;

		if (currSectionEndIsOneMoreFarThanSimbling) {
			visiblePages.push(pagesSeparator);
		}

		visiblePages.push(...lastItems);
		return visiblePages;
	}
}

export { Pagination };
