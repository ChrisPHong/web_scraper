const PORT = 3000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.theguardian.com/us";
const response = axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];
    $(".dcr-1pscgow", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({ title, url });
    });

    console.log(articles, "<<<<<<< articles");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
