/**
 * @function initenv
 * @author Jason Levitt
 * @description Loads the .env file once
 */
import dotenv from "dotenv";
import debug from "debug";
dotenv.config();
if (process.env.DEBUG) {
    debug.enable(process.env.DEBUG);
}
//# sourceMappingURL=initenv.js.map