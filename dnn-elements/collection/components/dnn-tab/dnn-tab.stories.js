import { html } from "lit-html";
import { ifDefined } from 'lit-html/directives/if-defined';
import readme from './readme.md';
export default {
  title: 'Elements/Tab',
  component: 'dnn-tab',
  parameters: {
    notes: readme,
  },
  argTypes: {
    'tab-title': {
      control: 'text',
    },
  }
};
const Template = (args) => html `
        <dnn-tab
            tab-title=${ifDefined(args.tabTitle)}>
        </dnn-tab>
    `;
export const Tab = Template.bind({});
Tab.args = {
  tabTitle: 'My Tab',
};
//# sourceMappingURL=dnn-tab.stories.js.map