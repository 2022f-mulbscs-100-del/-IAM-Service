import logger from '../utils/Logger.js';
export const loggerMiddleware = (req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
};