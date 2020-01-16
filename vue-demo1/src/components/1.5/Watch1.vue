<template>
    <div>
        {{fullName}}
        <div>
            firstName: <input v-model="firstName">
        </div>
        <div>
             lastName: <input v-model="lastName">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fullName: '',
            firstName: '',
            lastName: '',
        }
    },
    watch: {
        firstName(val,oldVal){
            console.log("new: %s, old: %s", val, oldVal)
            this.fullName = this.firstName + ' ' + this.lastName
        },
        lastName(val, oldVal) {
            console.log("new: %s, old: %s", val, oldVal)
            this.fullName = this.firstName + ' ' + this.lastName
        }
    }
}
</script>