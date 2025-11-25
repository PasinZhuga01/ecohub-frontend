export type MessageBoxType = 'error' | 'confirm';

export interface MessageBoxMessageConfig {
	type: MessageBoxType;
	text: string;
	onConfirm?: () => void;
	onCancel?: () => void;
}
