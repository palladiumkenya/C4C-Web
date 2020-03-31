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
          title="Create A Resource, Guideline or Protocal "
          text="Kindly fill all the required fields carefully"
        >
          <v-form @submit="postCME">
            <v-container py-0>
              <v-layout wrap>

                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    label="Title"
                    id="title"
                    :rules="[rules.required]"
                    v-model="title"
                    class="purple-input"/>
                </v-flex>

                <v-flex xs12>
                    <ckeditor 
                    :editor="editor"
                     v-model="body" 
                     id="body"
                     :config="editorConfig">
                     </ckeditor>
                </v-flex>

                <v-flex xs12>
                  <input
                    ref="file"
                    id="file"
                    class="excel-upload-input"
                    name="file"
                    v-on:change="handleFileUpload()"
                    type="file">
                </input>
                    
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
        </material-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  
  data () {
    return{
      editor: ClassicEditor,
      editorConfig: {},
      title: '',
      body: '',
      file: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  methods: {
    handleFileUpload(e){
        this.file = this.$refs.file.files[0];
      },
   

    postCME (e) {
      e.preventDefault();
    
    const allData = new FormData();
    // dict of all elements
    allData.append("file", this.file);
    allData.append("title", this.title);
    allData.append("body", this.body);

    let currentObj = this
    
    axios({
      method: "POST",
      url: 'resources/cmes/create',
      data: allData, 
        headers: {
        'Content-Type': 'multipart/form-data'
      } 
    })
    .then(function (response) {
      console.log('Success')
      currentObj.output = response.data
    })
    .catch(function (error) {
      console.log('Failed')
      currentObj.output = error
    })
  }
  }

}
</script>
<style>
.ck-editor__editable_inline {
    min-height: 200px !important;
}

</style>