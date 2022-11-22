<template>
  <v-container>
    <v-row class="ma-0 pa-0">
      <v-icon color="#252C61">mdi-numeric-1-box</v-icon>
      <span style="font-size: 1.26em; color : #252C61; font-weight: bold;">Ajouter des PPN</span>
    </v-row>
    <v-container class="pa-2 ma-0 borderAddPpn">
      <div class="pl-0 pr-0 mb-5 text-justify fontPrimaryColor" style="font-size: small">Pour optimiser l'analyse, il est recommandé de ne pas soumettre plus de xxxxxxx PPN en une seule fois</div>
      <v-combobox filled append-icon="" @keydown.enter="checkValuesAndFeedPpnListTyped" :search-input.sync="lastValuesTypedOrPasted" :value="ppnListCombobox" @blur="checkValuesAndFeedPpnListTyped" multiple small-chips :label="comboboxPpnLabel" class="pa-1">
        <template v-slot:selection="{item}">
          <v-chip close @click:close="removeItem(item)">
            <span class="pr-2">{{ item }}</span>
          </v-chip>
        </template>
      </v-combobox>
      <v-container class="d-flex align-end flex-column pt-0 mb-14 pr-1" style="margin-top: -34px;"><v-btn class="pe-1" depressed small tile @click="removeAllItems" style="border: 1px solid grey; color: grey">Vider la liste de ppn<v-icon color="grey">mdi-delete</v-icon></v-btn></v-container>
      <v-alert v-if="analyseStore.getPpnInvalidsList.length !== 0" border="left" colored-border type="error" elevation="0">
        Les PPN listés ci-dessous présentent une syntaxe non conforme et ne seront pas analysés :<br>
        <span style="color: darkgrey; font-size: small">Syntaxe d'un PPN : (9 caractères, composés de 9 chiffres ou de 8 chiffres + la lettre X)</span><br>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              PPN saisi(s) avec une syntaxe érronée (cliquer pour dérouler)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-chip color="red" outlined v-for="(item, index) in analyseStore.getPpnInvalidsList" :key="index">{{ item }}</v-chip>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-alert>
    </v-container>
  </v-container>
</template>

<script setup>
import { useAnalyseStore } from "@/stores/analyse";
import { ref } from 'vue';

const analyseStore = useAnalyseStore(); //Store
const emit = defineEmits(['isPpnListEmpty']); //Evenement envoyé au parent avec un booléen indiquant si la liste est vide ou non
let comboboxPpnLabel = ref('Entrez des PPN ou collez une liste de PPN puis cliquez à l\'extérieur du cadre avec votre souris ou appuyez sur ENTREE'); //Message indicatif de la combobox
let lastValuesTypedOrPasted = ref(''); //Dernière Chaîne de caractères saisie dans la combobox, servant à alimenter ensuite ppnListTyped
let ppnListCombobox = ref([]); //Tableau de ppn alimenté par les chaînes de caractères mises dans la combobox
let ppnInvalids = ref([]); //Tableau des ppn invalides saisis par l'utilisateur

/**
 * Suppression d'un élément ppn déclenché au moment du clic sur la croix
 * @param item le ppn en question
 */
function removeItem(item){
  const index = ppnListCombobox.value.indexOf(item);
  ppnListCombobox.value.splice(index, 1);
  analyseStore.setPpnValidsList(ppnListCombobox.value); //Alimentation du store avec les ppn valides
  emitOnEvent();
}

/**
 * Suppression de l'ensemble des éléments de la combobox
 */
function removeAllItems(){
  if(!!ppnListCombobox.value){
    ppnListCombobox.value = [];
    ppnInvalids.value = [];
    analyseStore.setPpnInvalidsList(ppnInvalids.value); // Vide la liste des ppn invalides
    analyseStore.setPpnValidsList(ppnListCombobox.value); //Alimentation du store avec les ppn valides
    emitOnEvent();
  }
}

/**
 * Contrôle des chaînes de caractères saisies dans la combobox à la sortie de la souris du champ et alimentation de ppnListTyped
 */
function checkValuesAndFeedPpnListTyped(){
  if(!!lastValuesTypedOrPasted.value){ //Si la valeur n'est pas nulle, ce qui se produit si l'utilisateur sort du cadre sans rien taper
    let arrayWithValidsPpn = lastValuesTypedOrPasted.value.split(/[^\da-zA-Z]/).filter(ppn_to_check => ppn_to_check.match(/^(\d{8}(\d|X|x))$/));
    let arrayWithInvalidsPpn = lastValuesTypedOrPasted.value.split(/[^\da-zA-Z]/).filter(ppn_to_check => !ppn_to_check.match(/^(\d{8}(\d|X|x))$/)).filter(str_to_clean => str_to_clean.trim() !== '');
    let arrayWithValidsPpnWithUniqueValues = arrayWithValidsPpn.filter((v, i, a) => a.indexOf(v) === i); //Fonction anonyme de dédoublonnage sur la saisie en cours
    let arrayWithInvalidsPpnWithUniqueValues = arrayWithInvalidsPpn.filter((v, i, a) => a.indexOf(v) === i); //Fonction anonyme de dédoublonnage sur la saisie en cours
    //Ppn valides
    arrayWithValidsPpnWithUniqueValues.forEach(currentValidPpn => { ppnListCombobox.value.push(currentValidPpn)});
    ppnListCombobox.value = ppnListCombobox.value.filter( function( item, index, inputArray ) {return inputArray.indexOf(item) === index;}); //Supprime les ppn qui serait en doublon sur une saisie précédente
    //Ppn invalide
    arrayWithInvalidsPpnWithUniqueValues.forEach(currentValidPpn => ppnInvalids.value.push(currentValidPpn));
    ppnInvalids.value = ppnInvalids.value.filter( function( item, index, inputArray ) {return inputArray.indexOf(item) === index;}); //Supprime les ppn qui serait en doublon sur une saisie précédente
    analyseStore.setPpnValidsList(ppnListCombobox.value); //Alimentation du store avec les ppn valides
    analyseStore.setPpnInvalidsList(ppnInvalids.value); //Alimentation du store avec les ppn invalides
  }
  lastValuesTypedOrPasted.value = ''; //On vide la chaîne puisqu'on à alimenté les valeurs valides dans :value="ppnListCombobox"
  emitOnEvent();
}

/**
 * Controle si la liste de ppn dans le store est vide ou non
 * @returns {boolean} true si la liste est vide, false si elle ne l'est pas
 */
function checkPpnListIsEmptyInCombobox(){
  return ppnListCombobox.value.length === 0;
}

/**
 * Evenement envoyant au parent avec l'annotation @isPpnListEmpty un booleen
 */
function emitOnEvent(){
  emit('isPpnListEmpty', checkPpnListIsEmptyInCombobox());
}

</script>

<style>

</style>
