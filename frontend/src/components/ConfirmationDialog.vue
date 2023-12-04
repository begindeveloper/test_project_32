<template>
  <div v-if="show" class="openConfirmationDialog">
    <div class="overlay"></div>
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button @click="confirm" class="bg-green-700 disabled:opacity-50 text-white rounded">Confirm</button>
      <button @click="cancel" class="bg-red-700 disabled:opacity-50 text-white rounded">Cancel</button>
    </div>
  </div>
</template>

// Used this source: https://www.w3schools.com/jsref/met_win_confirm.asp
// and this source: https://www.w3schools.com/JS/tryit.asp?filename=tryjs_confirm
<script>
export default {
  props: {
    show: Boolean,
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    confirm() {
      // Emit an event to notify the parent component that the confirmation is confirmed
      this.$emit('confirmed');
    },
    cancel() {
      // Emit an event to notify the parent component that the confirmation is canceled
      this.$emit('canceled');
    }
  }
};
</script>

<style scoped>
.openConfirmationDialog {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/*.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}*/

.modal-content {
  background-color: rgb(202, 192, 192);
  padding: 20px;
  border-radius: 5px;
}

h2 {
  font-weight: bold;
  margin-bottom: 30px;
}

p{
  text-align: center;
  font-size: 15px;
  margin-bottom: 30px;
}


button {
  font-size: 16px;
  margin-top: 0;
  margin-left: 10px;
  }
</style>
