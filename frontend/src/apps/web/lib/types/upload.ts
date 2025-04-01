export type FileType = "image" | "document" | "spreadsheet";
export type ValidDocumentExtensions =
	| typeof PDF_MIME_TYPE
	| typeof XLSX_MIME_TYPE
	| typeof XLS_MIME_TYPE
	| typeof CSV_MIME_TYPE;
export type ValidSpreadsheetsExtensions =
	| typeof XLSX_MIME_TYPE
	| typeof XLS_MIME_TYPE
	| typeof CSV_MIME_TYPE;

export const PDF_MIME_TYPE = "pdf";
export const XLSX_MIME_TYPE =
	"vnd.openxmlformats-officedocument.spreadsheetml.sheet";
export const XLS_MIME_TYPE = "vnd.ms-excel";
export const CSV_MIME_TYPE = "csv";
