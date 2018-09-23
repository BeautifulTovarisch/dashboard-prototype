// Update with your config settings.

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: 'database',
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            useNullAsDefault: true
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: 'database',
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            useNullAsDefault: true
        }
    }
};
