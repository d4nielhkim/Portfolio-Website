import jiti from "jiti";
const load = jiti(import.meta.url, { esmResolve: true, interopDefault: true });
load("./index.jsx");
