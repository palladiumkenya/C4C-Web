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
              <v-btn
                :disabled="is_data"
                type="submit"
                color="success"
              >Submit
              </v-btn>
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
                <td
                  v-for="(msg, index) in item"
                  :key="index">{{ msg }}</td>
              </template>
            </v-data-table>
          </div>
          <v-btn
            :disabled="!is_data"
            type="submit"
            color="info"
          >Get Excel template
          </v-btn>
          <pre>Use 3 for roleID</pre>
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
      <div>{{output}}<br> {{output.errors}}</div>
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
      is_data: true,
      output: '',
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
      console.log(this.tableData)
      for (var u in this.tableData){
        console.log(this.tableData[u].email)
        if (this.tableData[u].first_name === undefined){
          this.output = "Fill all appropriately";
          this.snack('bottom', 'center')
        }else if (this.tableData[u].surname === undefined){
          this.output = "Fill all appropriately";
          this.snack('bottom', 'center')
        }else if (this.tableData[u].msisdn === undefined){
          this.output = "Fill all appropriately";
          this.snack('bottom', 'center')
        }else if (this.tableData[u].gender === undefined){
          this.output = "Fill all appropriately";
          this.snack('bottom', 'center')
        }else if (this.tableData[u].password === undefined){
          this.output = "Fill all appropriately";
          this.snack('bottom', 'center')
        }else {
          this.pushData()
        }
      }
    },
    pushData (){
      for (var v in this.tableData){
        axios.post('auth/signup',{
          first_name: this.tableData[u].first_name,
          surname: this.tableData[u].surname,
          msisdn: this.tableData[u].msisdn,
          role_id: "3",
          gender: this.tableData[u].gender,
          email: this.tableData[u].email,
          password: this.tableData[u].password,
          password_confirmation: this.tableData[u].password},
          )
        .then((response) => {
          this.output = response.data;
          console.log(this.output)
          this.resp = Boolean(response.data.success)
          this.snack('top', 'center')
        })
        .catch((error)=> {
          this.output = error;
          this.snack('top', 'center')
        });
      }
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
      if(this.resp){
        this.color = this.colors[0]
      } else {
        this.color = this.colors[1]
      }

      this.snackbar = true
    }
  
  }
}
</script>
