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

// TODO: Handle error and output in html (in "debug mode" only? otherwise to the console?)
// TODO: Set `this.data` directly
// TODO: Be able to add keys to `this.data` on the fly

Dlite(
  [
    {
      tagName: "ajax-get",
      template: await fetching("components/ajax-get.js.html"),
    },
    {
      el: "#template-shadow",
      template: await fetching("components/ajax-get.js.html"),
      shadowDOM: true,
    },
    {
      el: "#template-no-shadow",
      template: await fetching("components/ajax-get.js.html"),
      shadowDOM: false,
    },
    {
      el: "#in-place-template",
      shadowDOM: false,
    },
  ],
  {
    data: { activity: {} },
    async created() {
      const url = "https://www.boredapi.com/api/activity";
      const activity = await fetching(url);
      this.data.activity = activity;
    },
  }
);
