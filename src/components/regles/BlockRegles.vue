<template>
  <v-container>

    <v-container align-items="center">
      <v-row class="ma-0 pa-0">
        <v-col>

          <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Table générale des règles</span>

          <!--          Container de formatage des bordures de la data table-->
          <v-container class="pa-0 ma-0 borderErrorDetailPerPpn">
            <v-data-table
                :headers="headers"
                loading-text="Chargement..."
                :items="filterRulesByType()"
                :item-class="classItemPriority"
                single-select
                item-key="id"
                dense
            >

              <!--              Remplissage du header-->
              <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ headers }">
                            <span style='color: white;'>
                              {{ header.text }}<br>
                            </span>

                <!--                Champ de recherche pour la colonne "Règles de vérification / qualité"-->
                <v-menu offset-y v-if="header.value === 'message'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field dense label="Rechercher (saisir un mot)" single-line solo v-bind="attrs" v-on="on" style="margin-bottom: -20px">
                      Rechercher (saisir un mot)
                    </v-text-field>
                  </template>
                </v-menu>

                <!--                Icônes de tri pour les ID, les types de documents et les types de règles-->
                <v-menu offset-y v-if="header.value === 'id' || header.value === 'typeDoc' || header.value === 'priority'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn text class="bouton-simple" x-small v-bind="attrs" v-on="on" style="text-decoration: none;">
                      <v-icon small color="white">
                        mdi-filter
                      </v-icon>
                    </v-btn>
                  </template>
                  <div style='background-color:white;color: black;' class="pl-4 pr-8" v-if="header.value === 'typeDoc'">
                    <v-btn class="d-block" plain v-for="type in selectType" :key="type.id" @click="eventTypeChoice(type)">
                      {{ type }}
                    </v-btn>
                  </div>
                </v-menu>

                <!--                Suppression de l'icône de tri pour la colonne "Règle de vérification / qualité"-->
                <v-icon color="white" small v-if="header.value != 'message'">mdi-sort</v-icon>
              </template>

            </v-data-table>
          </v-container>

        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import {ref, onMounted} from "vue";
import QualimarcService from "@/service/QualimarcService";

const serviceApi = QualimarcService;
let headers = ref([
  { text: "ID Règle", value: "id", class: "headerTableClass", width: 20},
  { text: "Zone UNM 1", value: "zoneUnm1", class: "headerTableClass", width: 30},
  { text: "Zone UNM 2", value: "zoneUnm2", class: "headerTableClass", width: 30},
  { text: "Type de document", value: "typeDoc", class: "headerTableClass", width: 80},
  { text: "Règle de vérification / qualité", value: "message", class: "headerTableClass", width: 200, sortable : false},
  { text: "Type de règle", value: "priority", class: "headerTableClass", width: 50}
]);
let items = ref([
  {id: "01", zoneUnm1:"210", zoneUnm2: "", typeDoc: "Tous", message: "Si présence de zone 210 et absence de 214", priority: "Essentielle"},
  {id: "02", zoneUnm1:"606", zoneUnm2: "", typeDoc: "Tous", message: "Zone 606 : absence de liens $3", priority: "Essentielle"},
  {id: "03", zoneUnm1:"700$b", zoneUnm2: "", typeDoc: "Tous", message: "Zone 700 : 700$b contient un terme générique à compléter", priority: "Avancée"},
]);
let type = ref(null);
let selectType = ref([]);
let rulesFiltered = [];

onMounted(() => {
  feedTypeList();
})

/**
 * Fonction qui modifie la class de l'item sélectionné en fonction de sa priorité
 * @param item
 * @returns {{essentielle: String, avancee: String}}
 */
function classItemPriority(item){
  return {
    essentielle: item.priority === 'Essentielle',
    avancee: item.priority === 'Avancée',
  }
}

/**
 * Fonction permettant d'initialiser les listes de types de documents affichés dans le filtre
 */
function feedTypeList() {
  selectType.value.push("Tous");
  serviceApi.getFamillesDocuments()
      .then((response) => {
        response.data.forEach((el) => selectType.value.push(el.libelle));
      }).catch((error) => {
  });
}

/**
 * Fonction qui permet d'afficher les types de document
 * @param element
 * @returns {*[] | []}
 */
function eventTypeChoice(element) {
  type.value = (element === "Tous") ? null : element;
  return filterRulesByType();
}

function filterRulesByType(){
  if (type.value !== null) {
    rulesFiltered = items.value.filter(item => {
      return item.typeDoc === type.value;
    });
    return rulesFiltered;
  }
  return items.value;
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