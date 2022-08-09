<template>
  <v-container>
    <v-card-title>Liste de ppn &nbsp;<v-btn outlined small @click="removeAllItems">Vider toute la saisie</v-btn></v-card-title>
    <v-combobox append-icon="" :search-input.sync="lastValueTypedOrPasted" :value="ppnListTyped" @blur="checkValuesAndFeedPpnListTyped" :rules="comboboxAlert" multiple outlined small-chips :label="comboboxPpnLabel" class="style2">
      <template v-slot:selection="{item}">
        <v-chip close @click:close="removeItem(item)">
          <span class="pr-2">{{ item }}</span>
        </v-chip>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
export default {
  name: "BlocRechercheParPpn",
  data() {
    return {
        comboboxPpnLabel: 'Entrez des PPN ou collez une liste de PPN puis cliquez à l\'extérieur du cadre avec votre souris', //Message indicatif de la combobox
        comboboxAlert: [], //Alerte indiquant les ppn érronés, et la syntaxe à respecter
        lastValueTypedOrPasted: '', //Dernière Chaîne de caractères saisie dans la combobox, servant à alimenter ensuite ppnListTyped
        ppnListTyped: [], //Tableau de ppn alimenté par les chaînes de caractères mises dans la combobox
    }
  },
  methods: {
    /**
     * Suppression d'un élément ppn déclenché au moment du clic sur la croix
     * @param item le ppn en question
     */
    removeItem(item){
      const index = this.ppnListTyped.indexOf(item);
      this.ppnListTyped.splice(index, 1);
    },
    /**
     * Suppression de l'ensemble des éléments de la combobox
     */
    removeAllItems(){
      this.ppnListTyped = [];
      this.comboboxAlert = [];
    },
    /**
     * Contrôle des chaînes de caractères saisies dans la combobox à la sortie de la souris du champ et alimentation de ppnListTyped
     */
    checkValuesAndFeedPpnListTyped(){
      if(!!this.lastValueTypedOrPasted){ //Si la valeur n'est pas nulle, ce qui se produit si l'utilisateur sort du cadre sans rien taper
        let arrayWithValidsPpn = this.lastValueTypedOrPasted.split(/[^Xx\d]/).filter(ppn_to_check => ppn_to_check.match(/^(\d{8}(\d|X|x))$/));
        let arrayWithInvalidsPpn = this.lastValueTypedOrPasted.split(/[^Xx\d]/).filter(ppn_to_check => !ppn_to_check.match(/^(\d{8}(\d|X|x))$/)).filter(str_to_clean => str_to_clean.trim() !== '');
        this.comboboxAlert = [ "Ppn invalides détectés dans ce que vous avez inséré : " + arrayWithInvalidsPpn.toString(), "", "" ]
        arrayWithValidsPpn.forEach(currentValidPpn => this.ppnListTyped.push(currentValidPpn));
      }
      this.lastValueTypedOrPasted = ''; //On vide la chaîne puisqu'on à alimenté les valeurs valeurs valides dans :value
    },
  }
};
</script>
