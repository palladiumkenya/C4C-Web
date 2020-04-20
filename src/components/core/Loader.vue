<template>
    <v-card
    width="400"
    center
    >
    <v-card-text>
          Please wait ...
          <v-progress-linear
            indeterminate
            color="green"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
</template>

<script>
export default {
  name: "loader",
 
};
</script>

<style scoped>
.v-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>