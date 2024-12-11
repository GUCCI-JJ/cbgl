<template>
  <div class="event-flow" :class="theme">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="buttons">
        <el-button v-if="!endMark" type="primary" size="small" round @click="handleShowUpdateDialog">
          <svg t="1733204329305" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="8888" width="16" height="16">
            <path
              d="M239.8 822.6c-2.5 0-5.2-0.6-8.5-1.8-9.6-3.5-14.7-14.2-11.4-23.9 20.2-59.8 81.4-205.8 89.2-221.4C457.4 279.1 614.6 144.5 870 95.4c7.8-1.4 15.5 1.9 19.6 8.5 4.1 6.6 3.8 15.1-0.9 21.4L767.4 286.5c-6.7 8.9-8.9 20.3-6 31.1l16.4 61.1c5.6 20.6 1.9 42.7-10 60.4a73.392 73.392 0 0 1-52.2 32.1l-83.8 10.4c-14.9 1.9-27.1 12.9-30.6 27.3 5.7 31-9.3 62.4-37 75.8-14.1 6.9-29.8 9-45.2 6.2l-75-13.5c-11.4-2-23.2 2.1-30.8 10.7L286.7 730.9c-2.8 6.8-15.6 39.3-22.7 57.3-2.7 6.8-4.9 12.6-7.1 17.3-0.4 1.2-0.8 2.3-1.2 3.4l-0.4-0.1c-4.5 9.2-8.8 13.8-15.5 13.8z m588-679.2c-215.9 54.3-350.7 180.8-484.8 449-2 4-7.8 17.3-15.6 35.7l57.5-64.9c16.3-18.4 41.5-27.2 65.7-22.8l75 13.5c7.6 1.4 15.2 0.3 22.1-3 13-6.3 19.7-21.9 15.9-37.1-0.6-2.4-0.7-5-0.4-7.4 5-32.5 31.3-58 63.9-62.1l83.8-10.4c10.4-1.3 19.7-7 25.5-15.7 5.8-8.7 7.6-19.4 4.9-29.5l-16.4-61.1c-6-22.1-1.5-45.3 12.3-63.6l90.6-120.6zM326.1 583.9h0.2-0.2zM435.9 941c-32.6 0-49.6-20.4-62-35.3C362 891.5 355.2 884 341 884s-21.1 7.4-33 21.7c-12.4 14.9-29.4 35.3-62 35.3s-49.5-20.4-61.9-35.3c-11.9-14.3-18.7-21.7-33-21.7-10.4 0-18.9-8.5-18.9-18.9 0-10.4 8.5-18.9 18.9-18.9 32.6 0 49.6 20.4 62 35.3 11.9 14.2 18.7 21.7 32.9 21.7s21.1-7.4 33-21.7c12.4-14.9 29.4-35.3 62-35.3s49.6 20.4 62 35.3c11.9 14.2 18.7 21.7 33 21.7 10.4 0 18.9 8.5 18.9 18.9-0.1 10.5-8.6 18.9-19 18.9z"
              fill="#ffffff" p-id="8889"></path>
          </svg>
          更新
        </el-button>
        <el-button v-if="!endMark" type="danger" size="small" round @click="handleShowEnd">
          <svg t="1733204387379" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="10029" width="16" height="16">
            <path
              d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m0 64c-212.077 0-384 171.923-384 384s171.923 384 384 384 384-171.923 384-384-171.923-384-384-384z m104 248c17.673 0 32 14.327 32 32v208c0 17.673-14.327 32-32 32H408c-17.673 0-32-14.327-32-32V408c0-17.673 14.327-32 32-32h208z"
              fill="#ffffff" p-id="10030"></path>
          </svg>
          结束
        </el-button>
        <el-text v-if="endMark" class="mx-1" type="info">
            <el-icon>
              <InfoFilled></InfoFilled>
            </el-icon>
            农事已经结束
          </el-text>
      </div>
    </div>
    <div class="timeline-container">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in timeline" :key="index" :timestamp="item.timestamp" placement="top">
          {{ item.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
  <UpdateEventDialog ref="updateEventDialog" :field_crop_id="field_crop_id" :type="type"></UpdateEventDialog>
</template>

<script setup lang="ts">
import { computed, inject, type Ref, ref } from 'vue';
import UpdateEventDialog from '../dialogs/updateEventDialog.vue';
import { endEvent } from '@/api/manage/field';

const { title, field_crop_id, type, timeline } = defineProps({
  title: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    validator(value: string) {
      return ['blue', 'green', 'orange'].includes(value)
    },
    default: 'blue'
  },
  type: {
    type: Number,
    validator(value: number) {
      return [1, 2, 3, 4].includes(value)
    },
    required: true
  },
  field_crop_id: {
    type: Number,
    required: true
  },
  timeline: {
    type: Array<{ content: String, timestamp: String, finishMark: Number }>,
    required: true
  }
})

const handleGetFields = inject('handleGetFields') as Function

//打开更新农事对话框
const updateEventDialog: Ref = ref()
const handleShowUpdateDialog = async () => {
  updateEventDialog.value.handleShow()
}

//打开结束农事弹出框
const handleShowEnd = () => {
  //@ts-ignore
  ElMessageBox.prompt('备注', '结束农事', {
    confirmButtonText: '确认结束',
    cancelButtonText: '取消',
    inputErrorMessage: 'Invalid Email',
  })
    .then(async ({ value }: { value: string }) => {
      const res = await endEvent(field_crop_id, type, value)
      await handleGetFields()
      //@ts-ignore
      ElMessage({
        type: 'success',
        message: res.msg,
      })
    })
    .catch(() => {
    })
}

const endMark = computed(() => timeline[0].finishMark)
</script>

<style lang="scss" scoped>
.event-flow {
  border-radius: 20px;
  width: fit-content;
  padding: 15px 30px 0;

  .header {
    display: flex;

    .title {
      font-size: 25px;
      font-weight: 600;
      letter-spacing: 5px;
      padding-bottom: 10px;
      padding-right: 20px;
    }
  }


}

.green {
  background-color: #F0F9EB;
  border: 1px solid #67C23A;

  .title {
    color: #67C23A;
  }
}

.blue {
  background-color: #ECF5FF;
  border: 1px solid #409EFF;

  .title {
    color: #409EFF;
  }
}

.orange {
  background-color: #FDF6EC;
  border: 1px solid #E6A23C;

  .title {
    color: #E6A23C;
  }
}
</style>