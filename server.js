const express = require("express");
const winston = require('winston');

const app = express();
const port = process.env.PORT || 3040;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const add = (n1, n2) => {
    return n1 + n2;
}

const subtract = (n1, n2) => {
    return n1 - n2;
}

const multiply = (n1, n2) => {
    return n1 * n2;
}

const divide = (n1, n2) => {
    if (n2 === 0) {
        throw new Error("Division by zero");
    }
    return n1 / n2;
}

// Request logging middleware
app.use((req, res, next) => {
    logger.info(`Incoming request - Method: ${req.method}, URL: ${req.url}, IP: ${req.ip}`);
    next();
});

// Addition endpoint
app.get("/add", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1) || isNaN(n2)) {
            throw new Error("Invalid numbers provided");
        }

        logger.info(`Parameters ${n1} and ${n2} received for addition`);
        const result = add(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ statuscode: 400, msg: error.message });
    }
});

// Subtraction endpoint
app.get("/subtract", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1) || isNaN(n2)) {
            throw new Error("Invalid numbers provided");
        }

        logger.info(`Parameters ${n1} and ${n2} received for subtraction`);
        const result = subtract(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ statuscode: 400, msg: error.message });
    }
});

// Multiplication endpoint
app.get("/multiply", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1) || isNaN(n2)) {
            throw new Error("Invalid numbers provided");
        }

        logger.info(`Parameters ${n1} and ${n2} received for multiplication`);
        const result = multiply(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ statuscode: 400, msg: error.message });
    }
});

// Division endpoint
app.get("/divide", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1) || isNaN(n2)) {
            throw new Error("Invalid numbers provided");
        }

        logger.info(`Parameters ${n1} and ${n2} received for division`);
        const result = divide(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ statuscode: 400, msg: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ statuscode: 500, msg: "Internal server error" });
});

app.listen(port, () => {
    console.log(`Microservice listening on port ${port}`);
});
