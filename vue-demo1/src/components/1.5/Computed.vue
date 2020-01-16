<template>
    <div>
        <p>Reversed message1: {{reversedMessage1}}</p>
        <p>Reversed message2: {{reversedMessage2()}}</p>
        <input v-model="message" />
        <button @click="()=>$forceUpdate()">forceUpdate</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            message: "hello vue"
        }
    },
    computed: {
        reversedMessage1() {
            console.log('reversedMessage1')
            return this.message
                .split('')
                .reverse()
                .join('')
        },
        now: function() {
            return Date.now();
        }
    },
    methods: {
        reversedMessage2(){
            console.log('reversedMessage2')
            return this.message
                .split('')
                .reverse()
                .join('')
        }
    }
}
</script>