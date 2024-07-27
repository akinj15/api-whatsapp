import {createLogger, transports, format } from "winston";

// Criar o logger personalizado
export const logger = createLogger({
    level: "debug",
    format: format.simple(),
    transports: [
        new transports.File({
            filename: "logs/main.log",
        }),
    ]
});
