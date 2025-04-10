import { FiRsIconProps } from "../props";

export const FiRsChartHistogram = ({
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
		<g clipPath="url(#clip0_44_1257)">
			<path
				d="M1.75 12.8193C1.59529 12.8193 1.44692 12.7579 1.33752 12.6485C1.22812 12.5391 1.16667 12.3907 1.16667 12.236V0H0V12.236C0 12.7001 0.184374 13.1452 0.512563 13.4734C0.840752 13.8016 1.28587 13.986 1.75 13.986H14V12.8193H1.75Z"
				fill={color}
			/>
			<path d="M4.08341 7H2.91675V11.0833H4.08341V7Z" fill={color} />
			<path
				d="M6.99993 5.83325H5.83325V11.0833H6.99993V5.83325Z"
				fill={color}
			/>
			<path d="M9.91667 7.58325H8.75V11.0833H9.91667V7.58325Z" fill={color} />
			<path d="M12.8334 5.25H11.6667V11.0833H12.8334V5.25Z" fill={color} />
			<path
				d="M6.41661 2.57482L9.33327 5.49148L13.829 0.995732L13.0042 0.170898L9.33327 3.84182L6.41661 0.925149L3.08752 4.25423L3.91236 5.07907L6.41661 2.57482Z"
				fill={color}
			/>
		</g>
		<defs>
			<clipPath id="clip0_44_1257">
				<rect width={width} height={height} fill={color} />
			</clipPath>
		</defs>
	</svg>
);
