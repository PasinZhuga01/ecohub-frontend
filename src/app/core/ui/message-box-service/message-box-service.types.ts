export interface MessageBoxMessageConfig {
	header: string;
	description: string;
	onConfirm?: () => void;
	onCancel?: () => void;
}
