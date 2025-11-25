import { ProcessHttpWithoutExtraCallbacks, ProccesHttpResult, ProcessHttpCallbacks } from './types';

export async function processHttp<TResponse extends object, TSuccess extends object = object>(
	callbacks: ProcessHttpCallbacks<TResponse, TSuccess>
): Promise<ProccesHttpResult<TSuccess>> {
	const result = await callbacks.sendRequest();

	if (!result.success) {
		return { success: false, code: result.payload.code };
	}

	return { success: true, ...(await callbacks.onSuccess(result.response)) };
}

export async function processHttpWithoutExtra<TResponse extends object>(callbacks: ProcessHttpWithoutExtraCallbacks<TResponse>) {
	return processHttp({
		...callbacks,

		onSuccess: async (response) => {
			callbacks.onSuccess(response);
			return {};
		}
	});
}
