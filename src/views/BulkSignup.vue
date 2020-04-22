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
                    xs12
                    md4
                  >
                    <v-text-field
                      :disabled="is_data"
                      v-model="affl"
                      label="Enter affliation"
                      class="green-input"/>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
            
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
                <!-- <td>
              {{typeof(item)}}</td> -->
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
export default {
  name: 'BulkSignup',
  components: { UploadExcelComponent },
  data () {
    return {
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
          text: 'Password',
          value: 'password'
        },
        {
          sortable: false,
          text: 'Email',
          value: 'email'
        }
      ]
    }
  },
  methods: {
    postUsers (e) {
      e.preventDefault()
      for (var u in this.tableData) {
        if (this.tableData[u].first_name === undefined) {
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
      this.pushData()
    },
    pushData () {
      for (var v in this.tableData) {
        axios.post('auth/signup', {
          first_name: this.tableData[v].first_name,
          surname: this.tableData[v].surname,
          msisdn: this.tableData[v].mobile.toString(),
          role_id: '3',
          gender: this.tableData[v].gender,
          email: this.tableData[v].email,
          password: this.tableData[v].password.toString(),
          password_confirmation: this.tableData[v].password.toString(),
          message: `Welcome ${this.tableData[v].first_name} to Caring For the Carer(C4C) SMS Platform. ${this.affl} has successfully registered you. Messages sent and received are not charged.${this.affl}` }
        )
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
      console.log('Good')
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
