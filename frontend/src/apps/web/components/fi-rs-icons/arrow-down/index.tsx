import { FiRsIconProps } from "../props";

export const FiRsArrowDown = ({
	color = "currentColor",
	height = 32,
	width = 32
}: FiRsIconProps) => (
	<svg
		width={width}
		height={height}
		viewBox={`0 0 ${height} ${width}`}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clipPath="url(#clip0_11_2771)">
			<path
				d="M28.2761 18.3747L20.6668 10.7654L18.0001 13.4321L10.2668 5.69873L8.37476 7.5774L18.0001 17.2001L20.6668 14.5334L26.3908 20.2667L22.6668 23.9841H30.0001C30.5305 23.9841 31.0392 23.7733 31.4143 23.3983C31.7894 23.0232 32.0001 22.5145 32.0001 21.9841V14.6507L28.2761 18.3747Z"
				fill={color}
			/>
			<path
				d="M2.66667 27.968V0H0V27.968C0 29.0289 0.421427 30.0463 1.17157 30.7964C1.92172 31.5466 2.93913 31.968 4 31.968H32V29.3013H4C3.64638 29.3013 3.30724 29.1609 3.05719 28.9108C2.80714 28.6608 2.66667 28.3216 2.66667 27.968Z"
				fill={color}
			/>
		</g>
		<defs>
			<clipPath id="clip0_11_2771">
				<rect width={width} height={height} fill={color} />
			</clipPath>
		</defs>
	</svg>
);
