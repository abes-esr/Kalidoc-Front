<template>
  <v-container>

    <v-container align-items="center">
      <v-row class="ma-0 pa-0">
        <v-col>

          <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Liste des PPN avec erreurs</span>

          <!--          Container de formatage des bordures de la data table-->
          <v-container class="pa-0 ma-0 borderErrorDetailPerPpn">
            <v-data-table
                :headers="headers"
                loading-text="Chargement..."
                :items="items"
                :item-class="classItemPriority"
                hide-default-footer
                single-select
                dense
            >

              <!--              Remplissage du header-->
              <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ headers }">
                            <span style='color: white;'>
                              {{ header.text }}<br>
                            </span>

                <!--                Champ de recherche pour la colonne "Règles de vérification / qualité"-->
                <v-menu offset-y v-if="header.value === 'recherche'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field dense label="Rechercher (saisir un mot)" single-line solo v-bind="attrs" v-on="on" style="margin-bottom: -20px">
                      Rechercher (saisir un mot)
                    </v-text-field>
                  </template>
                </v-menu>

                <!--                Icônes de tri pour les ID, les types de documents et les types de règles-->
                <v-menu offset-y v-if="header.value === 'id' || header.value === 'typeDocument' || header.value === 'typeRegle'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn text class="bouton-simple" x-small v-bind="attrs" v-on="on" style="text-decoration: none;">
                      <v-icon small color="white">
                        mdi-filter
                      </v-icon>
                    </v-btn>
                  </template>
                </v-menu>

                <!--                Suppression de l'icône de tri pour la colonne "Règle de vérification / qualité"-->
                <v-icon color="white" small v-if="header.value != 'recherche'">mdi-sort</v-icon>
              </template>

            </v-data-table>
          </v-container>

        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import {ref} from "vue";

let headers = ref([
  { text: "ID Règle", value: "id", class: "headerTableClass", width: 20},
  { text: "Zone UNM 1", value: "unm1", class: "headerTableClass", width: 30},
  { text: "Zone UNM 2", value: "unm2", class: "headerTableClass", width: 30},
  { text: "Type de document", value: "typeDocument", class: "headerTableClass", width: 80},
  { text: "Règle de vérification / qualité", value: "recherche", class: "headerTableClass", width: 200, sortable : false},
  { text: "Type de règle", value: "typeRegle", class: "headerTableClass", width: 50}
]);
let items = ref([
  {id: "01", unm1:"210", unm2: "", typeDocument: "Tous", recherche: "Si présence de zone 210 et absence de 214", typeRegle: "Essentielle"},
  {id: "02", unm1:"606", unm2: "", typeDocument: "Tous", recherche: "Zone 606 : absence de liens $3", typeRegle: "Essentielle"},
  {id: "03", unm1:"700$b", unm2: "", typeDocument: "Tous", recherche: "Zone 700 : 700$b contient un terme générique à compléter", typeRegle: "Avancée"},
]);

/**
 * Fonction qui modifie la class de l'item sélectionné en fonction de sa priorité
 * @param item
 * @returns {{essentielle: String, avancee: String}}
 */
function classItemPriority(item){
  return {
    essentielle: item.typeRegle === 'Essentielle',
    avancee: item.typeRegle === 'Avancée',
  }
}

</script>

<style>

.essentielle{
  font-weight: bold;
}

.avancee{
  font-weight: normal;
}

</style>