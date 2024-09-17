<script setup lang="ts">
import { qDelInfoService, qGetListService } from '@/api/questions'
import type { qGetListForm, qInfo } from '@/api/questions/type'
import { ref, watch, watchEffect } from 'vue'
import CategorySelect from './components/CategorySelect.vue'
import QuestionEdit from './components/QuestionEdit.vue'
import { useRouter } from 'vue-router'

const formModel = ref<qGetListForm>({
  pagenum: 1,
  pagesize: 3,
  cate_id: '',
  state: ''
})
const total = ref(0)

const tableRef = ref()
const tableData = ref<qInfo[]>([])
const tableLoading = ref(false)
const getQList = async () => {
  tableLoading.value = true
  const res = await qGetListService(formModel.value)
  total.value = res.total as number
  tableData.value = res.data as qInfo[]
  tableData.value.forEach((item: qInfo) => {
    if (item.state === '已发布') {
      item.state = 'Resolved'
      item.tagType = 'warning'
    } else {
      item.state = 'Unanswered'
      item.tagType = 'danger'
    }
  })
  tableLoading.value = false
}
watch(
  () => formModel.value.pagesize,
  () => (formModel.value.pagenum = 1)
)
watchEffect(getQList)
const reset = () => {
  formModel.value.cate_id = ''
  formModel.value.state = ''
}

const drawerRef = ref()
const addQuestion = () => drawerRef.value.openDrawer('Add')
const handleRowClick = (row: qInfo) => {
  drawerRef.value.openDrawer('Edit', row.id)
}
const handleSuccess = (type: string) => {
  if (type === 'add') {
    formModel.value.pagenum = Math.ceil(
      (total.value + 1) / formModel.value.pagesize
    )
  }
  getQList()
}

const buttonLoading = ref(false)
const handleDelete = async (id: string) => {
  buttonLoading.value = true
  await qDelInfoService(id)
  ElMessage.success('Question deleted successfully')
  getQList()
  buttonLoading.value = false
}
const actions = ref(false)
const handleSelectionChange = (newSelection: any) => {
  if (newSelection.length > 0) actions.value = true
  else actions.value = false
}
const handleDeleteAll = async () => {
  buttonLoading.value = true
  const selectedRow = tableRef.value.getSelectionRows()
  const deletePromises = selectedRow.map(async (item: qInfo) => {
    await qDelInfoService(item.id as string)
  })
  await Promise.all(deletePromises)
  ElMessage.success('Questions deleted successfully')
  getQList()
  buttonLoading.value = false
}

const router = useRouter()
const print = (row?: qInfo) => {
  const selectedRowID = tableRef.value
    .getSelectionRows()
    .map((item: qInfo) => item.id)
  router.push({
    path: '/questions/print',
    query: {
      id: selectedRowID.length ? selectedRowID : row?.id
    }
  })
}
</script>

<template>
  <el-form inline>
    <el-form-item>
      <el-button type="primary" icon="Plus" @click="addQuestion">
        Add Question
      </el-button>
    </el-form-item>
    <el-form-item class="w200" label="Category: ">
      <CategorySelect v-model="formModel.cate_id"></CategorySelect>
    </el-form-item>
    <el-form-item class="w200" label="Status: ">
      <el-select v-model="formModel.state">
        <el-option label="Resolved" value="已发布" />
        <el-option label="Unanswered" value="草稿" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="false" icon="RefreshLeft" @click="reset">
        Reset
      </el-button>
    </el-form-item>
  </el-form>

  <el-table
    ref="tableRef"
    :data="tableData"
    v-loading="tableLoading"
    style="width: 100%; margin: 10px 0"
    max-height="300"
    size="large"
    header-cell-class-name="custom-header-class"
    cell-class-name="custom-cell-class"
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
  >
    <el-table-column type="selection" width="55" align="right" />
    <el-table-column label="Title">
      <template #default="{ row }">
        <el-link :underline="false" style="font-weight: 600">
          {{ row.title }}
        </el-link>
      </template>
    </el-table-column>

    <el-table-column
      header-align="center"
      align="center"
      label="Category"
      prop="cate_name"
      sortable
      width="160"
    >
      <template #default="{ row }">
        <el-tag type="primary" round>{{ row.cate_name }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      header-align="center"
      align="center"
      label="Status"
      prop="state"
      sortable
      width="160"
    >
      <template #default="{ row }">
        <el-tag :type="row.tagType" round>
          {{ row.state }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      header-align="center"
      align="center"
      label="Date"
      prop="pub_date"
      sortable
      width="140"
    >
      <template #default="{ row }">
        {{ new Date(row.pub_date).toLocaleDateString('en-GB') }}
      </template>
    </el-table-column>

    <el-table-column align="right" width="130">
      <template #header>
        <el-button
          v-show="actions"
          size="small"
          type="success"
          icon="Printer"
          :loading="buttonLoading"
          circle
          plain
          @click="print"
        ></el-button>

        <el-popconfirm
          title="Are you sure to delete this question?"
          @confirm="handleDeleteAll"
        >
          <template #reference>
            <el-button
              v-show="actions"
              size="small"
              type="danger"
              icon="Delete"
              :loading="buttonLoading"
              circle
              plain
            ></el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #default="{ row }">
        <el-button
          size="small"
          type="success"
          icon="Printer"
          :loading="buttonLoading"
          circle
          plain
          @click.stop="print(row)"
        ></el-button>
        <el-popconfirm
          title="Are you sure to delete this question?"
          @confirm="handleDelete(row.id)"
        >
          <template #reference>
            <el-button
              size="small"
              type="danger"
              icon="Delete"
              :loading="buttonLoading"
              circle
              plain
              @click.stop
            ></el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    v-model:current-page="formModel.pagenum"
    v-model:page-size="formModel.pagesize"
    :page-sizes="[3, 5, 10]"
    background
    layout="total, sizes, prev, pager, next"
    :total="total"
  />

  <QuestionEdit ref="drawerRef" @success="handleSuccess"></QuestionEdit>
</template>

<style scoped lang="scss">
.el-form--inline {
  .el-form-item.w200 {
    width: 200px;
  }
}
::v-deep .custom-header-class {
  height: 60px;
  padding: 16px;
}
::v-deep .custom-cell-class {
  height: 60px;
  padding: 16px;
}
</style>
