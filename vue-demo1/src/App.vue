<template>
  <div id="app">
    <ul>
      <li>
        <span v-bind:class="{current: num == 1}" v-on:click="change(1)">第一课</span>
      </li>
      <li>
        <span v-bind:class="{current: num==2}" v-on:click="change(2)">时钟</span>
      </li>
      <li>
        <span v-bind:class="{current: num==3}" v-on:click="change(3)">函数式组件</span>
      </li>
    </ul>
    <div class="content">
      <transition name="fade">
        <div v-show="num == 1">
          <input v-model="message" />
          <input :value="message" @input="handleChange" />
          {{message}}
          <todo-list>
            <template v-slot>
              <todo-item
                @delete="handleDelete"
                v-for="(item, index) in list"
                v-bind:key="index"
                data-test="dd"
                :title="item.title"
                v-bind:del="item.del"
              >
                <template v-slot:pre-icon="{value}">
                  <span v-if="value<0.5">前置图标1</span>
                  <span v-else>前置图标2</span>
                </template>
              </todo-item>
            </template>
          </todo-list>

          <input type="button" value="change name" @click="handleChangeName" />
          <button @click="handleInfoChange">change info</button>
          <button @click="handleInfoXChange">change info.x</button>
          <button @click="handleListChange">change list</button>
          <PropsAndData :name="name" :info="info" :list="list"></PropsAndData>
          <Computed></Computed>
          <Watch />
          <Computed1 />
          <h1>watch</h1>
          <Watch1 />
        </div>
      </transition>
      <transition name="move">
        <div v-show="num == 2">
          <button @click="loadClock">
            {{ destroyClock ? "加载时钟" : "销毁时钟"}}
          </button>
          <Clock v-if="!destroyClock"/>
        </div>
      </transition>
      <transition name="fade">
        <div v-show="num == 3">
          <TempVar v-bind-var1="hello"
            :var1="destroyClock ? 'hello vue' : 'hello world'"
          >
            <template v-slot="{ var1, var2 }">
              {{ var1 }}
              {{ var2 }}
            </template>
          </TempVar>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import TodoItem from "./components/TodoItem.vue";
import PropsAndData from "./components/PropsAndData";
import Computed from "./components/1.5/Computed";
import Computed1 from "./components/1.5/Computed1";
import Watch from "./components/1.5/Watch";
import Watch1 from "./components/1.5/Watch1";
import Clock from "./components/1.6/Clock"
import TempVar from "./components/1.6/TempVar"

let name = "world";
export default {
  name: "app",
  components: {
    TodoList,
    TodoItem,
    PropsAndData,
    Computed,
    Computed1,
    Watch,
    Watch1,
    Clock,
    TempVar
  },
  data() {
    //方法return返回对象
    //this.name = name
    return {
      destroyClock:false,
      num: 1,
      name: name,
      //info: {},
      info: {
        number: 0
      },
      message: "hello world",
      list: [
        {
          title: "课程1",
          del: false
        },
        {
          title: "课程2",
          del: false
        },
        {
          title: "课程3",
          del: true
        }
      ]
    };
  },
  watch: {
    destroyClock(val,oldVal){
      console.log(val,oldVal)

    }
  },
  methods: {
    loadClock() {
      this.destroyClock = !this.destroyClock
      console.log('loadClock',this.destroyClock)
    },
    change: function(index) {
      this.num = index;
    },
    handleChange(e) {
      this.message = e.target.value;
    },
    handleDelete(val) {
      this.$.emit("update:title", "测试");
      console.log("handleDelete", val);
    },
    handleChangeName() {
      this.name = "vue" + Date.now();
      console.log("handleChangeName", this.name);
    },
    handleInfoChange() {
      this.info.number++;
      console.log("handleInfoChange", this.info);
    },
    handleInfoXChange() {
      this.$set(this.info, "x", "xxx");
      console.log("handleInfoXChange", this.info);
    },
    handleListChange() {
      this.list.push(1, 2);
      console.log("handleListChange", this.list);
    }
  }
};
</script>
<style scoped>
ul {
  height: 25px;
  border-bottom: 1px solid rgba(185, 178, 178, 0.404);
  list-style-type: none;
}

ul li {
  float: left;
  border-color: #000;
  cursor: pointer;
  margin-right: 15px;
}

.current {
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */
 
 {
  opacity: 0;
}

.move-enter,
.move-leave-to {
  transform: translateY(10px) rotate(360deg);
}

.move-enter-active,
.move-leave-acitve {
  transition: all 1s;
}
</style>