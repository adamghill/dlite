// import Dlite from "//unpkg.com/dlite";
import Dlite, { fetcher } from "../../src/index.js";

const template = await fetcher("components/ajax-get/ajax-get.js.html");

let components = [];

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// components = Dlite({
//   el: "#template-shadow",
//   template: template,
//   debug: true,
//   data: { activity: {} },
//   getPrice() {
//     if (this.data.activity.price == 0) {
//       return "Free!";
//     }

//     return formatter.format(this.data.activity.price);
//   },
//   async created() {
//     const url = "https://www.boredapi.com/api/activity";
//     const activity = await fetcher(url);
//     this.data.activity = activity;
//   },
// });

components = Dlite(
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
    getPrice() {
      if (this.data.activity.price == 0) {
        return "Free!";
      }

      return formatter.format(this.data.activity.price);
    },
    debug: true,
    shadowDOM: true,
    data: { activity: {} },
    async created() {
      // const url = "https://www.boredapi.com/api/activity";
      // const activity = await fetcher(url);
      // this.data.activity = activity;

      const activity = await fetcher("https://www.boredapi.com/api/activity");

      setTimeout(() => {
        this.data.activity = activity;
      }, 500);
    },
  }
);

console.log("components", components);
