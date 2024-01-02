<template>
    <Header @add-plant="addPlant" @search-plant="searchPlant"/>
    <Filter @filter-plant="filterPlant" :plants="plants" :environmental-conditions="environmentalConditions"/>

    <DataTable :value="filterPlants" v-model:expandedRows="expandedPlants" @rowExpand="onRowExpand" paginator :rowsPerPageOptions="[5,10,25]" :rows="5" resizable-columns class="mt-8 mx-8 rounded shadow-lg">
      <Column expander />
      <template #expansion="slotProps">
        <div class="flex items-center">
          <img src="../assets/images/plantExample.jpg" alt="Plant Image" class="h-[150px] rounded me-4" />
          <div class="flex flex-col space-y-4">
            <div><strong>Distribution:</strong> {{ slotProps.data.distribution }}</div>
            <div><strong>Species Count:</strong> {{ slotProps.data.speciesCount }}</div>
            <div><strong>Growth Height:</strong> {{ slotProps.data.growthHeightMin }} - {{ slotProps.data.growthHeightMax }} cm</div>
            <div><strong>Fun Fact:</strong> {{ slotProps.data.funFact }}</div>
          </div>
        </div>
      </template>
      <Column field="name" header="Name"/>
      <Column field="latinName" header="Latin Name"/>
      <Column field="plantFamily" header="Plant Family"/>
      <Column field="floweringTime" header="Flowering Time"/>
      <Column field="status" header="Status">
        <template #body="slotProps">
          <Tag :style="{ color: slotProps.data.status === 'Ideal' ? '#B4E5B4' : (slotProps.data.status === 'Acceptable' ? '#99C2FF' : '#FF9999'),
                         backgroundColor: slotProps.data.status === 'Ideal' ? '#D6F3D6' : (slotProps.data.status === 'Acceptable' ? '#CCE5FF' : '#FFCCCC') }">
            {{slotProps.data.status}}
          </Tag>
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
            <i class="pi pi-times text-red-400 cursor-pointer" @click="confirmDeletion($event, slotProps.data)"/>
        </template>
      </Column>
    </DataTable>
    <ConfirmPopup/>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useConfirm } from "primevue/useconfirm"
import Header from "../components/Header.vue"
import Filter from "../components/Filter.vue"

const searchInput = ref('')
const plants = ref([{ id: 1, name: 'Gänseblümchen', latinName: 'Bellis perennis', plantFamily: 'Korbblütler', floweringTime: 'März', status: 'Ideal', 
    distribution: 'Mitteleuropa', speciesCount: 15, growthHeightMin: 4, growthHeightMax: 15, funFact: 'Kann als Salbe gegen schuppige Gesichtshaut verwendet werden'},
    { id: 2, name: 'Kastanie', latinName: 'Castanea', plantFamily: 'Seifenbaumgewächse', floweringTime: 'Mai', status: 'Acceptable',     
    distribution: 'Eurasien und Amerika', speciesCount: 20, growthHeightMin: 2000, growthHeightMax: 2500, funFact: 'In Zentralasien und auf der gesamten Welt gelten Esskastanien als Delikatesse'},
    { id: 3, name: 'Mais', latinName: 'Zea mays', plantFamily: 'Süßgräser', floweringTime: 'Juli', status: 'Deficient',     
    distribution: 'Weltweit', speciesCount: 5000, growthHeightMin: 100, growthHeightMax: 300, funFact: 'In Mexiko wird Mais schon seit 3000 – 5000 v. Chr. angebaut'},
    { id: 4, name: 'Apfelbaum', latinName: 'Malus', plantFamily: 'Laubbaum', floweringTime: 'Mai', status: 'Ideal',  
    distribution: 'Weltweit', speciesCount: 40, growthHeightMin: 200, growthHeightMax: 1000, funFact: 'Lebensdauer beträgt etwa 100 Jahre'}])
const expandedPlants = ref([])
const environmentalConditions = ref([{ name: 'Temperature', unit: '°C', value: 20, icon: ['fas', 'thermometer-half'], iconColor: '#FF9999' },
    { name: 'Humidity', unit: '%', value: 65, icon: ['fas', 'tint'], iconColor: '#99C2FF' },
    { name: 'Light Intensity', unit: 'Lux', value: 1800, icon: ['fas', 'sun'], iconColor: '#FFF699' }])
const environmentalConditionByPlant = ref([{
    ID: 1, plantID: 1, idealTempMin: 15, idealTempMax: 25, acceptTempMin: 10, acceptTempMax: 30, deficientTempMin: 5, deficientTempMax: 35, 
    idealHumMin: 40, idealHumMax: 70, acceptHumMin: 30, acceptHumMax: 80, deficientHumMin: 20, deficientHumMax: 90,
    idealLightMin: 500, idealLightMax: 2000, acceptLightMin: 300, acceptLightMax: 1500, deficientLightMin: 100, deficientLightMax: 500,},
  {
    ID: 2, plantID: 2, idealTempMin: 20, idealTempMax: 25, acceptTempMin: 15, acceptTempMax: 30, deficientTempMin: 10,
    deficientTempMax: 35, idealHumMin: 40, idealHumMax: 70, acceptHumMin: 30, acceptHumMax: 80, deficientHumMin: 20, deficientHumMax: 90, idealLightMin: 500,
    idealLightMax: 2000, acceptLightMin: 300, acceptLightMax: 1500, deficientLightMin: 100, deficientLightMax: 500,
  },
  {
    ID: 3, plantID: 3, idealTempMin: 20, idealTempMax: 25, acceptTempMin: 15, acceptTempMax: 30, deficientTempMin: 10,
    deficientTempMax: 35, idealHumMin: 40, idealHumMax: 70, acceptHumMin: 30, acceptHumMax: 80, deficientHumMin: 20, deficientHumMax: 90, idealLightMin: 500,
    idealLightMax: 2000, acceptLightMin: 300, acceptLightMax: 1500, deficientLightMin: 100, deficientLightMax: 500,
  },
  {
    ID: 4, plantID: 4, idealTempMin: 20, idealTempMax: 25, acceptTempMin: 15, acceptTempMax: 30, deficientTempMin: 10,
    deficientTempMax: 35, idealHumMin: 40, idealHumMax: 70, acceptHumMin: 30, acceptHumMax: 80, deficientHumMin: 20, deficientHumMax: 90, idealLightMin: 500,
    idealLightMax: 2000, acceptLightMin: 300, acceptLightMax: 1500, deficientLightMin: 100, deficientLightMax: 500,
}])

const filterChosen = ref(-1)
const filterPlant = (newValue) => filterChosen.value = newValue

const searchPlant = (newValue) => searchInput.value = newValue
const filterPlants = computed(() => {
  return plants.value
    .filter((plant) => {
      return (
        plant.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
        ((filterChosen.value === -1) ||
        (filterChosen.value === 0 && plant.status === 'Ideal') ||
        (filterChosen.value === 1 && plant.status === 'Acceptable') ||
        (filterChosen.value === 2 && plant.status === 'Deficient'))
      )
    })
    .sort((a, b) => a.name.localeCompare(b.name))
})

function addPlant(plantsChosen) {
  plantsChosen.forEach((plant) => {
    if (!plants.value.some((p) => p.id === plant.id)) plants.value.push(plant)
  })
  //setStatus()
}

const confirm = useConfirm()
const confirmDeletion = (event, plant) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to remove this plant?',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger p-button-sm',
        accept: () => {
          const plantIndex = plants.value.findIndex(p => p.id === plant.id)
          if (plantIndex !== -1) plants.value.splice(plantIndex, 1)
        }
    })
}

const onRowExpand = (event) => {expandedPlants.value = event.data ? [event.data] : []}

function setStatus(){
  plants.value.forEach((plant) => {
  const environmentalCondition = environmentalConditionByPlant.value.find((condition) => condition.plantID === plant.id);

  if (environmentalCondition) {
    const isTempDeficient =
      environmentalConditions.value[0].value < environmentalCondition.deficientTempMin ||
      environmentalConditions.value[0].value > environmentalCondition.deficientTempMax;

    const isHumidityDeficient =
      environmentalConditions.value[1].value < environmentalCondition.deficientHumMin ||
      environmentalConditions.value[1].value > environmentalCondition.deficientHumMax;

    const isLightIntensityDeficient =
      environmentalConditions.value[2].value < environmentalCondition.deficientLightMax;

    const isTempAcceptable =
      environmentalConditions.value[0].value >= environmentalCondition.acceptTempMin &&
      environmentalConditions.value[0].value <= environmentalCondition.acceptTempMax;

    const isHumidityAcceptable =
      environmentalConditions.value[1].value >= environmentalCondition.acceptHumMin &&
      environmentalConditions.value[1].value <= environmentalCondition.acceptHumMax;

    const isLightIntensityAcceptable =
      environmentalConditions.value[2].value >= environmentalCondition.acceptLightMin &&
      environmentalConditions.value[2].value <= environmentalCondition.acceptLightMax;

    if (isTempDeficient || isHumidityDeficient || isLightIntensityDeficient) plant.status = 'Deficient';
    else if (isTempAcceptable || isHumidityAcceptable || isLightIntensityAcceptable) plant.status = 'Acceptable';
    else plant.status = 'Ideal';
  }
  })
}

//onMounted(() => {setStatus()})
//watch(environmentalConditions, () => {setStatus()})
</script>

<style>
.p-datatable .p-datatable-thead > tr > th {
  background-color: #E0F9E0 !important;
}

.p-confirm-popup-accept,
.p-confirm-popup-reject {
  padding: 4px;
  margin: 4px;
}

.p-confirm-popup-accept{
  background-color: #FF9999 !important;
}
</style>