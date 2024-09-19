<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import CategorySelect from './CategorySelect.vue'
import type { qInfo } from '@/api/questions/type'
import {
  qAddInfoService,
  qGetInfoService,
  qUpdateInfoService
} from '@/api/questions'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useDeviceStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const { isMobile } = storeToRefs(useDeviceStore())
const { totalCat, totalQ, totalRQ, totalUQ } = storeToRefs(useUserStore())

const reload = ref(true)
watch(isMobile, () => {
  reload.value = false
  nextTick(() => (reload.value = true))
})

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
const formRef = ref()
const rules = {
  title: [
    { required: true, message: 'Please enter a title', trigger: 'blur' },
    {
      min: 1,
      max: 30,
      message: 'Title must be 1-30 characters',
      trigger: 'blur'
    }
  ],
  cate_id: [{ required: true, message: 'Please select a category' }]
}

const router = useRouter()
const editorRef = ref()
const openDrawer = async (opr: string, id?: string) => {
  formRef.value?.resetFields()
  drawerTitle.value = opr + ` Question`
  if (opr === 'Edit') {
    const loadingInstance = ElLoading.service()
    const res = await qGetInfoService(id as string)
    formModel.value = res.data as qInfo
    if (formModel.value.content === 'No Data') formModel.value.content = ''
    nextTick(() => {
      loadingInstance.close()
      drawer.value = true
    })
  } else {
    if (totalCat.value === 0) {
      ElMessage.warning('Please create a category first!')
      router.push('/category')
      return
    }
    editorRef.value?.setHTML('')
    formModel.value = { ...defaultForm }
    drawer.value = true
  }
}

const emit = defineEmits(['success'])
const handleSubmit = async (state: string) => {
  try {
    await formRef.value.validate()
  } catch (error) {
    return
  }
  drawer.value = false
  formModel.value.state = state
  const defaultImage = new File(
    [new Blob([''], { type: 'image/jpeg' })],
    'default.jpg',
    { type: 'image/jpeg' }
  )
  formModel.value.cover_img = defaultImage
  if (!formModel.value.content) formModel.value.content = 'No Data'

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
    totalQ.value++
    state === '已发布' ? totalRQ.value++ : totalUQ.value++
  }
  ElMessage.success('Submission Successful')
}

defineExpose({ openDrawer })
</script>

<template>
  <el-drawer
    v-if="reload"
    v-model="drawer"
    :size="isMobile ? '90%' : '50%'"
    :title="drawerTitle"
    :direction="isMobile ? 'btt' : 'rtl'"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="50"
      style="padding: 0 2rem"
      hide-required-asterisk
    >
      <el-form-item label="Title" prop="title">
        <el-input v-model="formModel.title" />
      </el-form-item>
      <el-form-item label="Category" prop="cate_id">
        <CategorySelect v-model="formModel.cate_id"></CategorySelect>
      </el-form-item>
      <el-form-item label="Answer">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
            :toolbar="isMobile ? 'minimal' : 'full'"
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
