<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import type { catInfo } from '@/api/category/type'
import {
  catAddService,
  catDelService,
  catGetListService,
  catUpdateService
} from '@/api/category'
import { useDeviceStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { isMobile } = storeToRefs(useDeviceStore())
const { totalCat } = storeToRefs(useUserStore())

const reload = ref(true)
watch(isMobile, () => {
  reload.value = false
  nextTick(() => (reload.value = true))
})

const tableRef = ref()
const tableData = ref<catInfo[]>([])
const tableLoading = ref(false)
const getCatList = async () => {
  tableLoading.value = true
  const res = await catGetListService()
  tableData.value = res.data as catInfo[]
  tableLoading.value = false
}
onMounted(() => getCatList())

const checkCatName = (data: catInfo[], newName: string) => {
  if (!newName) {
    ElMessage.error('Category name cannot be empty!')
    return false
  }
  if (newName.length > 10) {
    ElMessage.error('Category name must be 1-10 non-space characters!')
    return false
  }
  if (data.some((item) => item.cate_name === newName)) {
    ElMessage.error('Category name cannot be duplicated!')
    return false
  }
  return true
}

const addButtonLoading = ref(false)
const add_cate_name = ref<string>('')
const handleAdd = async () => {
  if (!checkCatName(tableData.value, add_cate_name.value)) return
  addButtonLoading.value = true
  const res = await catAddService({
    cate_name: add_cate_name.value,
    cate_alias: 'none'
  })
  if (res.code === 1) {
    ElMessage.error('Service error, please try again later')
    addButtonLoading.value = false
    return
  }
  add_cate_name.value = ''
  addButtonLoading.value = false
  ElMessage.success('Category added successfully')
  totalCat.value++
  getCatList()
}

const inputRef = ref()
const edit_cate_name = ref<string>('')
const edit = (row: catInfo) => {
  edit_cate_name.value = row.cate_name
  row.isEdit = true
  nextTick(() => {
    inputRef.value.focus()
  })
}
const handleRowClick = (row: catInfo) => edit(row)
const toView = async (row: catInfo) => {
  row.isEdit = false
  edit_cate_name.value = edit_cate_name.value.trim()
  if (edit_cate_name.value !== row.cate_name) {
    const data = tableData.value.filter((item) => item !== row)
    if (!checkCatName(data, edit_cate_name.value)) return
    try {
      await ElMessageBox.confirm(
        `Are you sure you want to change the category name to ${edit_cate_name.value}?`,
        'Warning',
        {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
    } catch (error) {
      return
    }
    row.cate_name = edit_cate_name.value
    await catUpdateService(row)
    ElMessage.success('Category updated successfully')
  }
}

const deleteCategories = async (row: catInfo[]) => {
  delButtonLoading.value = true
  const deletePromises = row.map(async (item: catInfo) => {
    await catDelService(item.id as number)
  })
  await Promise.all(deletePromises)
  totalCat.value -= row.length
  ElMessage.success('Category deleted successfully')
  getCatList()
  delButtonLoading.value = false
}
const delButtonLoading = ref(false)
const handleDelete = async (row: catInfo) => deleteCategories([row])
const deleteAll = ref(false)
const handleSelectionChange = (newSelection: catInfo[]) => {
  if (newSelection.length > 0) deleteAll.value = true
  else deleteAll.value = false
}
const handleDeleteAll = async () => {
  const selectedRow = tableRef.value.getSelectionRows()
  deleteCategories(selectedRow)
}
</script>

<template>
  <el-form inline>
    <el-form-item>
      <el-input
        v-model="add_cate_name"
        placeholder="Please enter a category name"
        @blur="add_cate_name = $event.target.value.trim()"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="!add_cate_name"
        :loading="addButtonLoading"
        @click="handleAdd"
      >
        Add Category
      </el-button>
    </el-form-item>
  </el-form>

  <el-table
    ref="tableRef"
    v-if="reload"
    :data="tableData"
    v-loading="tableLoading"
    style="width: 100%; margin: 10px 0"
    :max-height="isMobile ? 'none' : 350"
    size="large"
    header-cell-class-name="custom-header-class"
    cell-class-name="custom-cell-class"
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
  >
    <el-table-column type="selection" width="45" align="right" />
    <el-table-column label="Category Name">
      <template #default="{ row }">
        <el-input
          v-if="row.isEdit"
          size="small"
          v-model="edit_cate_name"
          ref="inputRef"
          @blur="toView(row)"
        />
        <el-link v-else :underline="false" style="font-weight: 600">
          {{ row.cate_name }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column align="right" width="125">
      <template #header>
        <el-popconfirm
          title="Are you sure to delete these categories?"
          @confirm="handleDeleteAll"
        >
          <template #reference>
            <el-button
              v-show="deleteAll"
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
        <el-button
          size="small"
          type="primary"
          icon="Edit"
          circle
          plain
          @click="edit(row)"
        ></el-button>
        <el-popconfirm
          title="Are you sure to delete this category?"
          @confirm="handleDelete(row)"
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

    <template #empty>
      <el-empty :image-size="100" />
    </template>
  </el-table>
</template>

<style scoped lang="scss">
::v-deep .custom-header-class,
::v-deep .custom-cell-class {
  height: 60px;
  padding: 16px;
  @media (max-width: 768px) {
    height: 50px;
    padding: 0px;
  }
}
::v-deep .custom-cell-class:hover {
  cursor: pointer;
}
</style>
