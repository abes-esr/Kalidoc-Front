<template>
  <v-container>

    <v-container align-items="center">
      <v-row class="ma-0 pa-0">
        <v-col>

          <v-row class="mb-2" justify="space-between">
            <!--            TITRE-->
            <v-col>
              <span class="fontPrimaryColor" style="font-size: 1.26em; font-weight: bold;">Table générale des règles</span>
            </v-col>
            <!--            BOUTON EFFACER LES FILTRES-->
            <v-col class="pt-4">
              <v-row class="ma-0 pa-0" justify="center">
                <v-tooltip left>
                  <template v-slot:activator="{on}">
                    <v-btn class="ma-0" small outlined color="#cf491b" @click="resetSelector()" v-on="on">
                      Effacer tous les filtres
                      <v-icon class="ml-2" small color="#cf491b">
                        mdi-filter-remove
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Effacer tous les filtres actifs</span>
                </v-tooltip>
              </v-row>
              <v-row class="ma-0 pa-0" justify="center">
                <span class="ma-0 pa-0 mr-2" style="font-size: 0.8em; color: darkgrey; font-style: italic">Type de document : {{ ruleTypeDoc.toString() }}<br>Priorité : {{ selectedPriority.toString() }}</span>
              </v-row>
            </v-col>
            <!--            BOUTON TELECHARGER LES REGLES-->
            <v-col class="pt-4">
              <v-row class="ma-0 pa-0" justify="end">
                <v-tooltip left>
                  <template v-slot:activator="{on}">
                    <v-btn class="ma-0" elevation="0" :disabled="items.length === 0" small v-on="on" color="#0F75BC">
                      <download-csv :delimiter="';'" :data="items" name="qualimarc-export-rules.csv" style="color: white">
                        TÉLÉCHARGER TOUTES LES REGLES
                      </download-csv>
                      <v-icon small color="white" class="ml-2">mdi-download</v-icon>
                    </v-btn>
                  </template>
                  <span>Télécharger toutes les règles dans un fichier "qualimarc-export-rules.csv"</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>

          <!--          Container de formatage des bordures de la data table-->
          <v-container class="pa-0 ma-0 borderErrorDetailPerPpn">
            <v-data-table id="bgColorIdColumnRulesTable"
                :headers="headers"
                loading-text="Chargement..."
                :loading="isLoading"
                :items="rulesFiltered"
                :item-class="classItemPriority"
                :search="ruleMessage"
                :custom-filter="searchByMessage"
                single-select
                item-key="id"
                dense
            >
              <!--              Remplissage du header-->
              <template v-for="header in headers" v-slot:[`header.${header.value}`]="{ headers }">
                <!--                Header Id avec Tooltip-->
                <v-tooltip bottom v-if="header.value === 'id'">
                  <template v-slot:activator="{ on }">
                    <span v-on="on" style='color: white;'>{{ header.textBtn }}</span><br>
                  </template>
                  <span>{{ header.tooltip}}</span>
                </v-tooltip>
                <!--                Autres headers-->
                <span style='color: white;' v-if="header.value === 'zoneUnm1' || header.value === 'zoneUnm2' || header.value === 'typeDoc' || header.value === 'message' || header.value === 'priority'">
                    {{ header.text }}<br>
                </span>

                <!--                Champ de recherche pour la colonne "Règles de vérification / qualité"-->
                <v-menu offset-y v-if="header.value === 'message'">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="ruleMessage"
                        label="rechercher par mot clef"
                        class="ma-0 pa-0"
                        dense
                        solo
                        style="max-height: 40px; color: lightgrey; font-weight: 400; font-style: italic; font-size: 1.2em"
                    ></v-text-field>
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
                    <v-btn class="d-block" plain v-for="ruleTypeDoc in listSelectedRulesTypeDoc" :key="ruleTypeDoc.value" @click="eventTypeDocChoice(ruleTypeDoc)">
                      <v-checkbox v-model="selectedCheckbox" :label="ruleTypeDoc" :value="ruleTypeDoc"></v-checkbox>
                    </v-btn>
                    <div style="height: 30px"></div>
                  </div>
                  <div style='background-color:white;color: black;' class="pl-4 pr-8" v-if="header.value === 'id'">
                    <v-btn class="d-block" plain v-for="ruleId in listSelectedRulesId" :key="ruleId.value" @click="eventIdChoice(ruleId)">
                      {{ ruleId }}
                    </v-btn>
                  </div>
                  <div style='background-color:white;color: black;' class="pl-4 pr-8" v-if="header.value === 'priority'">
                    <v-btn class="d-block" plain v-for="rulePriority in listSelectedRulesPriority" :key="rulePriority.value" @click="(selectedPriority = rulePriority) && filterRulesByPriority(rulePriority)">
                      {{ rulePriority }}
                    </v-btn>
                  </div>
                </v-menu>

                <!--                Suppression de l'icône de tri pour la colonne "Règle de vérification / qualité"-->
                <v-icon color="white" small v-if="header.value !== 'message'">mdi-sort</v-icon>
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
const headers =[
  { text: "", value: "id", class: "headerTableClass", width: 20, textBtn: "ID Règle", tooltip: "Les identifiants des règles sont générés automatiquement et sont donnés à titre informatif"},
  { text: "Zone UNM 1", value: "zoneUnm1", class: "headerTableClass", width: 30},
  { text: "Zone UNM 2", value: "zoneUnm2", class: "headerTableClass", width: 30},
  { text: "Type de document", value: "typeDoc", class: "headerTableClass", width: 80},
  { text: "Règle de vérification / qualité", value: "message", class: "headerTableClass", width: 200, sortable : false},
  { text: "Type de règle", value: "priority", class: "headerTableClass", width: 50}
];
let items = ref([]);
let ruleId = ref(null);
let listSelectedRulesId = ref([]);
let ruleTypeDoc = ref(new Array(0));
let listSelectedRulesTypeDoc = ref([]);
let rulePriority = ref(null);
let listSelectedRulesPriority = ref([]);
let ruleMessage = ref(null);
let isLoading = ref(true);
let rulesFiltered = ref([]);
let selectedCheckbox = ref([]);
let selectedPriority = ref("Toutes");

//  TODO mettre à jour en temps réel le seletor
//  TODO permettre la multiselection pour les types de document (ainsi que dans le bloc de la page résultats)

onMounted(() => {
  feedItems();
  feedTypeList();
  feedRulesPriorityList();
  resetSelector();
})

function resetSelector() {
  ruleId.value = null;
  ruleTypeDoc.value = new Array(0);
  rulePriority.value = null;
  rulesFiltered.value = items.value;
  selectedCheckbox.value = "Tous";
  selectedPriority.value = "Toutes";
}

/**
 * Fonction qui permet de faire la correspondance entre la saisie de l'utilisateur et les items
 * @param value renvoie les valeurs de toutes les cases du dataTable qui contienne la recherche (n'est pas utilisé ici, mais obligation de le laisser)
 * @param search la saisie de l'utilisateur
 * @param item les items qui match avec la saisie de l'utilisateur
 * @returns {boolean} valeur de retour
 */
function searchByMessage (value, search, item) {
  return item.message != null &&
      ruleMessage != null &&
      typeof item.message === 'string' &&
      item.message.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
}

/**
 * fonction permetant de recuperer la liste des règles
 */
function feedItems(){
  isLoading.value = true;
  items.value = [];
  serviceApi.getRules()
      .then((response) => {
        response.data.forEach((el) => items.value.push(el));
        feedIdList();
        isLoading.value = false;
      }).catch((error) => {
    //TODO : emit erreur si impossible de récupérer les types via appel axios
    //emitOnError(error);
        isLoading.value = false;
  });
}

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
  listSelectedRulesTypeDoc.value.push("Tous");
  serviceApi.getFamillesDocuments()
      .then((response) => {
        response.data.forEach((el) => listSelectedRulesTypeDoc.value.push(el.libelle));
      }).catch((error) => {
  });
}

/**
 * Fonction permettant de remplir le liste d'Id affichés dans le filtre
 */
function feedIdList() {
  listSelectedRulesId.value.push("Tous");
  for(let i = 0; i < items.value.length; i++) {
    listSelectedRulesId.value.push(items.value[i].id);
  }
}

/**
 * Fonction permettant de remplir le liste des règles de priorité affichées dans le filtre
 */
function feedRulesPriorityList() {
  listSelectedRulesPriority.value.push("Toutes");
  listSelectedRulesPriority.value.push("Essentielle");
  listSelectedRulesPriority.value.push("Avancée");
}

/**
 * Fonction qui permet d'afficher les typeDoc sélectionnés par l'utilisateur
 * @param element l'élément sélectionné
 * @returns {*[] | []} appelle la fonction d'affichage des Id sélectionnés par l'utilisateur
 */
function eventTypeDocChoice(element) {
  if (element === "Tous") {
    ruleTypeDoc.value = new Array(element.toString());
  } else {
    if (ruleTypeDoc.value.length > 0) {
      if (ruleTypeDoc.value.indexOf(element) === -1) {  //  Ajout un typeDoc s'il n'est pas déjà dans la liste ruleTypeDoc
        ruleTypeDoc.value.push(element.toString());
      } else if (ruleTypeDoc.value.indexOf(element) >= 0) { //  Supprime un typeDoc coché lorsque l'on clique de nouveau sur lui
        ruleTypeDoc.value.splice(ruleTypeDoc.value.indexOf(element), 1);
      }
    } else {
      ruleTypeDoc.value = new Array(element.toString());
    }
  }
  selectedCheckbox.value = ruleTypeDoc.value;
  filterRulesByTypeDoc();
}

/**
 * Fonction qui permet d'afficher les Id sélectionnés par l'utilisateur
 * @param element l'élément sélectionné
 * @returns {*[] | []} appelle la fonction d'affichage des Id sélectionnés par l'utilisateur
 */
function eventIdChoice(element) {
  ruleId.value = (element === "Tous") ? null : element;
  return filterRulesBySelector();
}

function filterRulesBySelector() {
  rulesFiltered.value = items.value.filter(item => {
    return item.id === ruleId.value;
  });
}

/**
 * Function qui permet de filtrer par type de document
 * @returns {Ref<UnwrapRef<[]>>}
 */
function filterRulesByTypeDoc(){
  rulesFiltered.value = new Array(0);

  if (ruleTypeDoc.value.length === 1 && ruleTypeDoc.value[0] === "Tous") {  //  Si le typeDoc est "Tous"
    rulesFiltered.value = items.value;
    ruleTypeDoc.value = new Array(0);
  } else if (ruleTypeDoc.value.length >= 1 && ruleTypeDoc.value !== "Tous") { //  Si le typeDoc est autre que "Tous"
    //  Tri par type de doc
    let tempRulesFilterByTypeDocList = new Set();
    for(let i = 0; i < ruleTypeDoc.value.length; i++) {
      let tempList = items.value.filter(item => {
        return item['typeDoc'].toLocaleLowerCase().includes(ruleTypeDoc.value[i].toString().toLocaleLowerCase())
      });
      tempList.forEach(item => {
        tempRulesFilterByTypeDocList.add(item);
      })
    }
    tempRulesFilterByTypeDocList.forEach(item => {
      rulesFiltered.value.push(item)
    })

  }
  return rulesFiltered;
}

/**
 * Function qui permet de filtrer par priorité
 * @param priority la priorité choisie par l'utilisateur
 * @returns {Ref<UnwrapRef<[]>>}
 */
function filterRulesByPriority(priority) {
  //  Tri par priorité
  if (ruleTypeDoc.value.length === 0 && priority.toString() === "Toutes") { //  si aucun type de document n'a été sélectionné au préalable et priorité "Toutes"
    rulesFiltered.value = items.value;
  } else if (ruleTypeDoc.value.length === 0 && priority.toString() !== "Toutes") {  //  si aucun type de document n'a été sélectionné au préalable et priorité différente de "Toutes"
    rulesFiltered.value = items.value.filter(rule => {
      return rule['priority'].toString().toLocaleLowerCase() === priority.toString().toLocaleLowerCase();
    });
  } else if (ruleTypeDoc.value.length !== 0 && priority.toString() !== "Toutes") {  //  si un/des type.s de document a/ont été sélectionné.s au préalable et priorité différente de "Toutes"
      filterRulesByTypeDoc();
      let tempRulesList = rulesFiltered.value.filter(rule => {
        return rule['priority'].toString().toLocaleLowerCase() === priority.toString().toLocaleLowerCase();
      });
      rulesFiltered.value = new Array(0);
      tempRulesList.forEach(tempRule => {
        rulesFiltered.value.push(tempRule)
      });
  } else if (ruleTypeDoc.value.length !== 0 && priority.toString() === "Toutes") {  //  si un/des type.s de document a/ont été sélectionné.s au préalable et priorité "Toutes"
    filterRulesByTypeDoc();
  }
  return rulesFiltered;
}

</script>

<style>

.essentielle{
  font-weight: 400;
}

.avancee{
  font-weight: 400;
}

</style>