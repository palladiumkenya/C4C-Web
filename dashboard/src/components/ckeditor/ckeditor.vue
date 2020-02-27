<template>
    <div id="app-editor"> 
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"> </ckeditor>
    </div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    data() {
        return{
            editor: ClassicEditor,
            editorData: '<p> Write Your Message Here. </p>',
            editorConfig : {
            }
        };
    }
}
</script>
<style >
.ck-editor__editable_inline {
    min-height: 200px !important;
}

</style>
