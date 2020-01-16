<template>
    <div>
        {{ fullName }}<br />
        firstName：<input v-model="firstName" ><br />
        lastName : <input v-model="lastName" ><br />
    </div>
</template>
<script>
export default {
    data() {
        return {
            //fullName: String,
            firstName: '',
            lastName: '',
        }
    },
    computed:{
        fullName(){
            return this.firstName + ' ' + this.lastName
        }
    },
    watch: {
        fullName(val, oldVal) {
            console.log("new: %s, old: %s", val, oldVal)
        }
    }
}
</script>