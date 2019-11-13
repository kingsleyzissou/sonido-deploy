import { Input, Card, Dropdown, Button, Checkbox } from "../ui/index";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component(Input.name, Input);
    Vue.component(Card.name, Card);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(Button.name, Button);
    Vue.component(Checkbox.name, Checkbox);
  }
};

export default GlobalComponents;
