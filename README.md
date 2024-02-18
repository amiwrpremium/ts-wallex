# ts-wallex

## Description

ts-wallex is an SDK designed to simplify interactions with the Wallex.ir cryptocurrency exchange API. It utilizes Axios, a promise-based HTTP client for Node.js and browsers, to facilitate seamless communication with the API endpoints.

## Installation

You can install ts-wallex via npm:

```bash
npm install ts-wallex
```

## Usage

Here's how you can use ts-wallex in your project:

```typescript
import { Client } from "ts-wallex";

// Create a new instance of the Wallex client
const client = new Client();

// Example: Get list of available currencies
async function getOrderbook() {
    try {
        const usdttmn = await client.fetchOrderBook("USDTTMN")();
        console.log(usdttmn);
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

getOrderbook();
```

## Documentation

You can find the full documentation for the Wallex API [here](https://api-docs.wallex.ir).

For detailed documentation on available methods and their usage, refer to the [Library documentation](https://amiwrpremium.github.io/ts-wallex/).

## License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
