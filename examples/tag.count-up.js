import Dlite from "../src/index.js";

const template = `
Counting: {this.count} 
`;

export default Dlite({
  template,
  tagName: "count-up",
  data: {
    count: 0,
  },
  created() {
    this.data.count = this.prop.start || 0;

    setInterval((_) => {
      this.data.count++;
    }, 1000);
  },
});
