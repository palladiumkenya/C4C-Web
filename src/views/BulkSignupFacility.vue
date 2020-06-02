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
                    v-if="user.role_id !== 4"
                    xs12
                    md4
                  >

                   <v-combobox
                      v-model="facility"
                      :items="all_facilities"
                      :disabled="is_data"
                      item-text="name"
                      item-value="id"
                      label="Select Facility"
                      clearable
                      persistent-hint
                      chips/>

                    <v-text-field
                      :disabled="is_data"
                      v-model="affl"
                      label="Enter affliation"
                      class="green-input"/>

                  </v-flex>

                  
                </v-layout>
              </v-container>
            </v-form>
            <v-dialog
              v-model="loading"
              fullscreen
              full-width>
              <v-container
                fluid
                fill-height
                style="background-color: rgba(255, 255, 255, 0.5);">
                <v-layout
                  justify-center
                  align-center>
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
                slot="items"
                slot-scope="props">
                <tr>
                  <td>{{ tableData.indexOf(props.item)+1 }}</td>
                  <td>{{ props.item.FirstName }}</td>
                  <td>{{ props.item.Surname }}</td>
                  <td>{{ props.item.Mobile }}</td>
                  <td>{{ props.item.Gender }}</td>
                  <td>{{ props.item.Email }}</td>
                  <td>{{ props.item.Facility_Department }}</td>
                  <td>{{ props.item.Cadre }}</td>
                  <td>{{ props.item.Date_Of_Birth }}</td>
                  <td>{{ props.item.National_ID }}</td>
                  <td>{{ props.item.Password }}</td>

                </tr>
              </template>
            </v-data-table>
          </div>
          <v-btn
            :disabled="!is_data"
            href="HCW_Template.xlsx"
            download
            color="infos"
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
      rowsPerPageItems: [200, 1000, 3000],
      tableData: [],
      tableHeader: [],
      tableHead: [
        {
          text: 'Number',
          value: 'number'
        },
        {
          sortable: false,
          text: 'First Name',
          value: 'FirstName'
        },
        {
          sortable: false,
          text: 'Surname',
          value: 'Surname'
        },
        {
          sortable: false,
          text: 'Mobile',
          value: 'Mobile'
        },
        {
          sortable: false,
          text: 'Gender',
          value: 'Gender'
        },
        {
          sortable: false,
          text: 'Email',
          value: 'Email'
        },
        {
          sortable: false,
          text: 'Facility_Department',
          value: 'Facility_Department'
        },
        {
          sortable: false,
          text: 'Cadre',
          value: 'Cadre'
        },
        {
          sortable: false,
          text: 'DOB',
          value: 'Date_Of_Birth'
        },
        {
          sortable: false,
          text: 'ID Number',
          value: 'National_ID'
        },
        {
          sortable: false,
          text: 'Password',
          value: 'Password'
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
      this.getFacilities()
  },

  methods: {

    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
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
        } else if (this.tableData[u].Surname === undefined) {
          this.output_pre = `ERROR: Fill surname for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].Mobile === undefined) {
          this.output_pre = `ERROR: Fill mobile for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].Mobile.toString().length < 9) {
          this.output_pre = `ERROR: Fill valid mobile for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].Gender === undefined) {
          this.output_pre = `ERROR: Fill gender for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].Password === undefined) {
          this.output_pre = `ERROR: Fill password for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].Password.toString().length < 6) {
          this.output_pre = `ERROR: Password for record: ${u + 1} should be more the 5 characters`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].Facility_Department === undefined) {
          this.output_pre = `ERROR: Fill Department for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].Cadre === undefined) {
          this.output_pre = `ERROR: Fill cadre for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].Date_Of_Birth === undefined) {
          this.output_pre = `ERROR: Fill date of birth for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        } else if (this.tableData[u].Password === undefined) {
          this.output_pre = `ERROR: Fill password for record: ${u + 1}`
          this.snack('bottom', 'center')
          return
        }
      }
      this.loading = true
      this.pushData()
    },

    pushData () {
        if (this.user.role_id === 1 || this.user.role_id) {
        this.facility = this.facility.id
      } else if (this.user.role_id === 4) {
          this.facility = this.user.hcw.facility_id
      }
  
      for (var v in this.tableData) {
        console.log(v)
        this.value = Math.round((v / this.tableData.length) * 100)
        axios.post('auth/signup', {
          first_name: this.tableData[v].FirstName,
          surname: this.tableData[v].Surname,
          msisdn: this.tableData[v].Mobile.toString(),
          role_id: '3',
          gender: this.tableData[v].Gender,
          email: this.tableData[v].Email,
          facility_department: this.tableData[v].Facility_Department,
          cadre: this.tableData[v].Cadre,
          id_no: this.tableData[v].National_ID,
          dob: this.tableData[v].Date_Of_Birth,
          password: this.tableData[v].Password.toString(),

          password_confirmation: this.tableData[v].Password.toString(),
          consent: '1',
          
          message: `Welcome ${this.tableData[v].first_name} to Care For the Carer (C4C) SMS Platform. ${this.affl} has successfully registered you. Messages sent and received are not charged.${this.affl}` 
        })
          .then((response) => {
            this.output = response.data
            console.log(response)
            this.resp = Boolean(response.data.success)
            if (!this.resp) {
              this.snack('bottom', 'center')
              return
            }
            this.snack('top', 'center')
            this.$router.push('/hcw_list')
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
        
        if (String(results[r].mobile).slice(0, 3) !== '254' && String(results[r].mobile).slice(0, 1) === '7') {
          results[r].mobile = '254' + String(results[r].mobile)
        } else if (String(results[r].mobile).length < 5) {
          console.log(results.splice(r, 1))
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
