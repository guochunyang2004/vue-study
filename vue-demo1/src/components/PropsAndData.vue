<template>
<div>
    <div>{{name}}</div>
    <div>{{info}}</div>
    <div>{{list}}</div>
      <button @click="handleBChange" >change B</button>
      <div>{{b}}</div>
</div>
</template>

<script>
export default {
    props: {
        name: String,
        info: {},
        list: []
    },
    data() {
        return {
            a: "hello",
            b: "world",
        }
    },
    methods: {
        handleBChange(){
        this.b = "vue" + Date.now()
        console.log('handleListChange',this.b)
        }
    },
    updated(){
      console.log('updated')
    }
}


</script>