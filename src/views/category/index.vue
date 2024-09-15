<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([])

const deleteAll = ref(false)
const handleSelectionChange = (newSelection: any[]) => {
  if (newSelection.length > 0) deleteAll.value = true
  else deleteAll.value = false
}
const handleRowClick = (row: any) => console.log(row)
const handleDeleteAll = () => console.log(11)
const handleDelete = (row: any) => console.log(row)
</script>

<template>
  <el-card style="width: 100%; height: 100%">
    <el-table
      :data="tableData"
      style="width: 100%"
      size="large"
      header-cell-class-name="custom-header-class"
      cell-class-name="custom-cell-class"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column type="selection" width="55" align="right" />
      <el-table-column label="Category Name">
        <template #default="{ row }">
          <el-link :underline="false" style="font-weight: 600">
            {{ row.cate_name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="Description" prop="cate_alias" />
      <el-table-column align="right">
        <template #header>
          <el-button
            v-show="deleteAll"
            size="small"
            type="danger"
            icon="Delete"
            circle
            plain
            @click="handleDeleteAll"
          ></el-button>
        </template>
        <template #default="{ row }">
          <el-button
            size="small"
            type="danger"
            icon="Delete"
            circle
            plain
            @click.stop="handleDelete(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped lang="scss">
::v-deep .custom-header-class {
  height: 60px;
  padding: 16px;
}
::v-deep .custom-cell-class {
  padding: 16px;
}
</style>
