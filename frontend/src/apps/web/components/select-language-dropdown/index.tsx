import { GlobalOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Dropdown, MenuProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
	useChangeLanguage,
	useLanguages,
	useSelectedLanguage
} from "@web/lib/contexts/i18n/hooks";
import { THEME_COLORS } from "@web/config/theme";

const styles = {
	button: css`
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		border: none;
		font-size: 14px;
		height: fit-content;
		padding: 0px;
		color: ${THEME_COLORS.PRIMARY_COLOR} !important;
	`,
	defaultButton: css`
		&.ant-btn-color-link {
			color: ${THEME_COLORS.PRIMARY_COLOR};
		}
	`,
	iconAndPlaceholder: css`
		font-size: 16px;
	`
};

const SelectLanguageDropdown = () => {
	const selectedLanguage = useSelectedLanguage();
	const changeLanguage = useChangeLanguage();
	const languages = useLanguages();
	const intl = useIntl();

	const [language, setLanguage] = useState<string>("");

	const items: MenuProps["items"] = useMemo(
		() =>
			languages.map((lang) => ({
				key: lang,
				label: (
					<p
						style={{
							paddingBlock: 0,
							margin: 0,
							whiteSpace: "nowrap"
						}}
					>
						<FormattedMessage id={`language.${lang}`} />
					</p>
				)
			})),
		[languages]
	);

	const handleMenuClick: MenuProps["onClick"] = (option: { key: string }) => {
		changeLanguage(option.key);
	};

	useEffect(() => {
		setLanguage(intl.formatMessage({ id: `language.${selectedLanguage}` }));
	}, [intl, selectedLanguage]);

	return (
		<Dropdown
			menu={{
				items,
				onClick: handleMenuClick
			}}
			placement="bottomRight"
			arrow
		>
			<Button size="large" css={styles.button} ghost>
				<GlobalOutlined size={14} css={styles.iconAndPlaceholder} />
				<p css={styles.iconAndPlaceholder}>{language}</p>
			</Button>
		</Dropdown>
	);
};

export default SelectLanguageDropdown;
