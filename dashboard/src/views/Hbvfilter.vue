<template>
  <div>
    <button @click="click">Filter</button>
  </div>
</template>

<script>
import { EventBus } from "../event-bus.js";

export default {
  methods: {
    click() {
      EventBus.$emit("btn-clicked", {
        newData: [2, 1, 400, 50]
      });
    }
  }
};
</script>

<style></style>
