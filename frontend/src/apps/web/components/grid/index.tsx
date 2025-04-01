import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

interface Props {
	className?: string;
	cols?: number[];
}

const styles = {
	grid: css`
		display: grid;
		gap: 1rem;

		& + *[display="grid"] {
			margin-top: 1rem;
		}

		@media (max-width: 720px) {
			grid-template-columns: 1fr !important;
		}
	`
};

const Grid = ({
	children,
	className,
	cols = [1]
}: PropsWithChildren<Props>): JSX.Element => (
	<div
		css={[styles.grid]}
		className={className}
		style={{ gridTemplateColumns: cols.map((col) => `${col}fr`).join(" ") }}
		data-testid="grid"
	>
		{children}
	</div>
);

export default Grid;
