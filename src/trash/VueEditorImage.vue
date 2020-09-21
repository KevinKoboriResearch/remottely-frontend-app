<template>
  <div>
      <!-- :editorOptions="editorSettings"
      @focus="onEditorFocus"
      @blur="onEditorBlur"
      @selection-change="onSelectionChange" -->
      <!-- v-model="article.content" -->
    <vue-editor
      v-model="teste"
      placeholder="Informe o Conteúdo do Artigo..." />
  </div>
</template>

<script>
import VueQuillEditor, { Quill } from 'vue-quill-editor';
// import { ImageDrop } from 'quill-image-drop-module';
// import ImageResize from 'quill-image-resize-module';

// Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/imageResize', ImageResize);

export default {
  data () {
    return {
      teste: ''
      // editorOption: {
        // modules: {
        //   toolbar: [
        //     [{ 'size': ['small', false, 'large'] }],
        //     ['bold', 'italic'],
        //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //     ['link', 'image']
        //   ],
        //   history: {
        //     delay: 1000,
        //     maxStack: 50,
        //     userOnly: false
        //   },
          // imageDrop: true,
          // imageResize: {
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          // modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          // }
        // }
      // }
    }
  }
}
</script>

<style>

</style>
