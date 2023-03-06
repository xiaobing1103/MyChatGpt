<template>
  <div id="chatgpt">
    <el-container>
      <!-- class="sider-bar" -->
      <!-- <el-aside>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">expand</el-radio-button>
          <el-radio-button :label="true">collapse</el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </el-aside> -->

      <el-container>
        <el-header>
          <el-row>
            <el-col>
              <div class="chatgpt-header grid-content bg-purple-dark">
                二姨的chatgpt
              </div></el-col
            >
          </el-row>
        </el-header>

        <section class="main">
          <section class="view">
            <p class="view-text">chatgpt基于3.5模型</p>

            <div>
              <div class="view-content">
                <span style="font-size: 30px">🤖</span> 请问你想要问我什么：
              </div>
              <template v-if="clients[clientsIndex]">
                <el-card class="box-card">
                  <div
                    class="result-content"
                    v-for="(item, index) in clients[clientsIndex].contents"
                    :key="index"
                  >
                    <div class="img">
                      <img
                        class="img-result"
                        v-if="item.role == 'user'"
                        src="@/assets/user.webp"
                        alt="You"
                      />
                      <img
                        class="img-result"
                        v-else
                        src="@/assets/logo.png"
                        alt="chatgpt"
                      />
                    </div>
                    <div
                      class="content"
                      v-html="marked.parse(item.content)"
                    ></div>
                  </div>
                </el-card>
              </template>
              <div class="send-Button">
                <el-input
                  v-model="message"
                  :rows="textareaHeight"
                  placeholder="请输入内容"
                  type="textarea"
                ></el-input>
                <el-button type="primary" @click="sendMes">发送</el-button>
              </div>
            </div>
          </section>

          <section class="before-view">
            <p class="before-viewchat">上次的聊天</p>

            <template v-if="hisrotryClients?.length">
              <div v-for="(item, index) in hisrotryClients" :key="index">
                <el-card class="box-card">
                  <div class="before-viewchat-title">
                    这个是你{{
                      index == 0 ? '上次' : `上${index + 1}次`
                    }}与人工智障的聊天记录哦
                  </div>

                  <div
                    class="result-content"
                    v-for="(item, key) in hisrotryClients[index].contents"
                    :key="key"
                  >
                    <div class="img">
                      <img
                        class="img-result"
                        v-if="item.role == 'user'"
                        src="@/assets/user.webp"
                        alt="You"
                      />
                      <img
                        class="img-result"
                        v-else
                        src="@/assets/logo.png"
                        alt="chatgpt"
                      />
                    </div>
                    <div
                      class="content"
                      v-html="marked.parse(item.content)"
                    ></div>
                  </div>
                </el-card>
              </div>
            </template>
          </section>
        </section>
      </el-container>
    </el-container>
  </div>
  <!-- <router-view /> -->
</template>

<script setup lang="ts">
import { ElLoading } from 'element-plus'
import { ref, watch, reactive } from 'vue'
import axios from 'axios'
import { marked } from 'marked'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const message = ref<string>('')
// 消息框高度
const textareaHeight = ref(2)
const clientsIndex = ref(-1)
const isCollapse = ref(true)
const showChat = ref(true)
// 消息列表
interface IMessage {
  role: 'user' | 'assistant'
  content: string
}
// 回话列表
interface IClient {
  name: string
  contents: Array<IMessage>
}
const cacheClients = window.localStorage.getItem('message-data')

const clients: Array<IClient> = reactive(
  cacheClients ? JSON.parse(cacheClients) : []
)
const hisrotryClients: Array<IClient> = reactive(
  cacheClients ? JSON.parse(cacheClients) : []
)
console.log(hisrotryClients)
/**
 * 发送消息
 */
const sendMes = () => {
  if (message.value == '' || message.value.trim() == '') {
    return
  }
  // 没有对话时
  if (clientsIndex.value == -1) {
    clients.unshift({
      name: '',
      contents: [],
    })
    clientsIndex.value = 0
  }
  // 内容存入回话
  clients[clientsIndex.value].contents.push({
    role: 'user',
    content: message.value,
  })
  submit()
}
async function submit() {
  const loading: any = ElLoading.service({
    lock: true,
    text: '人工智障正在请求数据中',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  await axios({
    method: 'post',
    url: 'https://node.fatshady.cn/cors',
    timeout: 600000,
    data: {
      method: 'POST',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        model: 'gpt-3.5-turbo',
        messages: clients[clientsIndex.value].contents,
      },
      timeout: 60000,
      headers: {
        Authorization: `Bearer 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`,
      },
    },
  })
    .then((res: any) => {
      if (res.data.status == 400) {
        throw res.data
      }
      message.value = ''
      pushResult(res.data)
      loading.close()
    })
    .catch((err) => {
      loading.close()
      message.value = ''
      pushResult(
        null,
        `网络请求错误，请联系站长排查！错误内容：\`\`\`${JSON.stringify(
          err.msg
        )}\`\`\``
      )

      // if (err.msg?.error?.code == "invalid_api_key") {
      //     messageUtil({
      //         type: "danger",
      //         content: `key 错误，请重新输入`
      //     });
      //     window.localStorage.removeItem("chatgpt-key");
      //     okKeyDialog.value = true;
      //     key.value = "";
      // }
    })
  function pushResult(res: any, errContent?: string) {
    console.log(res)
    clients[clientsIndex.value].contents.push({
      role: 'assistant',
      content: errContent ? errContent : res.data.choices[0].message.content,
    })
    window.localStorage.setItem('message-data', JSON.stringify(clients))
  }

  // 监听消息框内容变化改变高度
  watch(
    () => message.value,
    () => {
      // 根据换行符计算高度
      const lines = message.value.split('\n').length
      textareaHeight.value = lines * 24
    }
  )
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const changeproject = () => {
  showChat.value = !showChat.value
}
</script>
<style lang="less">
#chatgpt {
  // background-color: floralwhite;
}
.chatgpt-header {
  height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  line-height: 50px;
  // background-color: bisque;
  border-radius: 10px 10px 10px 0;
}
.sider-bar {
  height: calc(100vh - 50px);
  width: 300px;
  background-color: aquamarine;
}
.view {
  width: 50%;
  height: calc(100vh - 50px);
}
.view-content {
  margin: 30px auto;
}
.view-text {
  background-color: azure;
  line-height: 50px;
  font-weight: bolder;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .changeproject {
    display: none;
    @media screen and (max-width: 736px) {
      display: block;
    }
  }
}
.main {
  display: flex;
  @media screen and (max-width: 736px) {
    display: block;
    .view {
      width: 100%;
    }
    .before-view {
      width: 100%;
    }
  }
}
.sider-bar {
  min-width: 300px;
}
.result-content {
  // background-color: bisque;
  display: flex;
  padding: 30px;
  border-radius: 20px;
  border-bottom: 1px solid bisque;
  .img {
    width: 30px;
    height: 30px;
    .img-result {
      width: 30px;
      height: 30px;
    }
  }
  .content {
    margin-left: 20px;
    p {
      line-height: 30px;
    }
  }
}

.send-Button {
  display: flex;
  align-items: center;
  .el-textarea {
    margin: 0 auto;
    width: 70%;
  }
  .el-button {
    margin-right: 20px;
  }
}
.before-view {
  width: 50%;
  border: 1px solid #ccc;
  overflow: auto;
  height: calc(100vh - 50px);
  // background-color: burlywood;
}
.before-viewchat {
  height: 50px;
  font-weight: bolder;
  line-height: 50px;
  text-align: center;
}
.before-viewchat-title {
  background-color: white;
  line-height: 30px;
  text-align: center;
}
.el-header,
.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  @media screen and (max-width: 736px) {
    display: none;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.openaside {
  height: 20px;
  width: 10px;
  background-color: white;
}
/*里面的代码可以根据自己需求去进行更改*/
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 12px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
</style>
