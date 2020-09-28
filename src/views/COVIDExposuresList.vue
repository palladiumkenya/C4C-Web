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
          v-model="snackbar"
          :timeout="12000"
          color="error"
          top>
          <v-icon
            color="white"
            class="mr-3"
          >
            mdi-bell-plus
          </v-icon>
          <div> {{ output.error }} {{ result }}</div>
          <v-icon
            size="16"
            @click="snackbar = false"
          >
            mdi-close-circle
          </v-icon>
        </v-snackbar>

        <material-card
          color="green"
          title="Broadcast Messages"
        >
          <v-card-text>
            <div/>
            <p class="display-1 text--primary">
              List of COVID19 Exposures
            </p>
          </v-card-text>
          <v-container py-0>
            <v-layout wrap>
              <v-flex
                xs12
                md10>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-search-web"
                  label="Search"
                  single-line
                  hide-details
                />
              </v-flex>
              <v-flex
                xs12
                md2>
                <v-btn
                  :loading="downLoading"
                  color="primary"
                  @click="handleDownload">
                  <v-icon left>mdi-download</v-icon>Export Excel
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container><br>

          <v-data-table
            :headers="headers"
            :items="exposures"
            :search="search"
            :rows-per-page-items="rowsPerPageItems"
            :loading="true"
          >

          <template slot='no-data'>
              <v-progress-linear slot='progress' indeterminate></v-progress-linear>
          </template>

            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ exposures.indexOf(props.item)+1 }}</td>
                <td>{{ props.item.gender }}</td>
                <td>{{ props.item.cadre }}</td>
                <td>{{ props.item.facility }}</td>
                <td>{{ props.item.facility_level }}</td>
                <td>{{ props.item.county }}</td>
                <td>{{ props.item.sub_county }}</td>
                <td>{{ props.item.risk_assessment_recommendation }}</td>
                <td>{{ props.item.isolation_start_date }}</td>
                <td>
                  <v-icon v-if="props.expanded">mdi-arrow-down</v-icon>
                  <v-icon v-else>mdi-arrow-right</v-icon>
                </td>
              </tr>
            </template>
            <template
              slot="expand"
              slot-scope="props">
              <v-card 
                outlined 
                :dark="true">
                <v-container py-0>
                  <v-layout wrap>
                    <v-flex
                      xs12
                      md6
                    >
                      <v-card-text>
                        Facility: {{ props.item.facility }} <br>
                        Transmission Mode: {{ props.item.transmission_mode }} <br>
                        Contact With: {{ props.item.contact_with }} <br>
                        Date Of Contact: {{ props.item.date_of_contact }} 
                        
                      </v-card-text>
                    </v-flex>
                    <v-flex
                      xs12
                      md4
                    >
                      <v-card-text>
                        IPC Training: {{ props.item.ipc_training }} <br>
                        PPE Worn: {{ props.item.ppe_worn }} <br>
                        Specific PPE: {{ props.item.ppes }} <br>
                        Risk Assesment Level: {{ props.item.risk_assessment_outcome }}
                      </v-card-text>
                    </v-flex>

                  </v-layout>
                </v-container>
              </v-card>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="success"
              icon="mdi-emoticon-sad">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </material-card>
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
      rowsPerPageItems: [100, 500, 1000],
      search: '',
      link: '',
      output: '',
      isLoading: true,
      result: '',
      snackbar: false,
      headers: [
        {
          text: 'No.',
          value: 'No.'
        },
        {
          sortable: false,
          text: 'Gender',
          value: 'gender'
        },
        {
          text: 'Cadre',
          value: 'cadre'
        },
        {
          text: 'Facility',
          value: 'facility'
        },
        {
          text: 'Facility Level',
          value: 'facility_level'
        },
        {
          text: 'County',
          value: 'county'
        },
        {
          text: 'Sub County',
          value: 'sub_county'
        },
        {
          text: 'Risk Assesment Recommendation',
          value: 'risk_assessment_recommendation'
        },
        {
          text: 'Date Isolation Started',
          value: 'isolation_start_date'
        }
      ],

      exposures: [],
      downLoading: false,
      filename: `Exposures ${new Date().toISOString()}`,
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      token: 'auth/token',
    })
  },
  created () {
    if (this.exposures.length === 0) {
      this.getExp()
    } else {
      this.getExp()
    }
  },
  methods: {
    getExp () {
      if (this.user.role_id === 1 || this.user.role_id === 2 || this.user.role_id === 5) {
        axios.get(`exposures/covid/all`)
          .then((response) => {
            this.exposures = response.data.data

            this.loopT(response.data.links.next)
            this.isLoading = false
          })
          .catch((error) => {
            this.error = true
            this.result = 'Check your internet connection or retry logging in.'
            this.snackbar = true
          })
      } else if (this.user.role_id === 4) {
        axios.get(`exposures/covid/facility/${this.user.hcw.facility_id}`)
          .then((response) => {
            this.exposures = response.data.data
            
            this.loopT(response.data.links.next)
            this.isLoading = false
          })
          .catch((error) => {            
            this.error = true
            this.result = 'Check your internet connection or retry logging in.'
            this.snackbar = true
          })
      }
    },

    async loopT (l) {
      var i; var u = []
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.exposures = this.exposures.concat(response.data.data)
        } else {
          i = 100
        }
      }
      if (this.user.role_id === 5) {
        for (var ex in this.exposures) {
          if (this.exposures[ex].facility) {
            if (this.exposures[ex].county === this.user.county) {
              u.push(this.exposures[ex])
            }
          }
        }
        this.exposures = u
      }
    },
    handleDownload () {
      this.downLoading = true
      import('@/vendor/Export2Excel').then(excel => {
       const tHeader = ['Gender', 'Cadre','Facility', 'Facility Level', 'County', 'Sub County', 'Risk Assesment Recommendation', 'Date Isolation Started']
        const filterVal = ['gender', 'cadre', 'facility', 'facility_level', 'county', 'sub_county', 'risk_assessment_recommendation' ,'isolation_start_date']
        const list = this.exposures
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
        if (v[j] === 'cadre') {
          return v[j]
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
