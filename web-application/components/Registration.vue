<template>
  <Card shadow class="rounded p-8">
    <div class="flex-col space-y-8">
      <div class="space-y-2">
        <div class="text-2xl font-bold">Registration</div>
        <div class="text-sm text-slate-400 text-justify">
          Welcome to the Smart Urban Gardening Assistant, 
          your personalized gardening companion! Begin your journey by creating an account.
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="username" class="font-bold">Benutzername</label>
        <InputText id="username" v-model="username" class="border py-2 px-4 rounded"/>
      </div>
      <div class="flex flex-col space-y-2">
        <label for="password" class="font-bold">Passwort</label>
        <Password id="password" v-model="password" toggleMask class="border rounded">
          <template #header>
            <div class="font-bold">Suggestions</div>
          </template>
          <template #footer>
            <ul>
              <li>- Minimum 8 characters</li>
              <li>- At least one numeric character</li>
              <li>- At least one lowercase and one uppercase letter</li>
            </ul>
          </template>
        </Password>
      </div>
      <div class="text-sm text-justify cursor-pointer text-plantGreen" @click="toggleLogin">
        Already have an account and eager to get back to your green oasis? No problem! Click here to log in!
      </div>
      <Button @click="register" class="w-full bg-plantGreen text-center rouneded p-4">
        <div class="flex items-center space-x-2 mx-auto">
          <i class="pi pi-user-plus" style="color: white"/>
          <div class="text-white text-l font-bold">Register</div>
        </div>
      </Button>
      <Message v-if="wrongCredentials" severity="info" :closable="false">
        <div class="text-sm">Oops! It seems like the user already exists </div>
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
const username = ref(null)
const password = ref(null)
const wrongCredentials = ref(false)
const router = useRouter()

const emit = defineEmits(["toggle-login"])
const toggleLogin = () => emit("toggle-login", false)
function register(){
  if (username.value !== null && password.value !== null &&
      !users.value.some(user => user.username === username.value)){
        users.value.push({ username: username.value, password: password.value })
        router.push('/main')
      }
  else wrongCredentials.value = true
}
</script>

<style>
.p-password .p-password-input{
  width: 100% !important;
  padding: 8px 16px !important;
}
</style>