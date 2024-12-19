# schwab-dashboard-forex

## A simple forex dashboard using the streaming class from schwab-client-js

<figure>
     <img src="forexdashboard.png" alt="Description" width="800">
     <figcaption>schwab-dashboard-react</figcaption>
</figure>

## This dashboard uses pure HTML/CSS and Lightweight-Charts to stream real-time forex data from Schwab and display it in your web browser

### **schwab-client-js** gives you complete access to the Schwab REST API using convenient classes and methods. You can stream real-time market data, create and track orders, and retrieve information about your account as well as retrieve different types of market data.

## Installation

**Software prerequisites: nodejs version 18 or newer.**

```
npm install

or

yarn
```

You'll need to create the `.env` file as described in the schwab-client-js instructions.
If you don't have a working SCHWAB_REFRESH_TOKEN, you can run `schwab-authorize` to create one.
See the schwab-client-js instructions.

## Usage

```
yarn dev

or

npm run dev
```

Running one of those commands should try to open the frontend in your default web browser and launch the
server running nodejs. If you see some kind of `can't connect` message in your web browser,
that's because the frontend couldn't find the server. Try refreshing the page in your web
browser. The dashboard uses SSE (Server-Sent Events) to send the
data from the server to the web browser.

## MIT License

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
