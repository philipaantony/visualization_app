const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const MyData = require("./model/mydata");
const mongodbUrl = process.env.MONGODB_URL;
const mongoAtlas = process.env.MONGO_ATLAS_URL;

mongoose
    .connect(mongoAtlas)
    .then(() => { console.log("Connected to MongoDB"); })
    .catch((error) => { console.error("Error connecting to MongoDB:", error); });

const getminmaxpestle = require("./controllers/get-min-max-pestle")

app.use('/api/getminpestle', getminmaxpestle);


//------------------------------------------------------
app.get("/api/getmydata", async (req, res) => {
    try {

        const data = await MyData.find();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//------------------------------------------------------------------------

// Assuming you have already required mongoose and defined MyData schema and model

app.get("/api/filterdata", async (req, res) => {
    try {
        const {
            end_year,
            topic,
            sector,
            region,
            pestle,
            source,
            swot,
            country,
            city,
        } = req.query;

        const filter = {};

        if (end_year) filter.end_year = end_year;
        if (topic) filter.topic = topic;
        if (sector) filter.sector = sector;
        if (region) filter.region = region;
        if (pestle) filter.pestle = pestle;
        if (source) filter.source = source;
        if (swot) filter.swot = swot;
        if (country) filter.country = country;
        if (city) filter.city = city;

        const data = await MyData.find(filter);

        // Calculate average likelihood and average intensity
        const totalLikelihood = data.reduce((sum, item) => sum + item.likelihood, 0);
        const totalIntensity = data.reduce((sum, item) => sum + item.intensity, 0);
        const relevance = data.reduce((sum, item) => sum + item.relevance, 0);
        const avgLikelihood = data.length > 0 ? totalLikelihood / data.length : 0;
        const avgIntensity = data.length > 0 ? totalIntensity / data.length : 0;
        console.log(relevance, avgLikelihood, avgIntensity)
        res.json({ relevance, avgLikelihood, avgIntensity });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




//------------------------------------------------------------------------
app.get('/api/avgMetricsBySector', async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: "$sector",
                    avgIntensity: { $avg: "$intensity" },
                    avgLikelihood: { $avg: "$likelihood" },
                    avgRelevance: { $avg: "$relevance" },
                },
            },
        ];

        const result = await MyData.aggregate(pipeline);
        res.json(result);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//------------------------------------------------------------------

app.get('/api/distinctTopicsWithCount', async (req, res) => {
    try {
        const distinctTopicsWithCount = await MyData.aggregate([
            {
                $match: {
                    sector: { $ne: "" } // Exclude documents where 'sector' is an empty string
                }
            },
            {
                $group: {
                    _id: '$sector',
                    count: { $sum: 1 },
                },
            },
        ]);

        res.json(distinctTopicsWithCount);
    } catch (error) {
        console.error('Error fetching distinct topics with count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.get('/api/allEndYearsWithCount', async (req, res) => {
    try {
        const endYearsWithCountAndAvg = await MyData.aggregate([
            {
                $match: {
                    end_year: { $ne: '' }, // Filter out documents with an empty end_year
                },
            },
            {
                $group: {
                    _id: '$end_year',
                    count: { $sum: 1 },
                    avgLikelihood: { $avg: '$likelihood' },
                },
            },
        ]);

        res.json(endYearsWithCountAndAvg);
    } catch (error) {
        console.error('Error fetching end years with count and average likelihood:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});









app.get("/api/getmydata/count", async (req, res) => {
    try {
        // Get the count of all documents
        const totalDocs = await MyData.countDocuments();

        // Get the distinct countries and their count
        const countriesWithCount = await MyData.aggregate([
            { $group: { _id: '$country', count: { $sum: 1 } } },
            { $project: { _id: 0, country: '$_id', count: 1 } }
        ]);

        const totalCountries = countriesWithCount.length;

        res.json({ totalDocs, totalCountries, countries: countriesWithCount });
    } catch (error) {
        console.error("Error fetching count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//-----------------------------------------------------

app.listen(5000, () => {
    console.log("server running on port 5000");
});


//-----------------------------------------------------

app.get("/api/barGraphData", async (req, res) => {
    try {
        // Fetch data from MongoDB based on your criteria, for example, get data grouped by sector and calculate the average intensity
        const barGraphData = await MyData.aggregate([
            {
                $group: {
                    _id: "$sector",
                    averageIntensity: { $avg: "$intensity" }
                }
            }
        ]);

        res.json(barGraphData);
    } catch (error) {
        console.error("Error fetching bar graph data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//working
app.get("/api/pieChartData", async (req, res) => {
    try {
        // Fetch data from MongoDB based on your criteria, for example, get data grouped by region
        const pieChartData = await MyData.aggregate([
            { $group: { _id: "$region", count: { $sum: 1 } } }
        ]);

        res.json(pieChartData);
    } catch (error) {
        console.error("Error fetching pie chart data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/api/lineChartData", async (req, res) => {
    try {
        // Fetch data from MongoDB based on your criteria, for example, get data with year-wise intensity
        const lineChartData = await MyData.aggregate([
            { $group: { _id: "$start_year", averageIntensity: { $avg: "$intensity" } } }
        ]);

        res.json(lineChartData);
    } catch (error) {
        console.error("Error fetching line chart data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





