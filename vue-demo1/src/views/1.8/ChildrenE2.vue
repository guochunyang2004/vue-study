<template>
    <div>
        <h3 :style="{backgroundColor: theme1.color}">E2 节点</h3>
        <button @click="changeColor">变色</button>
    </div>
</template>
<script>
export default {
    data() {

    },
    inject :{
        theme1: {
            from: "theme",
            default: () => ({})
        }
    },
    methods: {
        changeColor() {
            this.theme1.changeColor('yellow')
        }
    }
}
</script>