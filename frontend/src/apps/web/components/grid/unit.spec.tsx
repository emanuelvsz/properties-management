import { render, screen } from "@testing-library/react";

import Grid from ".";

describe("Grid", () => {
	it("should render Grid without additional props", async () => {
		render(<Grid />);

		const grid = await screen.findByTestId("grid");

		expect(grid).not.toBeNull();
		expect(grid?.style.gridTemplateColumns).toBe("1fr");
	});

	it("should render with multiple cols", async () => {
		render(<Grid cols={[1, 2, 3]} />);

		const grid = await screen.findByTestId("grid");

		expect(grid).not.toBeNull();
		expect(grid?.style.gridTemplateColumns).toBe("1fr 2fr 3fr");
	});

	it("should render with text as children", async () => {
		const content = "Test";

		render(<Grid>{content}</Grid>);

		const grid = await screen.findByTestId("grid");
		expect(grid).not.toBeNull();
		expect(grid?.style.gridTemplateColumns).toBe("1fr");
		expect(grid?.textContent).toBe(content);
	});

	it("should render with className filled", async () => {
		const gridClass = "my-grid";

		render(<Grid className={gridClass} />);

		const grid = await screen.findByTestId("grid");
		expect(grid).not.toBeNull();
		expect(grid?.className).not.toBeNull();
		expect(grid?.className).toBe(gridClass);
		expect(grid?.style.gridTemplateColumns).toBe("1fr");
	});

	it("should render with all props filled", async () => {
		const gridClass = "my-grid";
		const content = "Test";

		render(
			<Grid cols={[1, 2]} className={gridClass}>
				{content}
			</Grid>
		);

		const grid = await screen.findByTestId("grid");

		expect(grid).not.toBeNull();
		expect(grid?.className).not.toBeNull();
		expect(grid?.className).toContain(gridClass);
		expect(grid?.style.gridTemplateColumns).toBe("1fr 2fr");
		expect(grid?.textContent).toBe(content);
	});
});
