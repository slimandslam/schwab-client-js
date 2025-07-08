/**
 * @function fetchData
 * @author Jason Levitt
 * @description General purpose fetch routine for making REST API calls.
 * It uses the built-in NodeJS fetch() (node version 18 and newer).
 * @param {string} url - The full URL including any parameters
 * @param {Object} args - Optional configuration structure
 * @param {string} [args.type] -  The REST verb e.g. "GET"
 * @param {Object} [args.headers] - A set of HTTP header key/value pairs
 * @param {Object} [args.body] - A set of key/value paris
 * @returns {Promise<Object>} A promise that resolves to a JSON object
 */
interface RequestArgs {
    type?: string;
    headers?: Record<string, string>;
    body?: Record<string, unknown> | string;
}
declare function fetchData<T>(url: string, args?: RequestArgs): Promise<T | Record<string, unknown> | null>;
export default fetchData;
//# sourceMappingURL=fetch.d.ts.map