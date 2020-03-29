<template>
<v-container grid-list-lg>
  <v-layout row wrap>
      <v-flex xs10>
    <template>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        :src="result.file"
      >
      </v-img>

      <v-card-title>{{result.title}}</v-card-title>

      <v-card-text class="text--primary">
        <div>{{result.created_at}}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange"
          @click="$router.push('view_resource')"
          text
        >
          View More
        </v-btn>

      </v-card-actions>
    </v-card>
    </template>
  </v-flex> 
  </v-layout>
 </v-container>
</template>  