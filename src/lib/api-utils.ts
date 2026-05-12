/**
 * Utility to unwrap backend responses that might be wrapped in a 'data' property
 * or formatted by .NET's PreserveReferences handling ($values).
 */
export const unwrap = <T>(payload: any): T => {
    if (!payload || typeof payload !== 'object') return payload as T;

    let result = payload;

    // 1. If it's the raw axios response
    if ('status' in result && 'data' in result && 'config' in result) {
        result = result.data;
    }

    // 2. Handle $values (for .NET PreserveReferences)
    if (result && typeof result === 'object') {
        if ('$values' in result) {
            return result.$values as T;
        }

        // 3. Handle explicit wrappers like { success: true, data: ... }
        if ('data' in result && ('success' in result || 'message' in result || 'statusCode' in result)) {
            const wrappedData = result.data;
            if (wrappedData && typeof wrappedData === 'object' && '$values' in wrappedData) {
                return (wrappedData as any).$values as T;
            }
            return wrappedData as T;
        }
    }

    return result as T;
};
