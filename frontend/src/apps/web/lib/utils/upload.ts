import { RcFile } from "antd/es/upload";

import {
	CSV_MIME_TYPE,
	FileType,
	PDF_MIME_TYPE,
	ValidDocumentExtensions,
	ValidSpreadsheetsExtensions,
	XLSX_MIME_TYPE,
	XLS_MIME_TYPE
} from "../types/upload";

const DOCUMENT_EXT_NAMES: Record<ValidDocumentExtensions, string> = {
	[PDF_MIME_TYPE]: "PDF",
	[XLSX_MIME_TYPE]: "XLSX",
	[XLS_MIME_TYPE]: "XLS",
	[CSV_MIME_TYPE]: "CSV"
};
const SPREADSHEET_EXTS: Record<ValidSpreadsheetsExtensions, string> = {
	[XLSX_MIME_TYPE]: "XLSX",
	[XLS_MIME_TYPE]: "XLS",
	[CSV_MIME_TYPE]: "CSV"
};
export const VALID_SPREADSHEET_EXT_NAMES = Object.values(SPREADSHEET_EXTS);
export const VALID_IMAGE_EXT = ["png", "jpeg", "jpg"];
export const VALID_DOCUMENT_EXT = Object.keys(DOCUMENT_EXT_NAMES);
export const VALID_SPREADSHEET_EXT = Object.keys(SPREADSHEET_EXTS);
const VALID_FILE_EXT_PER_TYPE: Record<FileType, string[]> = {
	image: VALID_IMAGE_EXT,
	document: VALID_DOCUMENT_EXT,
	spreadsheet: VALID_SPREADSHEET_EXT
};

export const getFileTypeVerification = (file: RcFile, type: FileType) => {
	const mimeType = file.type;
	const fileType = mimeType.split("/")[1];
	if (!VALID_FILE_EXT_PER_TYPE[type].includes(fileType)) {
		return false;
	}
	return true;
};
