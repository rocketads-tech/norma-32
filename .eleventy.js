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

  // 3. Настройки директорий
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
  };
};;
