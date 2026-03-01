const pool = require('../config/config.mysql.js');


async function getCircularChartData(params) {
    try {
        const { press, date } = params;
        const [rows] = await pool.query(`
            SELECT * FROM ${press} 
            WHERE DATE(created_at) = ? 
            ORDER BY created_at ASC`, [date]);

        if (rows.length === 0) {
            console.warn(`No data found for ${press} on ${date}`);
            return {
                status: false,
                message: 'No data found for the specified date and press',
                data: { temp_1: [], temp_2: [], temp_3: [], created_at: [] },
                err: null
            };
        }
        let temp_1 = [];
        let temp_2 = [];
        let temp_3 = [];
        let created_at = [];
        for (const row of rows) {
            temp_1.push(row.temp_1);
            temp_2.push(row.temp_2);
            temp_3.push(row.temp_3);
            let createdAt = new Date(row.created_at);

            created_at.push(createdAt.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
        return {
            data: { temp_1, temp_2, temp_3, created_at },
            status: true,
            message: 'Data fetched successfully',
            err: null
        };
    } catch (error) {
        console.error('Error fetching circular chart data', error);
        throw error;
    }
}

// getCircularChartData({ press: 'tcp01', date: '2026-02-27' }).then(data => {
//     console.log('Sample data for TCP01 on 2026-02-27:', data);
// }).catch(error => {
//     console.error('Error fetching sample data', error);
// });

module.exports = {
    getCircularChartData,
};
