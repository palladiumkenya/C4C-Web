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
          flat
          full-width
          title="All Users"
        >
          <div class="app-container">
            <upload-excel-component
              :on-success="handleSuccess"
              :before-upload="beforeUpload" />
            
            <v-form @submit="postUsers">
              <v-container py-0>
                <v-layout wrap>
                  <v-flex
                    xs12
                    md6
                  >
                    <v-btn
                      :disabled="is_data"
                      type="submit"
                      color="success"
                    >Submit
                    </v-btn>
                  </v-flex>
                  <v-flex
                    v-if="user.role_id === 1"
                    xs12
                    md4
                  >
                  <v-combobox
                    v-model="facility"
                    :items="all_facilities"
                    item-text="name"
                    item-value="id"
                    label="Select Facility"
                    clearable
                    persistent-hint
                    chips
                    :disabled="is_data"/>
                  </v-flex>
                  {{facility}}
                </v-layout>
              </v-container>
            </v-form>
            <v-dialog v-model="loading" fullscreen full-width>
              <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.5);">
                <v-layout justify-center align-center>
                  <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="8"
                    :value="value"
                    color="teal" >
                    {{ value }} %
                  </v-progress-circular>
                </v-layout>
              </v-container>
            </v-dialog>
            <v-data-table
              :headers="tableHead"
              :items="tableData.slice(0, 500)"
              :loading="true"
              :rows-per-page-items="rowsPerPageItems"
              class="elevation-1"
              loading-text="Loading... Please wait"
            >
              <template
                slot="headerCell"
                slot-scope="{ header }"
              >
                <span
                  class="subheading font-weight-light text--darken-3"
                  v-text="header.text"
                />
              </template>
              <template
                slot="items"
                slot-scope="{ item }"
              >
                <td
                  v-for="(msg, index) in item"
                  :key="index">{{ msg }}</td>
              </template>
            </v-data-table>
          </div>
          <v-btn
            :disabled="!is_data"
            href="reg.xlsx"
            download
            color="info"
          >Get Excel template
          </v-btn>
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
      <div>{{ output.message }}<br> {{ output.errors }} {{ output_pre }}</div>
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
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  name: 'BulkSignup',
  components: { Loading, UploadExcelComponent },
  data () {
    return {
      value: 0,
      loading: false,
      affl: '',
      is_data: true,
      output: '',
      output_pre: '',
      resp: false,
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
      rowsPerPageItems: [50, 250, 500],
      tableData: [],
      tableHeader: [],
      tableHead: [
        // {
        //   text: 'Number',
        //   value: 'number'
        // },
        {
          sortable: false,
          text: 'First Name',
          value: 'firstname'
        },
        {
          sortable: false,
          text: 'Surname',
          value: 'surname'
        },
        {
          sortable: false,
          text: 'Mobile',
          value: 'mobile'
        },
        {
          sortable: false,
          text: 'Gender',
          value: 'gender'
        },
        {
          sortable: false,
          text: 'Email',
          value: 'email'
        },
        {
          sortable: false,
          text: 'Facility_Department',
          value: 'facility_department'
        },
        {
          sortable: false,
          text: 'Cadre',
          value: 'cadre'
        },
        {
          sortable: false,
          text: 'DOB',
          value: 'dob'
        },
        {
          sortable: false,
          text: 'ID Number',
          value: 'id_no'
        }
      ],
      all_facilities: [],
      facility: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created () {
    if (this.user.role_id !== 1){
      this.facility = this.user.hcw.facility_id
      console.log(this.facility)
    } else {
      this.getFacilities()
    }
  },
  methods: {
    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
        })
        .catch(error => console.log(error.message))
    },
    postUsers (e) {
      e.preventDefault()
      for (var u in this.tableData) {
        if (this.tableData[u].FirstName === undefined) {
          this.output_pre = `ERROR: Fill first name for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].surname === undefined) {
          this.output_pre = `ERROR: Fill surname for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].mobile === undefined) {
          this.output_pre = `ERROR: Fill mobile for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].mobile.toString().length < 9) {
          this.output_pre = `ERROR: Fill valid mobile for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].gender === undefined) {
          this.output_pre = `ERROR: Fill gender for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].password === undefined) {
          this.output_pre = `ERROR: Fill password for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].password.toString().length < 6) {
          this.output_pre = `ERROR: Password for record: ${u + 1} should be more the 5 characters`
          this.snack('bottom', 'center')
          return
        }
      }
      this.loading = true
      this.pushData()
    },
    pushData () {
      for (var v in this.tableData) {
        console.log(v)
        this.value = Math.round((v / this.tableData.length) * 100)
        axios.post('auth/signup', {
          facility_id: 17,
          facility_department: this.tableData[v].Facility_Department,
          cadre: this.tableData[v].cadre,
          first_name:  this.tableData[v].FirstName,
          surname: this.tableData[v].surname,
          email: this.tableData[v].Email,
          msisdn: this.tableData[v].Mobile.toString(),
          gender: this.tableData[v].gender,
          dob: this.tableData[v].dob,
          id_no: this.tableData[v].id_no
        })
          .then((response) => {
            this.output = response.data
            console.log(this.output)
            this.resp = Boolean(response.data.success)
            if (!this.resp) {
              this.snack('bottom', 'center')
              return
            }
            this.snack('top', 'center')
          })
          .catch((error) => {
            this.output = error
            this.snack('top', 'center')
          })
      }
      this.loading = false
    },
    beforeUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess ({ results, header }) {
      this.tableData = results
      this.tableHeader = header
      this.is_data = false
      for (var r in results) {
        if (String(results[r].Mobile).slice(0,3) != '254' && String(results[r].Mobile).slice(0,1) === '7') {
          results[r].Mobile = '254'+ String(results[r].Mobile)
        } else if (String(results[r].mobile).length < 5) {
          console.log(results.splice(r,1))
          break
        }
      }
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
