const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  // 1. Копирование статических файлов
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/documents");

  // 2. Копирование библиотеки Swiper
  eleventyConfig.addPassthroughCopy({
    "node_modules/swiper/swiper-bundle.min.css":
      "css/vendor/swiper-bundle.min.css",
    "node_modules/swiper/swiper-bundle.min.js":
      "js/vendor/swiper-bundle.min.js",
  });

  // 3. ОБЪЕДИНЯЕМ данные об услугах из двух источников
  eleventyConfig.addGlobalData("allServices", () => {
    // Читаем базовый services.json
    const servicesPath = path.join(__dirname, "src/_data/services.json");
    let baseServices = [];
    if (fs.existsSync(servicesPath)) {
      baseServices = JSON.parse(fs.readFileSync(servicesPath, "utf8"));
    }

    // Читаем детальный контент из папки service-content
    const contentDir = path.join(__dirname, "src/_data/service-content");
    const contentFiles = fs.existsSync(contentDir)
      ? fs.readdirSync(contentDir).filter((f) => f.endsWith(".json"))
      : [];

    const contentMap = {};
    contentFiles.forEach((file) => {
      const data = JSON.parse(
        fs.readFileSync(path.join(contentDir, file), "utf8"),
      );
      contentMap[data.id] = data;
    });

    // Объединяем: базовые данные + детальный контент
    return baseServices.map((service) => ({
      ...service,
      ...(contentMap[service.id] || {}),
    }));
  });

  // 4. Настройки директорий
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.IS_GH_PAGES ? "/norma-32/" : "/",
  };
};
