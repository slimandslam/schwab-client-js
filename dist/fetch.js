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
import logger from "./logger.js";
function isErrorResponse(obj) {
    return (obj &&
        typeof obj === "object" &&
        Array.isArray(obj.errors) &&
        typeof obj.errors[0]?.detail === "string");
}
function isMessageResponse(obj) {
    return obj && typeof obj === "object" && typeof obj.message === "string";
}
async function fetchData(url, args = {}) {
    // Just for logging, let's combine url into args
    const combinedArgs = { ...args, url };
    logger("fetch", "args", "fetch call args: ", combinedArgs);
    try {
        // Construct the fetch options
        const fetchOptions = {
            method: args.type || "GET",
            headers: { ...args.headers },
            ...(args.body
                ? {
                    body: typeof args.body === "string"
                        ? args.body
                        : JSON.stringify(args.body),
                }
                : {}),
        };
        // Perform the fetch call
        const response = await fetch(url, fetchOptions);
        logger("fetch", "raw-response", "raw fetch response", response);
        // Handle non-OK responses
        if (!response.ok) {
            // Get the text version of the response because we can't depend on JSON here
            let rt = await response.text();
            // Check for garbage nothingness that Schwab returns sometimes
            const cleanedString = rt.toString().replace(/\s+/g, "");
            if (rt && cleanedString.length !== 0) {
                // We hope it's a real JSON object now
                rt = JSON.parse(rt);
                if (isErrorResponse(rt)) {
                    if (rt.errors[0]?.detail) {
                        // The "detail" has details about the error
                        rt = rt.errors[0].detail;
                    }
                }
                else if (isMessageResponse(rt)) {
                    // The "message" has details about the error
                    rt = rt.message;
                }
                else {
                    rt = "No details were returned";
                }
            }
            else {
                rt = "no details were returned";
            }
            throw new Error(`Error: ${response.status} - ${response.statusText} - Details: ${rt}`);
        }
        else {
            // Handle the case where nothing is returned but the call is successful (e.g. trades)
            // Why does Schwab put the orderId in the location header?
            // In the case of deleteOrder(), return null.
            const responseText = await response.text();
            if (responseText) {
                const data = JSON.parse(responseText);
                return data;
            }
            else {
                const orderId = response.headers.get("location")?.split("/").pop() || null;
                if (orderId) {
                    const jsonResponse = { orderId: orderId };
                    return jsonResponse;
                }
                else {
                    // Empty response body happens on orderDelete call
                    return null;
                }
            }
        }
    }
    catch (error) {
        console.error("Fetch error:", error.message);
        throw error;
    }
}
export default fetchData;
//# sourceMappingURL=fetch.js.map