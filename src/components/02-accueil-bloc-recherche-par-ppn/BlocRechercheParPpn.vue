<template>
  <v-container>
    <v-card-title>Liste de ppn</v-card-title>
    <v-combobox :search-input.sync="currentValue" @blur="checkValuesAndFeedPpnListTyped()" :rules="comboboxAlert" multiple outlined small-chips :label="comboboxPpnLabel" class="style2">
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
        currentValue: '', //Chaîne de caractères saisie dans la combobox, servant à alimenter ensuite ppnListTyped
        ppnListTyped: [], //Tableau de ppn alimenté par les chaînes de caractères mises dans la combobox
    }
  },
  methods: {
    /**
     * Suppression d'un élément ppn déclenché au moment du clic sur la croix
     * @param item le ppn en question
     */
    removeItem(item){
      console.log(item);
    },
    /**
     * Contrôle des chaînes de caractères saisies dans la combobox et alimentation de ppnListTyped
     */
    checkValuesAndFeedPpnListTyped(){
      console.log(this.currentValue);
    }
  }
};
</script>

