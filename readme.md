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

# 安装

* 全局安装

  ```bash
  npm install -g @vue/cli
  # OR
  yarn global add @vue/cli
  ```

  创建项目

  ```
  vue create vue-demo
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

  * 

