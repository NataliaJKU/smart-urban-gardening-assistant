<template>
  <div class="flex justify-between items-center bg-plantGreen p-4">
    <div class="text-2xl font-bold lg:hidden">SUGA</div>
    <div class="text-2xl font-bold hidden lg:block">Smart Urban Gardening Assistant</div>
    <div class="flex space-x-4 items-center">
      <div class="relative">
        <i class="absolute pi pi-search left-3 top-1/2 transform -translate-y-1/2 text-slate-400"/>
        <InputText v-model="searchInput" placeholder="Search" class="border ps-10 py-2 px-4 rounded"/>
      </div>

      <MultiSelect v-model="plantChosen" :options="plantOptions" placeholder="+ Plant" optionLabel="name" display="chip"
                    class="border px-4 rounded" :filter="true" :showToggleAll="false" :maxSelectedLabels="3">
        <template #footer>
            <Button type="button" @click="addPlant" class="w-full bg-plantGreen p-2">
              <div class="flex items-center space-x-2 mx-auto">
                <i class="pi pi-plus text-white"></i>
                <div class="text-white font-bold text-l">Plant</div>
              </div>
            </Button>
        </template>
      </MultiSelect>

      <div class=" w-[40px] h-[40px] bg-white flex rounded items-center justify-center">
        <i class="pi pi-language cursor-pointer text-[20px]" @click="showLanguagePanel" />
      </div>
      <div class=" w-[40px] h-[40px] bg-white flex rounded items-center justify-center">
        <i class="pi pi-user cursor-pointer text-[20px]" @click="showSettingsPanel"/>
      </div>
    </div>
  </div>

  <OverlayPanel ref="languagePanel" appendTo="body">
      <div v-for="language in languages" :key="language.code" @click="selectLanguage(language)"
            class="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 transition duration-300">
      <country-flag :country='language.code' size='small'/>
      <span class="me-2 cursor-pointer">{{ language.name }}</span>
    </div>
  </OverlayPanel>

  <OverlayPanel ref="settingsPanel" appendTo="body">
    <div class="flex flex-col">
      <div class="flex items-center p-2 rounded hover:bg-gray-200 transition duration-300 cursor-pointer" @click="showSettings = true">
        <i class="pi pi-cog pi-fw me-2"/> Settings
      </div>
      <div class="flex items-center p-2 rounded hover:bg-gray-200 transition duration-300 cursor-pointer"  @click="router.push('/start')">
        <i class="pi pi-power-off pi-fw text-red-400 me-2"/> Logout
      </div>
    </div>
  </OverlayPanel>

  <Dialog v-model:visible="showSettings" modal :draggable="false"  header="Settings" :style="{ width: '33vw' }">
      <!-- TODO: Settings -->
  </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()
const searchInput = ref('')
const showSettings = ref(false)
const languagePanel = ref(null)
const settingsPanel = ref(null)

const plantChosen = ref([])
const plantOptions = ref([
    { id: 1, name: 'Gänseblümchen', latinName: 'Bellis perennis', plantFamily: 'Korbblütler', floweringTime: 'März', status: 'Ideal', 
    distribution: 'Mitteleuropa', speciesCount: 15, growthHeightMin: 4, growthHeightMax: 15, funFact: 'Kann als Salbe gegen schuppige Gesichtshaut verwendet werden'},
    { id: 2, name: 'Kastanie', latinName: 'Castanea', plantFamily: 'Seifenbaumgewächse', floweringTime: 'Mai', status: 'Acceptable',     
    distribution: 'Eurasien und Amerika', speciesCount: 20, growthHeightMin: 2000, growthHeightMax: 2500, funFact: 'In Zentralasien und auf der gesamten Welt gelten Esskastanien als Delikatesse'},
    { id: 3, name: 'Mais', latinName: 'Zea mays', plantFamily: 'Süßgräser', floweringTime: 'Juli', status: 'Deficient',     
    distribution: 'Weltweit', speciesCount: 5000, growthHeightMin: 100, growthHeightMax: 300, funFact: 'In Mexiko wird Mais schon seit 3000 – 5000 v. Chr. angebaut'},
    { id: 4, name: 'Apfelbaum', latinName: 'Malus', plantFamily: 'Laubbaum', floweringTime: 'Mai', status: 'Ideal',  
    distribution: 'Weltweit', speciesCount: 40, growthHeightMin: 200, growthHeightMax: 1000, funFact: 'Lebensdauer beträgt etwa 100 Jahre'},
    { id: 5, name: 'Weizen', latinName: 'Triticum', plantFamily: 'Süßgräser', floweringTime: 'Mai', status:'Acceptable',  
    distribution: 'Weltweit', speciesCount: 20000, growthHeightMin: 50, growthHeightMax: 100, funFact: 'Einer der ältesten Sammelpflanzen ist der Wild-Emmer'},
    { id: 6, name: 'Rose', latinName: 'Rosa', plantFamily: 'Rosengewächse', floweringTime: 'Juni', status: 'Acceptable',
    distribution: 'Weltweit', speciesCount: 3000, growthHeightMin: 50, growthHeightMax: 80, funFact: 'Die Rose gilt als Symbol der Liebe'},
    { id: 7, name: 'Brennnessel', latinName: 'Urtica', plantFamily: 'Brennnesselgewächse', floweringTime: 'Juni', status: 'Acceptable',
    distribution: 'Weltweit', speciesCount: 45, growthHeightMin: 30, growthHeightMax: 120, funFact: 'Brennnesselpflanzen bilden die Lebensgrundlage für über 50 Schmetterlingsarten'}])
plantOptions.value.sort((a, b) => a.name.localeCompare(b.name))
const languages = [
  { code: 'de', name: 'German' },
  { code: 'gbr', name: 'English' }
]

const emit = defineEmits(["add-plant", "search-plant"])
watch(searchInput, (newValue) => {emit("search-plant", newValue)})

const showLanguagePanel = () => {languagePanel.value.toggle(event)}
const showSettingsPanel = () => {settingsPanel.value.toggle(event)}

function addPlant() {
  emit("add-plant", plantChosen.value)
  plantChosen.value = []
}

function selectLanguage(language) {
  //TODO: Languages
}
</script>