# schwab-dashboard-nextjs

## A stock market dashboard using the streaming class from schwab-client-js
## Uses NextJS and Tailwind and reCharts

<figure>
     <img src="public/stockdashboard.png" alt="Description" width="800">
     <figcaption>schwab-dashboard-nextjs</figcaption>
</figure>

## It streams real-time market data from Schwab and displays it in charts in your web browser

### **schwab-client-js** gives you complete access to the Schwab REST API using convenient classes and methods. You can stream real-time market data, create and track orders, and retrieve information about your account as well as retrieve different types of market data.

## Installation

**Software prerequisites: nodejs version 18 or newer and a package manager such as yarn or npm**

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

Those commands will run NextJS and then try to open the frontend in your default web browser. 
The dashboard uses SSE (Server-Sent Events) to send the data from NextJS to the web browser.
You can change the stock ticker symbol by editing the file: ```app/api/market-stream/route.js```

## MIT License

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.






This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
