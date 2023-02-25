// import Dlite, { fetcher } from "//unpkg.com/dlite";
import Dlite, { fetcher } from "../../src/index.js";

const template = await fetcher("components/ajax-get/ajax-get.js.html");

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const componentConfigurations = [
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
];

const components = Dlite(componentConfigurations, {
  getPrice() {
    if (this.data.activity.price == 0) {
      return "Free!";
    } else if (!this.data.activity.price) {
      return "";
    }

    return formatter.format(this.data.activity.price);
  },
  debug: true,
  shadowDOM: true,
  data: { activity: {} },
  async created() {
    const activity = await fetcher("https://www.boredapi.com/api/activity");

    // Simulate network latency
    setTimeout(() => {
      this.data.activity = activity;
    }, 500);
  },
});

console.log("components", components);
