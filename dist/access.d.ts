/**
 * @function fetchToken
 * @author Jason Levitt
 * @description Dedicated routine for refreshing the Schwab access token
 * @param {Credentials} creds - Access credentials necessary to generate a token
 * @returns {Promise<TokenResponse>} A promise that resolves to a JSON object containing the token data
 */
interface Credentials {
  appKey: string;
  appSecret: string;
  appRefresh: string;
  access_token: string;
  access_exp: number;
}
declare function fetchToken(
  creds: Credentials,
): Promise<Record<string, unknown>>;
export default fetchToken;
//# sourceMappingURL=access.d.ts.map
