<script setup lang="ts">
import { qDelInfoService, qGetListService } from '@/api/questions'
import type { qGetListForm, qInfo } from '@/api/questions/type'
import { computed, nextTick, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDeviceStore, useUserStore } from '@/stores'

const { isMobile } = storeToRefs(useDeviceStore())
const { totalQ, totalRQ, totalUQ } = storeToRefs(useUserStore())

const reload = ref(true)
watch(isMobile, () => {
  reload.value = false
  nextTick(() => (reload.value = true))
})

const formModel = ref<qGetListForm>({
  pagenum: 1,
  pagesize: computed(() => (isMobile.value ? 10 : 4)) as unknown as number,
  cate_id: '',
  state: ''
})
const total = ref(0)
const paginationInfo = computed(() => {
  const totalPages = Math.ceil(total.value / formModel.value.pagesize)
  return `${formModel.value.pagenum} / ${totalPages}`
})

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
defineExpose({ getQList })
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

const buttonLoading = ref(false)
const deleteQuestions = async (row: qInfo[]) => {
  buttonLoading.value = true
  const deletePromises = row.map(async (item: qInfo) => {
    await qDelInfoService(item.id as string)
    item.state === 'Resolved' ? totalRQ.value-- : totalUQ.value--
  })
  await Promise.all(deletePromises)
  totalQ.value -= row.length
  ElMessage.success('Question deleted successfully')
  getQList()
  buttonLoading.value = false
}
const handleDelete = async (row: qInfo) => deleteQuestions([row])
const actions = ref(false)
const handleSelectionChange = (newSelection: any) => {
  if (newSelection.length > 0) actions.value = true
  else actions.value = false
}
const handleDeleteAll = async () => {
  const selectedRow = tableRef.value.getSelectionRows()
  deleteQuestions(selectedRow)
}

const router = useRouter()
const print = (row?: qInfo) => {
  const selectedRowID = tableRef.value
    .getSelectionRows()
    .map((item: qInfo) => item.id)
  router.push({
    path: '/questions/print',
    query: {
      id: selectedRowID.length ? selectedRowID : [row?.id]
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
    <el-form-item class="hidden-sm-and-up">
      <el-button :disabled="false" icon="RefreshLeft" @click="reset">
        Reset
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
    <el-form-item class="hidden-xs-only">
      <el-button :disabled="false" icon="RefreshLeft" @click="reset">
        Reset
      </el-button>
    </el-form-item>
  </el-form>

  <el-table
    ref="tableRef"
    v-if="reload"
    :data="tableData"
    v-loading="tableLoading"
    style="width: 100%; margin: 10px 0"
    :max-height="isMobile ? 'none' : 300"
    size="large"
    header-cell-class-name="custom-header-class"
    cell-class-name="custom-cell-class"
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
  >
    <el-table-column type="selection" width="45" align="right" />

    <el-table-column label="Title">
      <template #default="{ row }">
        <el-link :underline="false" style="font-weight: 600">
          {{ row.title }}
        </el-link>
        <div v-if="isMobile" class="tags">
          <el-tag style="margin-right: 5px" type="primary" round>
            {{ row.cate_name }}
          </el-tag>
          <el-tag :type="row.tagType" round>
            {{ row.state === 'Resolved' ? 'R' : 'U' }}
          </el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      v-if="!isMobile"
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
      v-if="!isMobile"
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
      v-if="!isMobile"
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

    <el-table-column align="right" width="125">
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
          title="Are you sure to delete these questions?"
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
          @confirm="handleDelete(row)"
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

    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>

  <el-pagination
    :size="isMobile ? 'small' : 'default'"
    v-model:current-page="formModel.pagenum"
    v-model:page-size="formModel.pagesize"
    :page-sizes="[4, 8, 10]"
    background
    :layout="
      isMobile ? 'sizes, prev, slot, next' : 'total, sizes, prev, pager, next'
    "
    :total="total"
  >
    {{ paginationInfo }}
  </el-pagination>

  <QuestionEdit ref="drawerRef" @success="getQList"></QuestionEdit>
</template>

<style scoped lang="scss">
.el-form--inline {
  .el-form-item.w200 {
    width: 200px;
  }
}
@media (max-width: 768px) {
  .el-pagination {
    justify-content: center;
  }
}
::v-deep .custom-header-class {
  height: 60px;
  padding: 16px;
  @media (max-width: 768px) {
    height: 50px;
    padding: 0px;
  }
}
::v-deep .custom-cell-class {
  height: 60px;
  padding: 16px;
  @media (max-width: 768px) {
    height: 80px;
    padding: 0px;
  }
}
</style>
