import Switch from ".";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Switch",
  component: Switch,
};

export const Primary = () => <Switch id="switch" />;
export const LeftLabel = () => <Switch id="switch" label="Label" />;
export const TopLabel = () => (
  <Switch id="switch" label="Label" labelPostion="top" />
);
