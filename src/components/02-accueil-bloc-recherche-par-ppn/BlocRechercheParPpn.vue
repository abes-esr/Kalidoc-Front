<template>
  <v-container>
    <v-card-title>Liste de ppn &nbsp;<v-btn outlined small @click="removeAllItems">Vider toute la saisie</v-btn></v-card-title>
    <v-alert border="left" colored-border type="info">
      Pour des raisons de performance, nous vous recommandons d'utiliser l'import de fichier pour plus de 5000 PPN
    </v-alert>
    <v-combobox append-icon="" @keydown="checkValuesAndFeedPpnListTyped" :search-input.sync="lastValuesTypedOrPasted" :value="ppnListCombobox" @blur="checkValuesAndFeedPpnListTyped" multiple outlined small-chips :label="comboboxPpnLabel" class="style2">
      <template v-slot:selection="{item}">
        <v-chip close @click:close="removeItem(item)">
          <span class="pr-2">{{ item }}</span>
        </v-chip>
      </template>
    </v-combobox>
    <v-alert v-if="analyseStore.getInvalidsPpnList.length !== 0" border="left" colored-border type="error" elevation="1">
      Les PPN dans la liste ci-dessous que vous avez saisis ne respectent pas la syntaxe requise et ne seront donc pas pris en compte au lancement de l'analyse :<br>
      Syntaxe d'un PPN : (9 caractères, composés de 9 chiffres ou de 8 chiffres + la lettre X)<br>
      <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          PPN avec une mauvaise syntaxe que vous avez collé (cliquez pour dérouler)
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-chip color="red" outlined v-for="(item, index) in analyseStore.getInvalidsPpnList" :key="index">{{ item }}</v-chip>
        </v-expansion-panel-content>
      </v-expansion-panel>
        </v-expansion-panels>
    </v-alert>
  </v-container>
</template>

<script setup>
import { useAnalyseStore } from "@/stores/analyse";
import { ref } from 'vue';

    const analyseStore = useAnalyseStore(); //Store
    let comboboxPpnLabel = ref('Entrez des PPN ou collez une liste de PPN puis cliquez à l\'extérieur du cadre avec votre souris ou appuyez sur une touche'); //Message indicatif de la combobox
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
    }

    /**
     * Suppression de l'ensemble des éléments de la combobox
     */
    function removeAllItems(){
      if(!!ppnListCombobox.value){
        ppnListCombobox.value = [];
        analyseStore.setPpnValidsList(ppnListCombobox.value); //Alimentation du store avec les ppn valides
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
    }

</script>

<style>
.v-expansion-panel::before {
  box-shadow: none;
}
</style>
