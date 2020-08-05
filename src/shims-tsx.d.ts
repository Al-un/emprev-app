import Vue, { VNode } from 'vue'

declare global {
  // -- Disabled as it conflict with JSX typing brought by Storybook.
  // namespace JSX {
  //   // tslint:disable no-empty-interface
  //   interface Element extends VNode {}
  //   // tslint:disable no-empty-interface
  //   interface ElementClass extends Vue {}
  //   interface IntrinsicElements {
  //     [elem: string]: any;
  //   }
  // }
}
