<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md10
      >
        <material-card
          color="green"
          title="Add a New Device"
          text="Kindly fill all the required fields"
        >
          <v-form @submit="postUser">
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="name"
                    :rules="[rules.required]"
                    label="Name"
                    class="green-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-switch
                    v-model="switch1"
                    :label="`Safety Engineered?  ${switch1.toString()}`"/>
                </v-flex>

                <v-flex
                  xs12
                  md6
                  text-xs-right
                >
                  <v-btn
                    type="submit"
                    class="mx-0 font-weight-light"
                    color="success"
                  >
                    Submit
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>

          <pre>{{ output }}</pre>
        </material-card>

        <material-card
          color="blue"
          title="Add a New Device"
          text="Devices List">
          <template>
            <v-data-table
              :headers="headers"
              :items="items"
              :loading="true"
              rows-per-page="-1"
              class="elevation-1"
            ><template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading text--darken-3"
                v-text="header.text"
              />
            </template>
              <template
                slot="items"
                slot-scope="{ item }"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.safety }}</td>
                <td>{{ item.date }}</td>
              </template>
            </v-data-table>
          </template>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  //
  data () {
    return {
      switch1: true,
      name: '',
      output: '',
      headers: [
        {
          sortable: false,
          text: 'Name',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Safety Design',
          value: 'safety'
        },
        {
          sortable: false,
          text: 'Created On',
          value: 'date'
        }
      ],
      items: [],
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    postUser (e) {
      e.preventDefault()
      const head = {
        headers: {
          'token': '',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      let currentObj = this
      axios.get('http://192.168.0.7:5500/', {
        name: this.name,
        safety_designed: this.switch1
      },
      head
      )
        .then(function (response) {
          currentObj.output = response.data
        })
        .catch(function (error) {
          currentObj.output = error
        })
    }
  }
}
</script>
