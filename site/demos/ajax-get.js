// import Dlite from "//unpkg.com/dlite";
import Dlite from "../../src/index.js";

async function fetching(url) {
  return await fetch(url)
    .then((res) => {
      if (res.status >= 400) {
        throw new Error(`${res.status}: ${res.url}`);
      } else {
        return res;
      }
    })
    .then((res) => {
      if ((res.headers.get("content-type") || "").includes("json")) {
        return res.json();
      }

      return res.text();
    });
}

// async function getUrlTemplate(url) {
//   if (!url.includes(".")) {
//     url = `${url}.js.html`;
//   }

//   return fetching(url);
// }

// TODO: add templateUrl
// TODO: Handle error and output in html (in "debug mode" only? otherwise to the console?)
// TODO: Set `this.data` directly
// TODO: Be able to add keys to `this.data` on the fly
// TODO: handle hidden/display:none on web component

Dlite([
  {
    template: await fetching("components/ajax-get.js.html"),
    tagName: "ajax-get",
    data: { activity: {} },
    // shadowDOM: true,
    async created() {
      const activity = await fetching(this.prop.url);
      this.data.activity = activity;
    },
  },
  {
    template: await fetching("components/ajax-get.js.html"),
    el: "#app",
    data: { activity: {} },
    shadowDOM: true,
    async created() {
      const url = "https://www.boredapi.com/api/activity";
      const activity = await fetching(url);
      this.data.activity = activity;
    },
  },
]);
