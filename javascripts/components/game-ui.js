import "./old-ui/old-ui.js";
import "./new-ui/new-ui.js";
import "./save-timer.js";
import "./help-me.js";
import "./tt-shop.js";
import "./new-ui/sidebar.js";
import TabComponents from "@/components/tabs";
import ModalPopup from "@/components/modals/ModalPopup";

Vue.component("game-ui", {
  components: {
    ...TabComponents,
    ModalPopup,
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    uiLayout() {
      return this.view.newUI ? "new-ui" : "old-ui";
    },
    containerClass() {
      return this.view.newUI ? "new-ui" : "old-ui";
    },
    page() {
      const subtab = Tabs.current[this.$viewModel.subtab];
      const config = subtab.config;
      if (this.view.newUI && config.newUIComponent !== undefined) {
        return config.newUIComponent;
      }
      return config.component;
    },
    themeCss() {
      return `stylesheets/theme-${this.view.theme}.css`;
    }
  },
  template: `
    <div
      v-if="view.initialized"
      id="ui-container"
      :class="containerClass"
      style="display: flex; justify-content: center;"
    >
      <div id="ui" class="c-game-ui">
        <component :is="uiLayout">
          <component :is="page" />
        </component>
        <ModalPopup v-if="view.modal.current" :modal="view.modal.current" />
        <modal-progress-bar v-if="view.modal.progressBar" />
        <link v-if="view.theme !== 'Normal'" type="text/css" rel="stylesheet" :href="themeCss">
        <help-me />
      </div>
      <div id="notification-container" class="l-notification-container" />
      <tt-shop v-if="view.subtab === 'studies'" class="l-time-studies-tab__tt-shop" />
      <sidebar v-if="view.newUI" />
      <save-timer />
    </div>`
});
