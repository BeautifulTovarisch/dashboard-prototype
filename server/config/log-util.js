'use strict';

const { format, transports, createLogger } = require( 'winston' );

const {
    json,
    label,
    align,
    printf,
    combine,
    colorize,
    timestamp,
    prettyPrint
} = format;

const levels = {
    severity: {
        error: 0,
        info: 1
    },
    colors: {
        error: 'read',
        info: 'blue'
    }
};

const logger = createLogger({
    levels: levels.severity,
    format: combine(
        label({ label: "PM-DASHBOARD" })
    ),
    transports: [
        new transports.File({
            level: 'error',
            filename: 'error.log',
            format: combine(
                timestamp(),
                json()
            )
        }),
        new transports.File({
            level: 'info',
            filename: 'general.log',
            format: combine(
                json()
            )
        })
    ]
});

if( process.env.NODE_ENV !== 'production' ) {
    logger.add( new transports.Console({
        level: 'info',
        format: combine(
            colorize(),
            align(),
            printf( m => `[${m.level}]: ${m.message || m}`)
        )
    }) );

}

module.exports = logger;
