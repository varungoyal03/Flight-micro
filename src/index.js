const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { swaggerUi, swaggerDocument } = require("./config/swagger");


const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
