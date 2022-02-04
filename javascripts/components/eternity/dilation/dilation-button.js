Vue.component("dilation-button", {
  data() {
    return {
      isUnlocked: false,
      isRunning: false,
      hasGain: false,
      requiredForGain: new Decimal(0),
      canEternity: false,
      eternityGoal: new Decimal(0),
      tachyonGain: new Decimal(0),
      isDoomed: false
    };
  },
  methods: {
    update() {
      this.isUnlocked = PlayerProgress.dilationUnlocked();
      this.isRunning = player.dilation.active;
      this.isDoomed = Pelle.isDoomed && Pelle.cel.remnants < 3.8e7;
      if (!this.isRunning) return;
      this.canEternity = Player.canEternity;
      this.hasGain = getTachyonGain().gt(0);
      if (this.canEternity && this.hasGain) {
        this.tachyonGain.copyFrom(getTachyonGain());
      } else if (this.hasGain) {
        this.eternityGoal.copyFrom(Player.eternityGoal);
      } else {
        this.requiredForGain.copyFrom(getTachyonReq());
      }
    }
  },
  template: `
    <button
      class="o-dilation-btn"
      :class="isUnlocked ? 'o-dilation-btn--unlocked' : 'o-dilation-btn--locked'"
      onclick="startDilatedEternityRequest()"
    >
      <span v-if="!isUnlocked">Purchase the Dilation Study to unlock.</span>
      <span v-else-if="!isRunning">Dilate time. 
        <span v-if="isDoomed"><br><br>Requires {{ format(3.8e7, 2) }} Remnants</span>
      </span>
      <span v-else-if="canEternity && hasGain">
        Disable Dilation.
        <br>
        Gain {{ quantify("Tachyon Particle", tachyonGain, 2, 1) }}.
      </span>
      <span v-else-if="hasGain">
        Disable Dilation.
        <br>
        Reach {{ quantify("Infinity Point", eternityGoal, 1, 0) }} to Eternity and gain Tachyon Particles.
      </span>
      <span v-else>
        Disable Dilation.
        <br>
        Reach {{ format(requiredForGain, 2, 1) }} antimatter to gain more Tachyon Particles.
      </span>
    </button>`
});
