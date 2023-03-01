import Input from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Input",
  component: Input,
};

export const Primary = () => <Input label="Label" />;
export const LabelTop = () => <Input label="Label" labelPostion="top" />;
export const LabelRight = () => <Input label="Label" labelPostion="right" />;
