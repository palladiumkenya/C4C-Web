<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
        >
        <v-snackbar
          color="error"
          v-model="snackbar"
          :timeout="12000"
          top>
          <v-icon
            color="white"
            class="mr-3"
            >
            mdi-bell-plus
          </v-icon>
          <div> {{result}}</div>
          <v-icon
            size="16"
            @click="snackbar = false"
          >
            mdi-close-circle
          </v-icon>
        </v-snackbar>
        <v-card>
          <v-card-title>
            Health Care Workers
            <v-spacer/>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
            <v-flex
              xs12
              md2>
              <v-btn
                :loading="downloadLoading"
                color="primary"
                @click="handleDownload">
                <v-icon left>mdi-download</v-icon>Export Excel
              </v-btn>
            </v-flex>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="all_hcws"
            :rows-per-page-items="rowsPerPageItems"
            :search="search"
            :loading="true"
            class="elevation-1"
            item-key="id"
          >

          <template slot='no-data'>
              <v-progress-linear slot='progress' indeterminate></v-progress-linear>
          </template>

            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.first_name }}</td>
                <td>{{ props.item.surname }}</td>
                <td>{{ props.item.facility_name }}</td>
                <td>{{ props.item.department }}</td>
                <td>{{ props.item.cadre }}</td>
                <td>{{ props.item.dob }}</td>
              </tr>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="success"
              icon="mdi-emoticon-sad">
              Your search for "{{ search }}" found no results.
            </v-alert>

          </v-data-table>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      all_hcws: [],
      search: '',
      isLoading: true,
      snackbar: false,
      result: '',
      rowsPerPageItems: [100, 2000, 10000],
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
          text: 'Facility',
          value: 'facility.name'
        },
        {
          sortable: false,
          text: 'Department',
          value: 'department'
        },
        {
          sortable: false,
          text: 'Cadre',
          value: 'cadre'
        },
        {
          sortable: false,
          text: 'Date Of Birth',
          value: 'dob'
        }
      ],
      downloadLoading: false,
      filename: `Health care workers ${new Date().toISOString()}`,
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      all_users: 'auth/us_all',
      us_no: 'auth/us_no',
      next_link: 'auth/next_link'
    })
  },
  created () {
    if (this.us_no === 0) {
      this.getHCW()
    } else if (this.all_users.length !== this.us_no) {
      this.all_hcws = this.all_users
      this.loopT(this.next_link)
    } else {
      this.all_hcws = this.all_users
    }
    if (this.user.role_id === 4) {
      this.getHCW()
    }
  },
  methods: {

    getHCW () {
      if (this.user.role_id === 1 || this.user.role_id === 5) {
        axios.get('hcw')
          .then((workers) => {
            console.log(workers.data)
            this.all_hcws = workers.data.data
            this.loopT(workers.data.links.next)
            this.isLoading = false
          })
          .catch(() => {
            this.result = 'Check your internet connection or retry logging in.'
            this.snackbar = true            })
          } else if (this.user.role_id === 4) {
            axios.get(`hcw/facility/${this.user.hcw.facility_id}`)
              .then((workers) => {
                console.log(workers.data)
                this.all_hcws = workers.data.data
                this.loopT(workers.data.links.next)
                this.isLoading = false
              })
          .catch(() => {
            this.result = 'Check your internet connection or retry logging in.'
            this.snackbar = true
          })
      }
    },
    async loopT (l) {
      var i
      var u = []
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.all_hcws = this.all_hcws.concat(response.data.data)
        } else {
          i = 11
        }
      }
      if (this.user.role_id === 5) {
        for (var a in this.all_hcws) {
          if (this.all_hcws[a].county === this.user.county) {
            u.push(this.all_hcws[a])
          }
        }
        this.all_hcws = u
      }
    },
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['First Name', 'Surname', 'Facility', 'Department', 'Cadre','DOB']
        const filterVal = ['first_name', 'surname', 'facility_name', 'department', 'cadre', 'dob']
        const list = this.all_hcws
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
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'cadre') {
          return v[j]
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
  