<template>
  <div id="chatgpt">
    <!-- <el-container>
      <el-container>
          <div class="chatgpt-header grid-content bg-purple-dark">
            二姨的chatgpt
          </div>  
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
                  :rows="2"
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
    </el-container> -->
    <div class="home">
      <div class="c-sidebar"></div>
      <div class="mask" style="display: none"></div>
      <div class="main">
        <div class="c-navbar">
          <el-icon class="c-navbar-menu">
            <Menu />
          </el-icon>
          <div class="title">ChatGPT</div>
          <button class="reset" @click="resetMes()">清空会话</button>
        </div>

        <div class="c-chat">
          <template v-if="clients[clientsIndex]">
            <div
              v-for="(item, index) in clients[clientsIndex].contents"
              :key="index"
            >
              <div class="c-chat-box">
                <div class="chat-box-label">
                  <div class="name">
                    <span v-if="item.role == 'user'" >admin</span>
                    <span v-else>chatgpt</span>
                  </div>
                  <div class="time">{{item.time}}</div>
                </div>
                <div class="img">
                  <img
                    v-if="item.role == 'user'"
                    class="head-img"
                    src="https://chat.qccq.cc/assets/png/user-bbe4f78b.png"
                    alt=""
                  />
                  <img
                    v-else
                    class="head-img"
                    src="https://chat.qccq.cc/assets/png/chatgpt-92989ea8.png"
                    alt=""
                  />
                </div>
                <div class="content" v-html="marked.parse(item.content)"></div>
              </div>
            </div>
          </template>
        </div>

        <div class="c-input">
          <div class="box">
            <textarea
              class="input"
              placeholder="请输入内容"
              cols="10"
              rows="2"
              v-model="message"
            ></textarea>
            <img
              @click="sendMes"
              v-if="message"
              class="send"
              src="https://chat.qccq.cc/assets/svg/send-561b5857.svg"
              alt="发送"
            />
          </div>
        </div>
      </div>
    </div>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
const message = ref<string>('')
// 消息框高度
const textareaHeight = ref<number>(2)
const clientsIndex = ref<number>(-1)
const isCollapse = ref<boolean>(true)
const showChat = ref<boolean>(true)
const time = ref<string>('')
// 消息列表
interface IMessage {
  role: 'user' | 'assistant'
  content: string
  time?:string
}
// 回话列表
interface IClient {
  name: string
  contents: Array<IMessage>
  time?:string
}
const cacheClients = window.localStorage.getItem('message-data')

const clients: Array<IClient> = reactive(
  cacheClients ? JSON.parse(cacheClients) : []
)
const hisrotryClients: Array<IClient> = reactive(
  cacheClients ? JSON.parse(cacheClients) : []
)
const apiKey = ref('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')
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
    time:new Date().getHours()+'：'+new Date().getMinutes()+'：'+new Date().getSeconds()
  })
  submit()
}
const resetMes =  ()=>{
  ElMessageBox.alert('你确定要清楚所有聊天记录吗？', '清除聊天记录', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
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
        Authorization: `Bearer ${apiKey.value}`,
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
      time:new Date().getHours()+'：'+new Date().getMinutes()+'：'+new Date().getSeconds()
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
:root {
  --white: #fff;
  --black: #111;
  --red: #e74c3c;
  --orange: #e67e22;
  --yellow: #f1c40f;
  --green: #2ecc71;
  --cyan: #1abc9c;
  --blue: #3498db;
  --purple: #9b59b6;
  --pink: #fd79a8;
  --white-10: rgba(255, 255, 255, 0.1);
  --white-25: rgba(255, 255, 255, 0.25);
  --white-50: rgba(255, 255, 255, 0.5);
  --white-75: rgba(255, 255, 255, 0.75);
  --black-25: rgba(0, 0, 0, 0.25);
  --black-50: rgba(0, 0, 0, 0.5);
  --black-75: rgba(0, 0, 0, 0.75);
  --time-250: 0.25s;
  --time-500: 0.5s;
  --time-750: 0.75s;
  --time-1000: 1s;
  --theme-color-one: #434554;
  --theme-color-two: #202125;
  --theme-color-three: #8d8c9d;
  --theme-color-four: #353541;
}

#chatgpt {
  // background-color: floralwhite;
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  .home {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    .main {
      @media screen and (max-width: 736px) {
        width: 100%;
      }
      position: relative;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
    }
    .c-sidebar {
      z-index: 3;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      width: 15.625rem;
      height: 100%;
      padding: 0.625rem 0.625rem 2rem;
      background-color: var(--theme-color-two);
      -webkit-transition: all 0.25s;
      transition: all 0.25s;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      @media screen and (max-width: 960px) {
        position: absolute;
        -webkit-transform: translateX(-100%);
        -ms-transform: translateX(-100%);
        transform: translate(-100%);
      }
    }
    .mask {
      position: absolute;
      z-index: 2;
      width: 100vw;
      height: 100vh;
      background-color: var(--black-50);
    }
    .c-navbar {
      position: absolute;
      top: 0;
      z-index: 1;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      width: 100%;
      height: 4.6875rem;
      background-color: rgba(53, 53, 65, 0.75);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      .title {
        color: var(--white);
        font-size: 1.875rem;
      }
      .c-navbar-menu {
        position: absolute;
        left: 17px;
        font-size: 1.56rem;
        color: var(--white);
      }
      .reset {
        border: none;
        background-color: transparent;
        cursor: pointer;
        position: absolute;
        right: 1rem;
        font-size: 1rem;
        color: var(--white);
      }
    }
    .c-chat {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 7.5rem 0.625rem 1.25rem;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      background-color: var(--theme-color-one);
      .c-chat-box {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: end;
        -webkit-align-items: flex-end;
        -ms-flex-align: end;
        align-items: flex-end;
        max-width: 90%;
        margin: 1.5rem 0;
        -webkit-align-self: flex-start;
        -ms-flex-item-align: start;
        align-self: flex-start;
        opacity: 1;
        transform: translateX(0%);
        transition: all 0.5s ease 0s;
        .chat-box-label {
          position: absolute;
          top: 0;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: end;
          -webkit-align-items: flex-end;
          -ms-flex-align: end;
          align-items: flex-end;
          -webkit-transform: translate(4.0625rem, calc(-100% - 0.3125rem));
          -ms-transform: translate(4.0625rem, calc(-100% - 0.3125rem));
          transform: translate(4.0625rem, calc(-100% - 0.3125rem));
          .name {
            margin-right: 0.625rem;
            font-size: 1.25rem;
            color: var(--white-25);
          }
          .time {
            color: #888;
            font-size: 1.05rem;
          }
        }
        .img {
          .head-img {
            width: 3.125rem;
            height: 3.125rem;
            margin-right: 0.9375rem;
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          overflow: auto;
          padding: 0.9375rem;
          border-radius: 1.15rem;
          font-size: 1.375rem;
          background-color: var(--theme-color-four);
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          word-break: break-word;
          color: var(--white-25);
          p{
            font-size: 1.2rem;
          }
          code{
            font-size: 1rem;
          }
        }
      }
    }
    .c-input {
      background-color: var(--theme-color-three);
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 0.9375rem;
      .box {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        min-height: 4.6875rem;
        padding: 0.625rem 1.25rem;
        border-radius: 0.4688rem;
        -webkit-box-shadow: 0 0 0.625rem rgb(0 0 0 / 25%) inset;
        box-shadow: 0 0 0.625rem rgb(0 0 0 / 25%) inset;
        background-color: var(--theme-color-one);

        .input {
          height: 100%;
          border: none;
          outline: none;
          font-size: 1.375rem;
          font-family: \5fae\8f6f\96c5\9ed1;
          background-color: transparent;
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          resize: none;
        }
        .send {
          width: 1rem;
          cursor: pointer;
          margin-left: 1rem;
          -webkit-transition: all 0.25s;
          transition: all 0.25s;
        }
      }
    }
  }
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
// ::-webkit-scrollbar {
//   width: 12px;
// }
// /* 滚动槽 */
// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
//   border-radius: 10px;
// }
// /* 滚动条滑块 */
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   background: rgba(0, 0, 0, 0.5);
//   -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
// }
</style>
