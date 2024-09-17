<script setup lang="ts">
import { nextTick, ref } from 'vue'
import CategorySelect from './CategorySelect.vue'
import type { qInfo } from '@/api/questions/type'
import {
  qAddInfoService,
  qGetInfoService,
  qUpdateInfoService
} from '@/api/questions'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const drawer = ref(false)
const drawerTitle = ref('')
const defaultForm = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}
const formModel = ref<qInfo>({ ...defaultForm })

const editorRef = ref()
const openDrawer = async (opr: string, id?: string) => {
  drawerTitle.value = opr + ` Question`
  if (opr === 'Edit') {
    const loadingInstance = ElLoading.service()
    const res = await qGetInfoService(id as string)
    formModel.value = res.data as qInfo
    nextTick(() => {
      loadingInstance.close()
      drawer.value = true
    })
  } else {
    editorRef.value?.setHTML('')
    formModel.value = { ...defaultForm }
    drawer.value = true
  }
}

const emit = defineEmits(['success'])
const handleSubmit = async (state: string) => {
  formModel.value.state = state
  const defaultImage = new File(
    [new Blob([''], { type: 'image/jpeg' })],
    'default.jpg',
    { type: 'image/jpeg' }
  )
  formModel.value.cover_img = defaultImage

  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  if (formModel.value.id) {
    await qUpdateInfoService(fd)
    emit('success')
  } else {
    await qAddInfoService(fd)
    emit('success', 'add')
  }
  ElMessage.success('Submission Successful')
  drawer.value = false
}

defineExpose({ openDrawer })
</script>

<template>
  <el-drawer v-model="drawer" size="50%" :title="drawerTitle" direction="rtl">
    <el-form :model="formModel" label-width="50" style="padding: 0 2rem">
      <el-form-item label="Title">
        <el-input v-model="formModel.title" />
      </el-form-item>
      <el-form-item label="Category">
        <CategorySelect v-model="formModel.cate_id"></CategorySelect>
      </el-form-item>
      <el-form-item label="Answer">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit('已发布')">
          Submit
        </el-button>
        <el-button @click="handleSubmit('草稿')">Draft</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.editor {
  width: 100%;
  ::v-deep .ql-editor {
    min-height: 200px;
  }
}
</style>
