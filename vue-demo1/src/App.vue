<template>
  <div id="app">
    <input v-model="message" >
    <input :value="message" @input="handleChange" >
  {{message}}
    <todo-list >
    <template v-slot>
        <todo-item @delete="handleDelete" v-for="(item, index) in list"  v-bind:key="index" data-test="dd" :title="item.title" v-bind:del="item.del" >
            <template v-slot:pre-icon="{value}">
                <span v-if="value<0.5">前置图标1</span>
                <span v-else >前置图标2</span>
            </template>
        </todo-item>
    </template>
  </todo-list>


    <input type="button" value="change name" @click="handleChangeName" >
    <button @click="handleInfoChange" >change info</button>
    <button @click="handleInfoXChange" >change info.x</button>
    <button @click="handleListChange" >change list</button>
    <PropsAndData :name="name" :info="info" :list="list" ></PropsAndData>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import TodoItem from './components/TodoItem.vue'
import PropsAndData from './components/PropsAndData'

let name = "world"
export default {
  name: 'app',
  components: {
    TodoList,TodoItem,PropsAndData
  },
  data(){//方法return返回对象
    //this.name = name
    return {
      name : name,
      //info: {},
      info: {
        number: 0
      },
      message: 'hello world',
      list:[
        {
          title: '课程1',del: false
        },
        {
          title: '课程2',del: false
        },
        {
          title: '课程3',del: true
        }
      ]
    }
  },
  methods: {
    handleChange(e){
      this.message = e.target.value
    },
    handleDelete(val){
      this.$.emit('update:title','测试')
      console.log('handleDelete',val)
    },
    handleChangeName(){
      this.name = 'vue' + Date.now();
      console.log('handleChangeName',this.name)
    },
    handleInfoChange(){
      this.info.number++
      console.log('handleInfoChange',this.info)
    },
    handleInfoXChange(){
      this.$set(this.info, 'x', 'xxx')
      console.log('handleInfoXChange',this.info)
    },
    handleListChange(){
      this.list.push(1,2)
      console.log('handleListChange',this.list)
    }
  }
}
</script>