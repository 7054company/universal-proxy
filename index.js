const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow all origins
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Universal proxy
app.all('*', (req, res) => {
    try {
        // Try to decode the full path after "/"
        const rawPath = req.originalUrl.slice(1); // remove leading "/"
        const decodedUrl = decodeURIComponent(rawPath);

        // Ensure it's a valid target (must start with http or https)
        if (!decodedUrl.startsWith('http://') && !decodedUrl.startsWith('https://')) {
            return res.status(400).send('Invalid target URL. Must start with http:// or https://');
        }

        // Prepare options for request
        const options = {
            url: decodedUrl,
            method: req.method,
            headers: {
                ...req.headers,
                host: new URL(decodedUrl).host
            },
            body: req.body,
            json: true
        };

        // Stream request
        request(options)
            .on('error', err => {
                console.error('Proxy Error:', err.message);
                res.status(500).send('Proxy error: ' + err.message);
            })
            .pipe(res);

    } catch (err) {
        console.error('Error:', err.message);
        res.status(400).send('Failed to parse URL');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Universal proxy running at http://localhost:${PORT}`);
});
