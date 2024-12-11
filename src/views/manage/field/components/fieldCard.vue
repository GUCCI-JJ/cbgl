<template>
  <el-card shadow="hover" width="100%">
    <template #header>
      <div class="card-header">
        <div class="left">
          <div class="field-name">{{ field.field_name }}</div>
          <div class="field-area">总面积 {{ field.field_area }} 亩</div>
          <div class="location">位置 : {{ field.location }}</div>
        </div>
        <div class="right">
          <el-button type="primary" size="large" @click="sendField" icon="Plus">添加作物</el-button>
        </div>
      </div>
    </template>
    <div v-if="field.cropList.length" class="card-body" v-for="item in field.cropList">
      <el-card shadow="hover">
        <div class="crop-header">
          <div class="info-item">
            <div>作物 : </div>
            <div>{{ item.crop_name }}</div>
          </div>
          <div class="info-item">
            <div>面积</div>
            <div>{{ item.crop_area }} 亩</div>
          </div>
          <el-button icon="Paperclip" type="success" @click="handleShowStartEvent(item.field_crop_id)">
            开始农事
          </el-button>
          <el-text v-if="!item.seed" class="mx-1" type="warning">
            <el-icon>
              <InfoFilled></InfoFilled>
            </el-icon>
            当前作物还没有播种
          </el-text>
        </div>

        <div class="info-event-container">
          <div v-if="item.seed" class="info-list">
            <div class="info-item">
              <div>健康状态</div>
              <div>
                <el-tag v-if="item.health === 1" type="success">健康</el-tag>
                <el-tag v-if="item.health === 2" type="danger">不健康</el-tag>
              </div>
            </div>
            <div class="info-item">
              <div>已施肥</div>
              <div>{{ item.fertilize }} 次</div>
            </div>
            <div class="info-item">
              <div>已打药</div>
              <div>{{ item.medicine }} 次</div>
            </div>
          </div>

          <div class="event-container">
            <EventFlow v-for="t in item.operationList" :title="actionMap[t.type]" :field_crop_id="item.field_crop_id"
              :type="t.type"
              :timeline="t.timeline.map(o => ({ content: o.remark, timestamp: o.date, finishMark: o.finish_mark }))">
            </EventFlow>
          </div>
        </div>

      </el-card>
    </div>
    <div v-else class="unhoed">
      <el-text class="mx-1" type="info">
        <el-icon>
          <InfoFilled></InfoFilled>
        </el-icon>
        这块土地还没有作物
      </el-text>
    </div>
    <StartEventDialog ref="startEventDialogRef" :field_crop_id="curFieldCropId"></StartEventDialog>
  </el-card>
</template>

<script setup lang="ts">
import type { Field } from '@/tools/manageDataForm';
import { ref, type PropType, type Ref } from 'vue';
import StartEventDialog from '../dialogs/startEventDialog.vue';
import EventFlow from './eventFlow.vue';
const { field, addCropDialogRef } = defineProps({
  field: { type: Object as PropType<Field>, required: true },
  //添加作物对话框ref
  addCropDialogRef: { type: Object, require: true }
})

//农事映射
const actionMap = {
  1: '翻地',
  2: '播种',
  3: '施肥',
  4: '打药'
}

//开始农事
const curFieldCropId: Ref = ref(0) //当前的土地作物
const startEventDialogRef: Ref = ref()
const handleShowStartEvent = (id: number) => {
  curFieldCropId.value = id
  startEventDialogRef.value.handleShow()
}

//添加作物:传当前field给index
const emit = defineEmits()
const sendField = (): void => {
  emit("sendField", field)
  //显示添加作物对话框
  if (addCropDialogRef)
    addCropDialogRef.handleShow()
}
</script>

<style lang="scss" scoped>
:global(.el-card__header) {
  // background-color: #faeded;
  // background-color: #EDF2FA;
  background-color: #EDF2FA;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;

    .field-name {
      font-weight: 600;
      font-size: 20px;
      color: rgb(32.4, 32.7, 33.3);
    }

    .field-area {
      color: rgb(82, 83.5, 86.5);
      padding: 0 20px;
      border-right: 1px solid rgb(166.2, 168.6, 173.4);
    }

    .location {
      color: rgb(82, 83.5, 86.5);
      padding: 0 20px;
    }
  }


}

.card-body {
  &:not(:first-child) {
    padding-top: 10px;
  }

  &:not(:last-child) {
    // border-bottom: 1px solid var(--el-border-color);
    padding-bottom: 10px;
  }

  .crop-header{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    .info-item{
      display: flex;
      padding-right: 20px;
      gap: 10px;
      &:not(:last-child){
        border-right: 1px solid rgb(166.2, 168.6, 173.4);
      }
      &:not(:first-child){
        padding-left: 20px;
      }
    }
  }

  .info-event-container {
    display: flex;

    .event-container {
      display: flex;
      gap: 10px;
    }
  }



  .crop-name {
    padding-bottom: 5px;
    font-weight: 500;
  }

  .info-list {
    display: flex;

    .info-item {
      flex: 1;
    }
  }
}

.unhoed {
  display: flex;
  justify-content: center;
}
</style>