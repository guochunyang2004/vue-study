<template>
    <li >
        <slot name="pre-icon" :value="value"></slot>
        <span class="red" v-if="!del">{{title}}</span><span v-else style="text-decoration: line-through">{{title}}</span>
        <slot name="suf-icon">😄</slot>
        <button v-show="!del" @click="handlerClick">删除</button>
    </li>
</template>
<script>
export default {
    props: {
         title: String,
         del: {
             type: Boolean,
             default: false
         },
         preiconType: String,
     },
     //或
     //props: ['title','del'],
     data: function() {
         return {
             value: Math.random()
         }
     },
     methods: {
            handlerClick(){
                console.log('删除')
                this.$emit('delete',this.title,this.del)
            }
     }
}
</script>
<style scoped>
.red {
    color: red;
}
</style>