const express = require("express");
const downloadInstagramVideo = require("./Api"); // Import your download function
const app = express();
const port = 3000; // Choose the port you want to run your API on

// Middleware to parse JSON requests
app.use(express.json());

// Define a route for downloading Instagram videos
app.post("/Api", async (req, res) => {
  try {
    const videoUrl = req.body.url; // Assuming you send the URL in the request body
    if (!videoUrl) {
      return res.status(400).json({ error: "Missing 'url' in request body" });
    }

    // Call the downloadInstagramVideo function to get the download link
    const downloadLink = await downloadInstagramVideo(videoUrl);

    if (!downloadLink) {
      return res.status(404).json({ error: "Video not found or unable to download" });
    }

    // Return the download link in the response
    res.status(200).json({ downloadLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
