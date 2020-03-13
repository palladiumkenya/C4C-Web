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

            <v-data-table
              :headers="tableHead"
              :items="tableData.slice(0, 500)"
              rowsPerPage=100
              class="elevation-1"
              :loading="true"
              loading-text="Loading... Please wait"
            >
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
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
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'BulkSignup',
  components: { UploadExcelComponent },
  data () {
    return {
      tableData: [],
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
          text: 'Gender',
          value: 'gender'
        },
        {
          sortable: false,
          text: 'Role ID',
          value: 'roleid'
        },
        {
          sortable: false,
          text: 'Email',
          value: 'email'
        },
        {
          sortable: false,
          text: 'Mobile',
          value: 'mobile'
        },
        {
          sortable: false,
          text: 'Password',
          value: 'password'
        }

      ]
    }
  },
  methods: {
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
    }
  }
}
</script>
