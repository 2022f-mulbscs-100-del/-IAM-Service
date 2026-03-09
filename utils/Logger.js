import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                winston.format.printf(({ timestamp, level, message, ...meta }) => {
                    return Object.keys(meta).length
                        ? `[${timestamp}] [${level}]: ${message} ${JSON.stringify(meta)}`
                        : `[${timestamp}] [${level}]: ${message}`;
                })
            ),
        }),
    ],
});

export default logger;