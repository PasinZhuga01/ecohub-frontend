export type MessageBoxObject<T extends string> = { header: T; description: string; onConfirm?: () => void };
