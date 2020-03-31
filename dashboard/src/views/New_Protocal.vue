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
          title="Create A Protocal "
          text="Kindly fill all the required fields carefully"
        >
          <v-form @submit="postProtocal">
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    id="title"
                    :rules="[rules.required]"
                    v-model="title"
                    label="Title"
                    class="purple-input"/>
                </v-flex>

                <v-flex
                  xs12
                >
                  <v-autocomplete
                    v-model="facility_id"
                    :items="all_facilities"
                    :loading="loading"
                    :search-input.sync="search"
                    :return-object="true"
                    item-text="name"
                    item-value="id"
                    cache-items
                    hide-no-data
                    hide-details
                    label="Select Facility"
                    required="True"
                  />

                </v-flex>

                <v-flex xs12>
                  <v-textarea
                    id="body"
                    v-model="body"
                    :rules="[rules.required]"
                    label="Write Here"
                    rows="12"
                  />
                </v-flex>

                <v-flex xs12 >
                  <input
                    id="image_file"
                    ref="files"
                    type="file"
                    multiple
                    @change="handleFiles()">
                </v-flex>

                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    type="submit"
                  >
                    Submit
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <strong>Output:</strong>
          <pre> {{ output }} </pre>
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      loading: false,
      search: null,
      items: [],
      all_facilities: [],
      facility: 'null',
      facility_id: '',
      title: '',
      body: '',
      files: [],
      output: [],
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    }
  },
  created () {
    this.getFacilities()
  },

  methods: {

    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.facilities.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },

    handleFiles () {
      let uploadedFiles = this.$refs.files.files

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
      this.getImagePreviews()
    },

    getImagePreviews () {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            this.$refs['preview' + parseInt(i)][0].src = reader.result
          }.bind(this), false)
          reader.readAsDataURL(this.files[i])
        } else {
          this.$nextTick(function () {
            this.$refs['preview' + parseInt(i)][0].src = '/img/generic.png'
          })
        }
      }
    },

    removeFile (key) {
      this.files.splice(key, 1)
      this.getImagePreviews()
    },

    getFacilities () {
      axios.get('facilities')
        .then((facilities) => {
          console.log(facilities.data)
          this.all_facilities = facilities.data.data
        })
        .catch(error => console.log(error.message))
    },

    postProtocal (e) {
      e.preventDefault()
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].id) {
          continue
        }

        let allData = new FormData()
        // dict of all elements
        allData.append('image_file', this.files[i])
        allData.append('title', this.title)
        allData.append('body', this.body)
        allData.append('facility_id', this.facility_id.id)

        let currentObj = this

        axios.post('resources/protocols/create',
          allData, {
            headers: {
              'content-type': 'multipart/form-data' }
          })
          .then(function (data) {
            console.log(data)
            this.$router.push('/protocals')
            console.log('success')
          }.bind(this)).catch(function (data) {
            console.log('error')
          })
      }
    }
  }
}

</script>
<style>
.document-editor {
    border: 1px solid var(--ck-color-base-border);
    border-radius: var(--ck-border-radius);
    min-height: 300px;
    display: flex;
    flex-flow: column nowrap;
}

</style>
