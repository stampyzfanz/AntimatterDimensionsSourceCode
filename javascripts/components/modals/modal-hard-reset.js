import PrimaryButton from "@/components/PrimaryButton";
import ModalCloseButton from "@/components/modals/ModalCloseButton";

Vue.component("modal-hard-reset", {
  components: {
    PrimaryButton,
    ModalCloseButton,
  },
  computed: {
    modal() {
      return this.$viewModel.modal.current;
    },
    willHardReset() {
      return this.input === "Shrek is love, Shrek is life";
    },
  },
  data() {
    return {
      input: "",
    };
  },
  methods: {
    cancelReset() {
      safeCall(this.modal.callback);
      this.emitClose();
    },
    hardReset() {
      if (!this.willHardReset) return;
      this.emitClose();
      GameStorage.hardReset();

    },
  },
  template:
    `<div class="c-modal-message l-modal-content--centered">
      <ModalCloseButton @click="cancelReset" />
      <h3>HARD RESET</h3>
      <div class="c-modal-message__text">
        Please confirm your desire to hard reset this save slot.
        <span class="c-modal-hard-reset-danger">This is irreversible and you will get no benefit.</span>
        Type in "Shrek is love, Shrek is life" to confirm.
        <div class="c-modal-hard-reset-danger">THIS WILL WIPE YOUR SAVE.</div>
      </div>
      <input
        v-model="input"
        ref="input"
        type="text"
        class="c-modal-input c-modal-hard-reset__input"
        @keyup.esc="cancelReset"
      />
      <div class="c-modal-hard-reset-info">
        <div
          v-if="willHardReset"
          class="c-modal-hard-reset-danger"
        >
          You do not get anything from hard resetting your save.
        </div>
        <div v-else>Type in the correct code to hard reset.</div>
      </div>
      <PrimaryButton
        v-if="!willHardReset"
        class="o-primary-btn--width-medium c-modal-hard-reset-btn"
        @click="cancelReset"
      >
        Cancel
      </PrimaryButton>
      <PrimaryButton
        v-else
        class="o-primary-btn--width-medium c-modal-hard-reset-btn c-modal__confirm-btn"
        @click="hardReset"
      >
        HARD RESET
      </PrimaryButton>
    </div>`
});
