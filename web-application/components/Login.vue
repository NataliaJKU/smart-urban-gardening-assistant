<template>
  <Card shadow class="rounded p-8">
    <div class="flex-col space-y-8">
      <div class="space-y-2">
        <div class="text-2xl font-bold">Login</div>
        <div class="text-sm text-slate-400 text-justify">
          Welcome to the Smart Urban Gardening Assistant, 
          your personalized gardening companion! 
          To get started, please log in using your credentials.
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="username" class="font-bold">Benutzername</label>
        <InputText id="username" v-model="username" class="border py-2 px-4 rounded"/>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="password" class="font-bold">Passwort</label>
        <Password id="password" v-model="password" toggleMask :feedback="false" class="border rounded"/>
      </div>
      <div class="text-sm text-justify cursor-pointer text-plantGreen" @click="toggleLogin">
        New to Smart Urban Gardening Assistant? Click here to create a new account. 
        Explore the world of urban gardening with our smart features!
      </div>
      <Button @click="login" class="w-full bg-plantGreen text-center rouneded p-4">
        <div class="flex items-center space-x-2 mx-auto">
          <i class="pi pi-user text-white"/>
          <div class="text-white text-l font-bold">Login</div>
        </div>
      </Button>
      <Message v-if="wrongCredentials" severity="error" :closable="false">
        <div class="text-sm">Oops! It seems that the username or password is incorrect </div>
      </Message>
    </div>
  </Card>
</template>

<script setup>
import Card from "../components/Card.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"

const users = ref([
  {username: 'argji', password: '1234'},
  {username: 'natalia', password: '1234'},
  {username: 'valon', password: '1234'},
])
const username = ref()
const password = ref()
const wrongCredentials = ref(false)
const router = useRouter()

const emit = defineEmits(["toggle-login"])
const toggleLogin = () => emit("toggle-login", true)
function login(){
  const user = users.value.find(user => user.username === username.value)
  if (user && user.password === password.value) router.push('/main')
  else wrongCredentials.value = true
}
</script>

<style>
.p-password .p-password-input{
  width: 100% !important;
  padding: 8px 16px !important;
}
</style>