<script setup lang="ts">
import { qGetListService } from '@/api/questions'
import type { qGetListForm, qListInfo } from '@/api/questions/type'
import { ref, watchEffect } from 'vue'

const formModel = ref<qGetListForm>({
  pagenum: 1,
  pagesize: 3,
  cate_id: '',
  state: ''
})
const total = ref(0)

const tableData = ref<qListInfo[]>([])
const tableLoading = ref(false)
const getQList = async () => {
  tableLoading.value = true
  const res = await qGetListService(formModel.value)
  total.value = res.total as number
  tableData.value = res.data as qListInfo[]
  tableData.value.forEach((item: qListInfo) => {
    if (item.state === '已发布') item.state = 'Resolved'
    else item.state = 'Unanswered'
  })
  tableLoading.value = false
}
watchEffect(getQList)

const handleRowClick = (row: any) => {
  console.log(row)
}

const delButtonLoading = ref(false)
const handleDelete = async (id: number) => {
  delButtonLoading.value = true
  console.log(id)

  ElMessage.success('Question deleted successfully')
  getQList()
  delButtonLoading.value = false
}

const actions = ref(false)
const handleSelectionChange = (newSelection: any) => {
  if (newSelection.length > 0) actions.value = true
  else actions.value = false
}

const tableRef = ref()
const handleactions = async () => {
  delButtonLoading.value = true
  const selectedRow = tableRef.value.getSelectionRows()
  console.log(selectedRow)

  ElMessage.success('Question deleted successfully')
  getQList()
  delButtonLoading.value = false
}
</script>

<template>
  <el-form inline>
    <el-form-item>
      <el-button type="primary" icon="Plus" :disabled="false">
        Add Question
      </el-button>
    </el-form-item>
    <el-form-item class="w200" label="Category: "></el-form-item>
    <el-form-item class="w200" label="Status: ">
      <el-select v-model="formModel.state">
        <el-option label="Resolved" value="已发布" />
        <el-option label="Unanswered" value="草稿" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="false" icon="RefreshLeft">Reset</el-button>
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

    <el-table-column prop="cate_name" label="Category" sortable width="150" />
    <el-table-column prop="state" label="Status" sortable width="150" />
    <el-table-column label="Date" sortable width="150">
      <template #default="{ row }">
        {{ new Date(row.pub_date).toLocaleDateString('en-GB') }}
      </template>
    </el-table-column>
    <el-table-column align="right" width="150">
      <template #header>
        <el-button
          v-show="actions"
          size="small"
          type="success"
          icon="Printer"
          :loading="delButtonLoading"
          circle
          plain
        ></el-button>

        <el-popconfirm
          title="Are you sure to delete this question?"
          @confirm="handleactions"
        >
          <template #reference>
            <el-button
              v-show="actions"
              size="small"
              type="danger"
              icon="Delete"
              :loading="delButtonLoading"
              circle
              plain
            ></el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #default="{ row }">
        <el-popconfirm
          title="Are you sure to delete this question?"
          @confirm="handleDelete(row.id)"
        >
          <template #reference>
            <el-button
              size="small"
              type="danger"
              icon="Delete"
              :loading="delButtonLoading"
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
