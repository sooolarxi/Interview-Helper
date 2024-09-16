<script setup lang="ts">
import { ref, onMounted } from 'vue'

const tableData = ref([])
const tableLoading = ref(false)
const getCatList = async () => {
  tableLoading.value = true
  tableLoading.value = false
}
onMounted(() => getCatList())

const handleRowClick = (row: any) => {
  console.log(row)
}

const delButtonLoading = ref(false)
const handleDelete = async (id: number) => {
  delButtonLoading.value = true
  console.log(id)

  ElMessage.success('Question deleted successfully')
  getCatList()
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
  getCatList()
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
    <el-form-item label="Category: "></el-form-item>
    <el-form-item label="Status: "></el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="false">Search</el-button>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="false">Reset</el-button>
    </el-form-item>
  </el-form>

  <el-table
    ref="tableRef"
    :data="tableData"
    v-loading="tableLoading"
    style="width: 100%; margin: 5px 0"
    max-height="350"
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
    <el-table-column prop="pub_date" label="Date" sortable width="150" />

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
</template>

<style scoped lang="scss">
::v-deep .custom-header-class {
  height: 60px;
  padding: 16px;
}
::v-deep .custom-cell-class {
  height: 60px;
  padding: 16px;
}
</style>
