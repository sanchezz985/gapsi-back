const app = require("../app/app");
const port = 9085;

// starting server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});