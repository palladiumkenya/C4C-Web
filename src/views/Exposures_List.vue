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
        <material-card
          color="green"
          title="Broadcast Messages"
        >
          <v-card-text>
            <div/>
            <p class="display-1 text--primary">
              List of Exposures
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
                  :loading="downloadLoading"
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
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.cadre }}</td>
                <td>{{ props.item.previous_exposures }}</td>
                <td>{{ props.item.exposure_type }}</td>
                <td>{{ props.item.device_used }}</td>
                <td>{{ props.item.exposure_location }}</td>
                <td>{{ props.item.result_of }}</td>
                <td>{{ props.item.exposure_description }}</td>
                <td>{{ props.item.exposure_date }}</td>
                <td>{{ Boolean(props.item.pep_initiated) }}</td>
              </tr>
            </template>
            <template
              slot="expand"
              slot-scope="props">
              <v-card flat>
                <v-card-text>patient hiv status: {{ props.item.patient_hiv_status }} <br> patient hbv status: {{ props.item.patient_hbv_status }} <v-spacer/> description: {{ props.item.description }}</v-card-text>
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
      rowsPerPageItems: [50, 250, 500],
      search: '',
      link: '',
      output: [],
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Cadre',
          value: 'cadre'
        },
        {
          sortable: false,
          text: 'Previous exposures',
          value: 'previous_exposures'
        },
        {
          sortable: false,
          text: 'Type',
          value: 'exposure_type'
        },
        {
          text: 'Device',
          value: 'device_used'
        },
        {
          text: 'Location',
          value: 'exposure_location'
        },
        {
          text: 'Result',
          value: 'result_of'
        },
        {
          text: 'Description',
          value: 'exposure_description'
        },

        {
          text: 'Date',
          value: 'exposure_date'
        },
        {
          text: 'Pep Initiated',
          value: 'pep_initiated'
        }
      ],
      exposures: [],
      downloadLoading: false,
      filename: 'Exposures',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created () {
    this.getExp()
    console.log(`data ${this.user}`)
  },
  methods: {
    getExp () {
      axios.get('exposures/all/')
        .then((exp) => {
          this.exposures = exp.data.data
          this.link = exp.data.links.next
          this.loopT(this.link)
        })
        .catch(error => console.log(error.message))
    },
    async loopT (l) {
      var i
      for (i = 0; i < 1;) {
        if (l != null) {
          let response = await axios.get(l)
          l = response.data.links.next
          this.exposures = this.exposures.concat(response.data.data)
        } else {
          i = 11
        }
      }
      console.log(this.exposures)
    },
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Cadre', 'Previous Exposures', 'Type', 'Device', 'Location', 'Result', 'Description', 'Date']
        const filterVal = [ 'cadre', 'previous_exposures', 'exposure_type', 'device_used', 'exposure_location', 'result_of', 'exposure_description', 'exposure_date']
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
        if (j === 'cadre') {
          return v[j].name
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
