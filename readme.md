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

* VUE 常用指令
  * v-bind:key 简写 :key
  * v-on:click 简写 @click
  * v-model 双向语法糖
  * v-show 是否显示，display:none;
  * v-text 代替 innerText
  * v-pre 直接显示Dom内部字符串，如{{}}
  * v-once 变量只解析一次，后续不渲染
  * v-cloak 几乎无用，简单项目中，使用 v-cloak 指令是解决屏幕闪动的好方法

* 自定义指令
  * 生命周期钩子
    * bind、inserted、update、componentUpdated、unbind

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

# 计算属性

* 计算属性 computed

  * 减少模板中计算逻辑
  * 数据缓存
  * 依赖固定的数据类型（响应式数据）

* 强制刷新模版 $forceUpdate()

  * ```
    <button @click="()=>$forceUpdate()">forceUpdate</button>
    ```

  * 调用计算方法

    * ```
      //只更新有变化的数据到视图
      computed: {
              reversedMessage1() {}
      },
      methods: {
              reversedMessage2(){}
      }
      ```

    * ```
      //computed 引用方法名
      <p>Reversed message1: {{reversedMessage1}}</p>
      //methods 引用 方法名+括号
      <p>Reversed message2: {{reversedMessage2()}}</p>
      ```

# 侦听器 watch

* 特点

  * 更加灵活、通用
  * watch 中可以执行任何逻辑，如函数节流，Ajax 异步获取数据，甚至操作 DOM

* vue中监听数组底层

  * https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js#L27
    通过Object.defineProperty改写了原方法，27行original是改写前记录的数组原方法，然后额外添加了Vue自己的逻辑

* 代码示例

  ```
  export default {
      data(){
          return {
              a: 1,
              b: { c: 2, d: 3 },
              e: {
                  f: {
                      g: 4
                  }
              },
              h: []
          }
      },
      watch:{
          a: function(val, oldVal) {
              this.b.c += 1;
              console.log("new: %s, old: %s",val, oldVal)
          },
          "b.c": function(val,oldVal) {
              this.b.d += 1
              console.log("new: %s, old: %s",val,oldVal)
          },
          "b.d": function(val, oldVal) {
              this.e.f.g += 1;
              console.log("new: %s, old: %s",val, oldVal)
          },
          e: {//深度监听e下的所有属性
              handler: function(val, oldVal) {
                  this.h.push("😄")
                  console.log("new: %s, old: %s",val, oldVal)
              },
              deep: true //启用深度监听
          },
          h(val, oldVal) {
              console.log("new: %s, old: %s",val, oldVal)
          },
  
      }
  }
  ```

  

# 计算属性 computed vs 侦听器 watch

	* computed 能做的，watch 都能做，反之则不行
	* 能用 computed 的尽量用 computed

# VUE 生命周期

* 创建阶段（执行一次）
  * beforeCreate
    * 之前：初始化事件和生命周期
    * 之后：数据观测、属性、侦听器配置等
  * created
    * 之后：模板编译到 render
  * beforeMount
  * render（如果写render函数这个阶段跳过）
    * 生成虚拟DOM
    * 挂载真实DOM
  * mounted
    * 异步请求、操作 DOM、定时器等
* 更新阶段（执行多次）
  * befoureUpdate
    * 依赖数据改变或$forceUpdate 强制刷新
    * 移除已经添加的事件监听器等
      * 万万不可更改依赖数据
  * render
  * updated
    * 操作 DOM 添加事件监听器等
      * 万万不可以更改依赖数据
* 销毁阶段（执行一次）
  * beforeDestory
    * 移除已经添加的事件监听器、计时器等
  * destroyed

* * 

# VUE函数式组件?

* functional:true

* 无状态、无实例、没有 this 上下文、无生命周期

* 无状态 **==** 无响应式数据

* 无实例 **==** 无this上下文

* 渲染开销低，因为函数式组件只是函数

  ```js
  //新建js文件内容
  export default {
      functional: true,
      // Props 是可选的
      props: {
        // ...
      },
      // 为了弥补缺少的实例
      // 提供第二个参数作为上下文
      render: (createElement, context) => {
          return context.scopedSlots.default && context.scopedSlots.default(context.props || {})
      }
  }
  ```

# 高级特性 provide 和 inject

* provide 提供者

  ```
  provide() {
      return {
        theme: this
      };
    },
    data() {
      return {
        color: "blue"
      };
    },
    methods: {
      changeColor(color) {
        if (color) {
          this.color = color;
        } else {
          this.color = this.color === "blue" ? "red" : "blue";
        }
      }
    }
  ```

* inject 调用

  ```
  //使用
  <h3 :style="{ color: theme.color }">E 结点</h3>
  <button @click="handleClick">改变color为green</button>
  
  //注入
  inject: {
      theme: {
        default: () => ({})
      }
    },
    methods: {
      handleClick() {
        if (this.theme.changeColor) {
          this.theme.changeColor("green");
        }
      }
    }
  ```

* 源代码：https://github.com/guochunyang2004/vue-study/tree/master/vue-demo1/src/views/1.8

* 优雅的获取跨层级组件实例

  * 定义 provide 哈希缓存方法

    ```
    provide() {
        return {
          setChildrenRef: (name, ref) => {
            this[name] = ref;
          },
          getChildrenRef: name => {
            return this[name];
          },
          getRef: () => {
            return this;
          }
        };
      },
    ```

  * 其它层注入 inject 

    ```
    inject: {
        setChildrenRef: {
          default: () => {}
        }
    },
    methods: {
    	//跨层获取父组件
        getARef() {
          console.log(this.getParentRef());
        },
        //跨层获取子组件
        getHRef() {
          console.log(this.getParentChildrenRef("childrenH"));
        }
      }
    //设置组件哈希缓存  
    <ChildrenH v-ant-ref="c => setChildrenRef('childrenH', c)" />
    ```

  * 源代码：https://github.com/guochunyang2004/vue-study/tree/master/vue-demo1/src/views/1.9

# template 和 JSX 

* template

  * 模板语法（HTML 的扩展）

  * 数据绑定使用 Mustache 语法（双大括号）

    ```
    <span>Message:{{ msg }}</span>
    ```

* JSX

  * JavaScript 的语法扩展

  * 数据绑定使用单引号

    ```
    <span>Message:{this.msg}</span>
    ```

  * JSX定义方法

    ```
    //AnchoredHeading.jsx
    export default {
      props: {
        level: {
          type: Number,
          default: 1
        }
      },
      render: function(h) {
        const Tag = `h${this.level}`;
        return <Tag>{this.$slots.default}</Tag>;
      }
    };
    
    ```

    以上代码最终编译为js文件：

    ```
    //AnchoredHeading.js
    export default {
      props: {
        level: {
          type: Number,
          default: 1
        }
      },
      //jsx 最终编译样式
      render: function(createElement) {
        return createElement(
          "h" + this.level, // 标签名称
          this.$slots.default // 子元素数组
        );
      }
    };
    
    ```

* template 和 JSX 是语法糖 

  ```
  <span>Message:{{ msg }}</span>
  和
  <span>Message:{this.msg}</span>
  ```

  

  最终编译为：

  ```
  createElement("span", `Message: ${this.msg}`)
  ```

* template vs JSX

  * template

    * 学习成本低、大量内置指令简化开发、组件作用域 CSS
    * But 灵活性低

  * JSX：灵活、灵活、灵活

  * VUE 官方文档：

    “更抽象一点来看，我们可以把组件区分为两类：一类是偏视图表现的（presentational），一类则是偏逻辑的（logical），我们推荐在前者中使用模板，在后者中使用 JSX 或渲染函数。这两类组件的比例会根据应用类型的不同有所变化，但整体来说我们发现表现类的组件远远多于逻辑类组件。”

# VUE常用工具

* ESLint 配置 （eslintConfig）

  * "plugin:vue/essential",

     "eslint:recommended"

    ```
    "extends": [
          "plugin:vue/essential",
          "eslint:recommended"
    ],
    ```

  *  "no-unused-vars": "off"

    eslintConfig>rules>：

    ```
    "rules": {
        "no-unused-vars": "off"
     },
    ```

    

* Prettier

* vue-devtools

  * 集成 Vuex
  * 可远程调试
  * 性能分析

  ​	

# VUE 常用类库

* moment 时间格式化
  * npm install moment --save
  * import moment from 'moment'
* 待更新……

# Vuex

* 状态管理模式

  * **state**，驱动应用的数据源；
  * **view**，以声明方式将 **state** 映射到视图；
  * **actions**，响应在 **view** 上的用户输入导致的状态变化。

* 安装vuex：npm i vuex

* 使用 vuex，

  * 在main.js

    ```
    import Vuex from 'vuex'
    Vue.use(Vuex) //让Vuex可以访问到Vue
    new Vue({
      store,
      render: h => h(App),
    }).$mount('#app')
    ```

  * vuex 核心概念：state、mutations、actions、getters

    * State ：this.$store.state.xxx 取值
    * Getter：this.$store.getters.xxx 取值
    * Mutation：this.$store.commit("xxx") 赋值
    * Action：this.$store.dispatch("xxx") 赋值
    * Module

  * vuex 底层原理

    * State ：提供一个响应式数据
    * Getter：借助 Vue 的计算属性 computed 来实现缓存
    * Mutation：更改 state 方法
    * Action：触发 mutation 方法
    * Module：Vue.set 动态添加 state 到响应式数据中

    ```
    const store =new Vuex.Store({
      state: {
        count: 0,
      },
      mutations: {
        increment(state,n) {
          //this.state.count++ 或
          state.count += n
        }
      }//异步请求
      actions: {
        increment({state}) {//参数是state，但只是包含state的数据
          setTimeout(()=>{
            state.count++
          },3000)
        }
      },
      //缓存作用
      getters: {
        doubleCount(state) {
          return state.count + 2
        }
      }
    })
    ```

  * ## min-vuex.js

    ```
    import Vue from 'vue'
    const Store = function Store(options = {}) {
        const {state = {}, matations={}} = options
        this._vm = new Vue({
            data: {
                $$state: state
            }
        })
        this._mutations = mutations
    }
    Store.prototype.commit = function(type, payload){
        if (this._mutations[type]){
            this._mutations[type](this.state,payload)
        }
    }
    Object.defineProperties(Store.prototype,{
        state: {
            get: function(){
                return this._vm._data.$$state
            }
        }
    })
    export default {Store}
    ```

    需设置：Vue.prototype.$store = store

  * 同步调用：$store.commit

    ```
    <button @click="$store.commit('increment',2)">count++</button>
    ```

  * 异步调用：$store.dispatch

    ```
    <button @click="$store.dispatch('increment')">count++</button>
    ```

  * getter

    ```
     {{$store.getters.doubleCount}}
    ```

  * vuex 最佳实践

    * Module

      * 开启命名空间 namespaced:true
      * 嵌套模块不要过深，尽量扁平化
      * 灵活应用 createNamespacedHelpers

    * map：mapState、mapActions、、

      ```
      import { mapState, mapActions } from 'vuex'
      
      export default {
        computed: mapState({
          products: state => state.products.all,
        }),
        // computed: {
        //   products(){
        //     return this.$store.state.products.all
        //   }
        // },
        methods: mapActions('cart', [
          'addProductToCart',this.inputAmunt
        ]),
        // methods: {
        //   addProductToCart(product){
        //     this.$store.dispatch('cart/addProductToCart', product)
        //   }
        // },
        created () {
          this.$store.dispatch('products/getAllProducts')
        },
        //
        data(){
          return {
            inputAmunt:0
          }
        }
      }
      ```


# Vue Router

* 解决的问题
  * 监听 URL 的变化，并在变化前后执行相应的逻辑
  * 不同的 URL 对应不同的组件
  * 提供多种方式改变 URL的API（URL 的改变不能导致浏览器刷新）
* 使用方式
  * 提供一个路由配置表，不同 URL 对应不同组件的配置
  * 初始化路由实例 new VueRouter()
  * 挂载到 Vue 实例上
  * 提供一个路由占位，用来挂载 URL 匹配到的组件
* 路由类型
  * Hash 模式：丑，无法使用锚点定位
  * History 模式：需要后端配合，IE9 不兼容（可使用强制刷新处理）
* 底层原理
  * 

# 常用图标使用

* 雪碧图：
  * 把一个个小的图片合并成大的图片，通过css设置大小和位置展示具体的图标
  * 特点：1.拼接图片、2.不同颜色的图标需要拼接，图片调整大小也不方便，图片放大后会模糊；
* 字体：
  * 成熟方案，i-vue和element-vue都在使用，antd之前的方案
  * 不能支持多色图标，相当于输出的汉子和英文字母
* SVG：
  * 通过组件的封装，不仅可以和字体一样方便，而且可以使用多色图标
  * antd的几个版本的图标已切换为svg图标
  * 推荐阿里图标管理平台：https://www.iconfont.cn/

# Nodejs

* cli配置导出命名

  vue inspect > output.js

# 打包优化

* 优化方法：

  * 组件按需加载：babel中组件库按需加载；
  * 图标按需加载
  * 路由懒加载和拆包：路由中使用webpackChunkName
  * lodash引用具体方法，打包会小

  ``` 
  import debounce from "lodash/debounce"
  ```

  ​	而不是把lodash全部引入使用，会把库全部打包

  ```
  import { debounce } from "lodash"
  ```

* npm 命令

  生成打包报告(优化打包)

  ```
  npm run build -- --report
  #结果：/dist/report.html
  ```

  

