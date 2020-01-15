# 指令

* mustache 模版引擎
  * jquery模板引擎
  * vue参数考此引擎 
  * 项目地址：http://mustache.github.io/
* {{}} 
  * 只支持表达式，不支持变量
* 指令：一个标志位
  * v-bind:id='变量名'  简写 :id='变量名'
  * v-if、v-else
  * v-show：是否显示，隐藏时候元素已挂载dom，样式为display: none;
  * v-for：循环

# 组件

* 组件作用：复用

* 组件定义Vue.component

  * Vue.component 定义的第一个参数【组件名称】要保证全局唯一
  * Vue.component内部的template可用2个反引号`（数字1左边的按键）包扩可换行字符串（es6支持）

  ```vue
  Vue.component('todo-item',{
       props: {
           title: String,
           del: {
               type: Boolean,
               default: false
           }
       },
       //或
       //props: ['title','del'],
       template: `
       <li >
          <span v-if="!del">{{title}}</span><span v-else style="text-decoration: line-through">{{title}}</span><button v-show="!del">{{title}}
          </button></li>`,
       data: function() {
           return {}
       },
       methods: {
  
       }
   })
  ```

* 组件使用

  ```vue
  <todo-item v-for="item in list" data-test="dd" :title="item.title" v-bind:del="item.del" ></todo-item>
  ```

* 组件插槽：<slot></slot>，插槽内部嵌套子组件

  * 插槽是传递复杂内容的一种方式

  * 基本使用

    ```
    <todo-list >
        <todo-item @delete="handleDelete" v-for="item in list" data-test="dd" :title="item.title" v-bind:del="item.del" ></todo-item>
      </todo-list>
    ```

  * 默认插槽：可以省略，同上

    ```
    <template v-slot>……</template>
    ```

    

  * 命名插槽

    ```vue
    //定义
    <slot name="pre-icon"></slot>
    <span>标题</span>
    <slot name="suf-icon"></slot>
    
    //vue2.5语法引用 
    <span slot="pre-icon">前置图标</span>
    <span slot="suf-icon">后置图标</span>
    
    //vue2.6语法引用
    <template v-slot:pre-icon>
         <span>前置图标</span>
    </template>
    <template v-slot:suf-icon>
        <span>后置图标</span>
    </template>
    ```

  * 子组件传参数给父组件：可根据子组件值显示不同图标

    * 子组件定义模拟参数value

      * ```javascript
        data: function() {
                 return {
                     value: Math.random()
                 }
        }
        ```

    * 调用组件

      * ```vue
        <template v-slot:pre-icon="{value}">
             <span v-if="value<0.5">前置图标1</span>
             <span v-else >前置图标2</span>
        </template>
        ```

  * 插槽默认值：调用组件时不传递插槽

  * 插槽template调用：是一个返回组件的函数，组件内部slot调用这个函数并传参数value，返回span标签

* 组件事件(文档：https://cn.vuejs.org/v2/guide/events.html)

  * 原生dom绑定事件：@click="handlerClick"

  * 自定义组件绑定方法：@delete="handleDelete"，需要在组件内部手动抛出事件：this.$emit('delete',参数1,参数2)

    ```vue
    template: `
         <li >
            <span v-if="!del">{{title}}</span><span v-else style="text-decoration: line-through">{{title}}</span>
            <button v-show="!del" @click="handlerClick">删除</button>
            </button></li>`,
         data: function() {
             return {}
         },
         methods: {
                handlerClick(){
                    console.log('删除')
                    this.$emit('delete',this.title,this.del)
                }
         }
    ```

    

  *  Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel

  * 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除

  * 事件冒泡

    * v-on:click.stop 阻止单击事件继续传播

  * 

# 单文件模式

* 全局安装

  ```bash
  npm install -g @vue/cli
  # OR
  yarn global add @vue/cli
  ```

  创建项目

  ```
  vue create vue-demo
  
  //启动调试
  npm run dev
  ```

* App.vue

  * data用函数返回return对象而不是直接定义对象，因为App.vue已不是根实例有可能被复用，根实例是main.js中的new Vue()

  * ```
    data(){//对象return返回
        return {
          message: 'hello world',
        }
    }
    ```

* 导入局部作用域组件（局部注册）

  * 只在当前vue文件中有效

  * import TodoList from ./组件目录/文件名.vue

  * 注册组件到当前页

    ```
    components: {
      TodoList,TodoItem
    },
    ```

* 导入全局作用域组件（全局注册）

* vue内局部css

  * style样式标签加scope，前端生成css哈希值

    ```
    <style scoped>
    .red {
        color: red;
    }
    </style>
    
    <span class="red"></span>
    ```

  * 预览效果

    ```
    <style type="text/css">
    .red[data-v-33df0029] {
        color: red;
    }
    </style>
    
    <span data-v-33df0029></span>
    ```

# 双向绑定

* 总结：vue的双向绑定是单向数据流，v-model是简写

* 单向绑定 vs 双向绑定：https://segmentfault.com/q/1010000019491720

* 绑定语法

  * v-model 语法糖：v-model="变量" //data()方法内return{变量名}的变量名

  * v-model原始形式：

    ```
     <input :value="message" @input="handleChange" >
    handleChange(e){
          this.message = e.target.value
    }
    ```

    - text 和 textarea 元素使用 `value` 属性和 `input` 事件；
    - checkbox 和 radio 使用 `checked` 属性和 `change` 事件；
    - select 字段将 `value` 作为 prop 并将 `change` 作为事件。

* 自定义组件

  * 自定义组件绑定必须加key：v-bind:key=

  * 单个属性双向绑定 v-model：

    https://cn.vuejs.org/v2/guide/components-custom-events.html

  * 多个属性双向绑定 v-model ：

    .sync（2.3.0+ 新增）  https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6

# 虚拟DOM

* 虚拟 DOM 树？

* 触发组件更新

  * View是数据驱动的视图框架，数据驱动就是Dom是通过数据来映射的，只有数据改变时候视图才会改变

  * 没有特殊情况不要操作Dom

  * 数据来源

    * 父元素的属性
    * 组件自身的状态 data
    * 状态管理器，如 vuex，Vue.observable

  * 状态 data vs 属性 props

    * 状态是组件自身的数据
    * 属性是来自父组件的数据
    * 状态的改变未必会触发更新（updated方法）
    * 属性的改变未必会触发更新（updated方法）

  * 触发更新(updated)的必要条件

    * data 的return 内部有定义： return { info: {number: undefined} }
    * 必须在视图中有引用：{{info.number}}
    * Vue.set 或 全局方法 vm.$set突破以上2条限制
    * 对象赋值多个新属性：Object.assign() 或 _.extend()

  * 数组触发更新

    * 数组支持响应式更新的方法：push()，pop()，shift()，unshift()，splice()，sort()，reverse()，因为这些方法会改变原数组。

    * 不支持响应式更新的方法：filter()，concat()，slice()，这3个放法会返回新数组，可以用新数组替换原数组解决

      * ```
        vm.items[1] = 'x' // 不是响应性的
        vm.items.length = 2 // 不是响应性的
        ```

      * ```
        vm.$set(vm.items, indexOfItem, newValue) // 响应性的
        vm.items.splice(newLength) // 响应性的
        ```

  * Watcher：保存视图中使用的data变量，当变量变化时Watcher监视变化后通知视图

  * 详细参考：https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9