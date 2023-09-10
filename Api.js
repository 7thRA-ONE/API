const axios = require("axios");
const qs = require("qs");
const cheerio = require("cheerio");

const downloadInstagramVideo = async (url) => {
  const apiUrl = "https://saveig.app/api/ajaxSearch";

  const data = {
    q: url,
    t: "media",
    lang: "en",
  };

  const headers = {
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Content-Type": "application/x-www-form-urlencoded",
    Origin: "https://saveig.app",
    Referer: "https://saveig.app/en/instagram-video-downloader",
    "Sec-Ch-Ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Microsoft Edge";v="114"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "set-Gpc": 1,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67",
    "X-Requested-With": "XMLHttpRequest",
  };

  try {
    const response = await axios.post(apiUrl, qs.stringify(data), { headers });
    const x = response.data;
    const y = x.data;
    const $ = cheerio.load(y);

    const filter1 = $(".download-items");
    const maindata = filter1.find(".download-items__btn a").attr("href");

    return maindata;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = downloadInstagramVideo;