import lume from "https://deno.land/x/lume@v0.15.0/mod.js";

const site = lume();

site.ignore("README.md");

export default site;
