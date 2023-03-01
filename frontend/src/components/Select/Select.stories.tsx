import Select from "./index";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Select",
  component: Select,
};

export const Primary = () => (
  <Select
    placeholder="Select"
    label="Label"
    options={[
      { label: "Option1", value: "1" },
      { label: "Option2", value: "2" },
    ]}
  />
);

export const LabelTop = () => (
  <Select
    placeholder="Select"
    label="Label"
    options={[
      { label: "Option1", value: "1" },
      { label: "Option2", value: "2" },
    ]}
    labelPostion="top"
  />
);
