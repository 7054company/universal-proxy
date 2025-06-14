const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('/:protocol(http|https)/*', (req, res) => {
    try {
        const protocol = req.params.protocol;
        const hostAndPath = req.params[0]; // everything after /http/ or /https/
        const fullUrl = `${protocol}://${hostAndPath}`;

        // Prepare options
        const options = {
            url: fullUrl,
            method: req.method,
            headers: {
                ...req.headers,
                host: new URL(fullUrl).host
            },
            body: req.body,
            json: true
        };

        // Proxy request
        request(options)
            .on('error', err => {
                console.error('Proxy Error:', err.message);
                res.status(500).send('Proxy error: ' + err.message);
            })
            .pipe(res);

    } catch (err) {
        console.error('URL Parsing Error:', err.message);
        res.status(400).send('Invalid proxy request format');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Modified proxy running at http://localhost:${PORT}`);
});
