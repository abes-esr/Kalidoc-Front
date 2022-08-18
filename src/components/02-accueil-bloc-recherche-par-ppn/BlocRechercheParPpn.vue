<template>
  <v-container>
    <v-card-title>Liste de ppn &nbsp;<v-btn outlined small @click="removeAllItems">Vider toute la saisie</v-btn></v-card-title>
    <v-combobox append-icon="" :search-input.sync="lastValuesTypedOrPasted" :value="ppnListCombobox" @blur="checkValuesAndFeedPpnListTyped" :rules="comboboxAlert" multiple outlined small-chips :label="comboboxPpnLabel" class="style2">
      <template v-slot:selection="{item}">
        <v-chip close @click:close="removeItem(item)">
          <span class="pr-2">{{ item }}</span>
        </v-chip>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
import { useAnalyseStore } from "@/stores/analyse";
import { storeToRefs } from "pinia/dist/pinia";
import { ref } from 'vue';

export default {
  setup() {
    const analyseStore = useAnalyseStore(); //Store
    let comboboxPpnLabel = ref('Entrez des PPN ou collez une liste de PPN puis cliquez à l\'extérieur du cadre avec votre souris'); //Message indicatif de la combobox
    let comboboxAlert = ref([]) ; //Alerte indiquant les ppn érronés, et la syntaxe à respecter
    let lastValuesTypedOrPasted = ref(''); //Dernière Chaîne de caractères saisie dans la combobox, servant à alimenter ensuite ppnListTyped
    let ppnListCombobox = ref([]); //Tableau de ppn alimenté par les chaînes de caractères mises dans la combobox

    /**
     * Suppression d'un élément ppn déclenché au moment du clic sur la croix
     * @param item le ppn en question
     */
    function removeItem(item){
      const index = ppnListCombobox.value.indexOf(item);
      ppnListCombobox.value.splice(index, 1);
      analyseStore.setPpnValidsList(ppnListCombobox.value); //Alimentation du store avec les ppn valides
    }

    /**
     * Suppression de l'ensemble des éléments de la combobox
     */
    function removeAllItems(){
      if(!!ppnListCombobox.value){
        ppnListCombobox.value = [];
        comboboxAlert.value = [];
        analyseStore.setPpnValidsList(ppnListCombobox.value); //Alimentation du store avec les ppn valides
      }
    }

    /**
     * Contrôle des chaînes de caractères saisies dans la combobox à la sortie de la souris du champ et alimentation de ppnListTyped
     */
    function checkValuesAndFeedPpnListTyped(){
      //TODO dédoublonnage également des ppn deja a la saisie
      if(!!lastValuesTypedOrPasted.value){ //Si la valeur n'est pas nulle, ce qui se produit si l'utilisateur sort du cadre sans rien taper
        console.log(lastValuesTypedOrPasted.value.split(/[^\da-zA-Z]/));
        let arrayWithValidsPpn = lastValuesTypedOrPasted.value.split(/[^\da-zA-Z]/).filter(ppn_to_check => ppn_to_check.match(/^(\d{8}(\d|X|x))$/));
        let arrayWithInvalidsPpn = lastValuesTypedOrPasted.value.split(/[^\da-zA-Z]/).filter(ppn_to_check => !ppn_to_check.match(/^(\d{8}(\d|X|x))$/)).filter(str_to_clean => str_to_clean.trim() !== '');
        let arrayWithValidsPpnWithUniqueValues = arrayWithValidsPpn.filter((v, i, a) => a.indexOf(v) === i); //Fonction anonyme de dédoublonnage sur la saisie en cours
        let arrayWithInvalidsPpnWithUniqueValues = arrayWithInvalidsPpn.filter((v, i, a) => a.indexOf(v) === i); //Fonction anonyme de dédoublonnage sur la saisie en cours
        comboboxAlert.value = [ "Ppn invalides détectés dans ce que vous avez inséré : " + arrayWithInvalidsPpnWithUniqueValues.toString(), "", "" ]
        arrayWithValidsPpnWithUniqueValues.forEach(currentValidPpn => ppnListCombobox.value.push(currentValidPpn));
        analyseStore.setPpnValidsList(ppnListCombobox.value); //Alimentation du store avec les ppn valides
      }
      lastValuesTypedOrPasted.value = ''; //On vide la chaîne puisqu'on à alimenté les valeurs valides dans :value="ppnListCombobox"
    }

    return {
      comboboxPpnLabel,
      comboboxAlert,
      lastValuesTypedOrPasted,
      ppnListCombobox,
      removeItem,
      removeAllItems,
      checkValuesAndFeedPpnListTyped
    }
  }
};
</script>
