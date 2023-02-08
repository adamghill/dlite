// import Dlite from "//unpkg.com/dlite";
import Dlite, { fetcher } from "../../src/index.js";

const template = await fetcher("components/ajax-get.js.html");

const components = Dlite(
  [
    {
      tagName: "ajax-get",
      template: template,
    },
    {
      el: "#template-shadow",
      template: template,
    },
    {
      el: "#template-no-shadow",
      template: template,
      shadowDOM: false,
    },
    {
      el: "#in-place-template",
    },
  ],
  {
    debug: true,
    shadowDOM: true,
    data: { activity: {} },
    async created() {
      const url = "https://www.boredapi.com/api/activity";
      const activity = await fetcher(url);
      this.data.activity = activity;
    },
  }
);

console.log("components", components);
