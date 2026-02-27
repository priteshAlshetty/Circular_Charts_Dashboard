const pool = require('../config/config.mysql.js');

async function createSchema() {
    try {
        const arr = Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, '0'));
        for (const i of arr) {

            const createTableQuery = `
            DROP TABLE IF EXISTS TCP${i};
            CREATE TABLE IF NOT EXISTS TCP${i} (        
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                temp_1 FLOAT NOT NULL,
                temp_2 FLOAT NOT NULL,
                temp_3 FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )ENGINE=InnoDB;
        `;
            const [result] = await pool.query(createTableQuery);
            if (result.warningStatus === 0) {
                console.log(`Table TCP${i} created successfully`);
            } else {
                console.warn(`Table TCP${i} already exists or there was a warning during creation`);

            }
        }

    } catch (error) {
        console.error('Error creating schema', error);
    } finally {
        await pool.end();
    }
}

createSchema().then(() => {
    console.log('Schema creation process completed');
}).catch((error) => {
    console.error('Error in schema creation process', error);
});

//RUN ONCE TO CREATE SCHEMA
// node .\datamodels\create_schema.js