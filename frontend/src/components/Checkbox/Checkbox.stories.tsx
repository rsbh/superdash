import Checkbox from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Checkbox",
  component: Checkbox,
};

export const Primary = () => <Checkbox />;
export const LabelLeft = () => <Checkbox label="Label" />;
export const LabelTop = () => <Checkbox label="Label" labelPosition="top" />;
export const LabelRight = () => (
  <Checkbox label="Label" labelPosition="right" />
);
