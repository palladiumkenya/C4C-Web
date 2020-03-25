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
          <v-form @submit="AddDevice">
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
                <td>{{ Boolean(item.safety_designed) }}</td>
                <td>{{ item.created_at }}</td>
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
          value: 'safety_designed'
        },
        {
          sortable: false,
          text: 'Created On',
          value: 'created_at'
        }
      ],
      items: [],
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  created (){
    this.DeviceList()
  },
  methods: {
    DeviceList () {
      axios.get('devices/all/')
      .then((exp) => {
        this.items = exp.data.data
      })
      .catch(error => console.log(error.message));
    },
    AddDevice (e) {
      e.preventDefault()
      let currentObj = this
      axios.get('devices/all/', {
        name: this.name,
        safety_designed: this.switch1
      })
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
