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
        md11
      >
        <material-card>
          <v-card-text>
            <div/>
            <p class="display-1 text--primary">
              Add A New Admin
            </p>
            <div class="text--primary">
              Kindly fill all the required fields
            </div>
          </v-card-text>
          <v-form @submit="AddDevice">
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md4
                >
                  <v-combobox
                    v-model="facility_id"
                    :rules="[rules.required]"
                    :items="facilities"
                    item-value=""
                    label="Facility"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md8
                >
                  <v-combobox
                    v-model="name"
                    :rules="[rules.required]"
                    :items="admins"
                    item-value=""
                    label="Name"
                    class="green-input"/>
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
        </material-card> <br>

        <material-card>
            <v-card-text>
              <div/>
              <p class="display-1 text--primary">
                Admins List
              </p>
              <v-btn
                :loading="downloadLoading"
                style="margin:0 0 20px 20px;"
                color="primary"
                @click="handleDownload">
                <v-icon left>mdi-download</v-icon>Export Excel
              </v-btn>
              <v-combobox
                v-model="facility_id"
                :rules="[rules.required]"
                :items="facilities"
                label="Facility"
                class="purple-input"
              />
              <v-btn
                color="secondary"
                @click="DeviceList">View List
              </v-btn>
            </v-card-text>

              <v-data-table 
                :headers="headers"
                :items="items"
                :loading="true"
                :rows-per-page-items="rowsPerPageItems"
                class="elevation-1"
              >
              <template
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
                <tr>
                  <td>{{ item.first_name }}</td>
                  <td>{{ item.surname }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.created_at }}</td>
                </tr>  
                </template>
              </v-data-table>

        </material-card>
      </v-flex>

    </v-layout>
    <v-snackbar
      :color="color"
      :bottom="bottom"
      :top="top"
      :left="left"
      :right="right"
      v-model="snackbar"
      dark
    >
      <v-icon
        color="white"
        class="mr-3"
      >
        mdi-bell-plus
      </v-icon>
      <div>{{ pre_out }} {{ output.message }}<br> {{ output.errors }}</div>
      <v-icon
        size="16"
        @click="snackbar = false"
      >
        mdi-close-circle
      </v-icon>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  //
  data () {
    return {
      rowsPerPageItems: [50, 250, 500],
      switch1: true,
      name: '',
      all_users: [],
      facility_id: '',
      facilities: [],
      headers: [
        {
          sortable: false,
          text: 'First Name',
          value: 'first_name'
        },
        {
          sortable: false,
          text: 'Surname',
          value: 'surname'
        },
        {
          sortable: false,
          text: 'Email',
          value: 'email'
        },
        {
          sortable: false,
          text: 'Created On',
          value: 'created_at'
        }
      ],
      items: [],
      facilities_all: [],
      admins: [],
      rules: {
        required: value => !!value || 'Required.'
      },
      resp: false,
      output: '',
      pre_out: '',
      color: null,
      colors: [
        'success',
        'error'
      ],
      top: true,
      bottom: false,
      left: false,
      right: false,
      snackbar: false,
      downloadLoading: false,
      filename: 'Devices',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created () {
    this.Facilities()
    this.Admins()
  },
  methods: {
    checkData () {
      if (this.facility_id == '') {
        this.pre_out = 'Pick facilty to proceed'
        this.snack('top', 'center')
        return false
      } else if (this.name == '') {
        this.pre_out = 'Provide device name to proceed'
        this.snack('top', 'center')
        return false
      } else { return true }
    },
    Admins () {
      axios.get('users')
        .then((users) => {
          console.log(users.data)
          this.all_users = users.data.data
          if (users.data.links.next) {
            this.loopT(users.data.links.next)
          } else {
            this.FilterAdmns()
          }
        })
        .catch(error => console.log(error.message))
    },
    async loopT (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.all_users = this.all_users.concat(response.data.data)
        } else {
          i = 11
        }
      }
      this.FilterAdmns()
    },
    FilterAdmns () {
      for (var a in this.all_users) {
        if (this.all_users[a].role_id == 4) {
          var p = new Object()
          p.text = this.all_users[a].first_name + ' ' + this.all_users[a].surname + ' ' + this.all_users[a].email
          p.value = this.all_users[a]
          this.admins.push(p)
        }
      }
    },
    Facilities () {
      axios.get('facilities')
        .then((resp) => {
          this.facilities_all = resp.data.data
          for (var k in this.facilities_all) {
            var p = new Object()
            p.text = this.facilities_all[k].name
            p.value = this.facilities_all[k]
            this.facilities.push(p)
          }
        })
    },

    DeviceList () {
      // setTimeout(function () {
      axios.get(`facility_admin/${this.facility_id.value.id}`)
        .then((exp) => {
          this.items = exp.data.data
          console.log(exp.data)
          console.log(this.facility_id.value.id)
        })
        .catch(error => console.log(error.message))
      // }, 1000);
    },

    AddDevice (e) {
      e.preventDefault()
      if (this.checkData()) {
        // console.log(this.facility_id.value.id)
        axios.post('facility_admin/assign', {
          facility_id: this.facility_id.value.id,
          user_id: this.name.value.id
        })
          .then((response) => {
            this.output = response.data
            this.resp = Boolean(response.data.success)
            this.snack('top', 'center')
            this.items = []
            this.DeviceList()
          })
          .catch((error) => {
            this.output = error
            this.snack('top', 'center')
          })
      }
    },
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Name', 'Safety Designed', 'Created On']
        const filterVal = ['name', 'safety_designed', 'created_at']
        const list = this.items

        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson (filterVal, jsonData) {
      console.log(jsonData)
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          console.log(jsonData)
          return v[j]
        }
      }))
    },
    snack (...args) {
      this.top = false
      this.bottom = false
      this.left = false
      this.right = false

      for (const loc of args) {
        this[loc] = true
      }
      if (this.resp) {
        this.color = this.colors[0]
      } else {
        this.color = this.colors[1]
      }
      this.snackbar = true
    }
  }
}
</script>
