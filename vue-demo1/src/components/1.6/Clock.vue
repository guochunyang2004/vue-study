<template>
    <div>
        {{ log("render") }}
        {{ now }}
        <button @click="start = !start">{{ start ? "停止" : "开始" }}</button>
    </div>
</template>
<script>
import moment from "moment"
export default {
    data() {
      console.log('data') 
      this.moment = moment
      this.log = window.console.log
      return {
          now: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          start: false,
      } 
    },
    watch: {
        start() {
            this.startClock()
        }
    },
    beforeCreate() {
        console.log('1.beforeCreate')
    },
    created() {
        console.log('2.created')
    },
    beforeMount() {
        console.log('3.beforeMount')
    },
    mounted(){
        console.log('4.mounted')
        this.startClock()
    },
    beforeUpdate() {
        console.log('5.beforeUpdate')
    },
    updated() {
        console.log('6.updated')
    },
    beforeDestroy() {
        console.log('7.beforeDestroy')
        clearInterval(this.clockInterval)
    },
    destroyed() {
        console.log('8.destroyed')
    },
    methods: {
        startClock() {
            clearInterval(this.clockInterval)
            if (this.start){
                this.clockInterval = setInterval(() =>{
                    this.now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                },1000)
            }
            console.log('startClock')
        }
    }
}
</script>