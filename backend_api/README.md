<h1>📊 Circular Chart Backend API</h1>

<p>A lightweight Node.js + Express backend that fetches data from MySQL tables and returns processed datasets for generating circular chart visualizations on the frontend.</p>

<h3>1. Features </h3>
Built with Node.js + Express

Uses MySQL connection pooling for high-performance queries

Clean controller/service architecture

API returns formatted arrays ready for circular charts

Supports date-wise filtering

Easy integration with React, Angular, Vue, or any charting library


<h3>2. Project Structure</h3>

```bash
project-root/
controllers/
chart.controller.js
services/
chart.service.js
db/
mysql.js
routes/
chart.routes.js
app.js
package.json
README.md
```
<h3>3. Installation</h3>

i. Clone the repository:
``` bash
git clone https://github.com/your-repo/circular-chart-backend.git
```
ii. go to root directory
``` bash
cd circular-chart-backend
```

iii. Install dependencies:

``` bash
npm install
```


<h3>4. MySQL Table Format</h3>
create a DB named as per db.config.js
Your MySQL table (example: tcp02) should contain:

```bash
--------------------------------------------------
| Column     | Type      | Description           |
|------------|-----------|-----------------------|
| temp_1     | FLOAT     | Temperature sensor 1  |
| temp_2     | FLOAT     | Temperature sensor 2  |
| temp_3     | FLOAT     | Temperature sensor 3  |
| created_at | DATETIME  | Timestamp of reading  |
--------------------------------------------------
```

<h3>5. Start the Server</h3>

```bash
npm run start
```
```bash
Server URL: http://localhost:3000
```

API Endpoint
``` bash
POST: http://localhost:3000/get/circularchart

Request Body (JSON)

{
"press": "tcp02",
"date": "2026-02-28"
}

Request Parameters

press → MySQL table name
date → Date filter (YYYY-MM-DD)

Example Success Response

{
"data": {
"temp_1": [...],
"temp_2": [...],
"temp_3": [...],
"created_at": [...]
},
"status": true,
"message": "Data fetched successfully",
"err": null
}

Meaning:
temp_1[] → temperature values
temp_2[] → temperature values
temp_3[] → temperature values
created_at[] → timestamps
```
<h3>  6. How It Works</h3>

Client sends press (table) + date.

Backend executes SQL:
SELECT * FROM <press> WHERE DATE(created_at) = '<date>' ORDER BY created_at ASC;

Rows are mapped into arrays:
temp_1, temp_2, temp_3, created_at

Response is returned as chart-ready JSON.

Example Frontend Fetch Code
``` bash
fetch("http://localhost:3000/get/circularchart
", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
press: "tcp02",
date: "2026-02-28"
})
})
.then(res => res.json())
.then(data => {
console.log(data.data.temp_1);
});
```
Testing in Postman
```bash
Method: POST
URL: http://localhost:3000/get/circularchart

Body → Raw → JSON →
{
"press": "tcp02",
"date": "2026-02-28"
}

Error Response Example

{
"status": false,
"message": "Something went wrong",
"err": "SQL error message"
}
```

** Author

Pritesh Alshetty
Node.js • MySQL • SCADA • OPC UA • Industrial Automation Integrations **