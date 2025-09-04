import { css } from "@emotion/react";
import { ReactNode } from "react";

const styles = {
	infoItem: css`
		background: #f8f9fa;
		padding: 1.5rem;
		border-radius: 12px;
		border: 1px solid #e9ecef;
		transition: all 0.3s ease;

		&:hover {
			background: white;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
			transform: translateY(-2px);
		}
	`,
	infoLabel: css`
		color: #6c757d;
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	`,
	infoValue: css`
		color: #212529;
		font-size: 16px;
		font-weight: 500;
	`,
};

interface Props {
	icon: ReactNode;
	label: ReactNode;
	value: ReactNode;
}

const DetailsInfoItem = ({ icon, label, value }: Props) => {
	return (
		<div css={styles.infoItem}>
			<div css={styles.infoLabel}>
				{icon}
				{label}
			</div>
			<div css={styles.infoValue}>{value}</div>
		</div>
	);
};

export default DetailsInfoItem;
