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
                <span class="ma-0 pa-0 mr-2" style="font-size: 0.8em; color: darkgrey; font-style: italic">{{ selector }}</span>
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
                :items="filterRulesBySelector()"
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
                    <v-btn class="d-block" plain v-for="ruleTypeDoc in listSelectedRulesTypeDoc" :key="ruleTypeDoc.value" @click="eventTypeDocChoice(ruleTypeDoc) && addSelector(ruleTypeDoc)">
                      {{ ruleTypeDoc }}
                    </v-btn>
                  </div>
                  <div style='background-color:white;color: black;' class="pl-4 pr-8" v-if="header.value === 'id'">
                    <v-btn class="d-block" plain v-for="ruleId in listSelectedRulesId" :key="ruleId.value" @click="eventIdChoice(ruleId) && addSelector(ruleId)">
                      {{ ruleId }}
                    </v-btn>
                  </div>
                  <div style='background-color:white;color: black;' class="pl-4 pr-8" v-if="header.value === 'priority'">
                    <v-btn class="d-block" plain v-for="rulePriority in listSelectedRulesPriority" :key="rulePriority.value" @click="eventPriorityChoice(rulePriority) && addSelector(rulePriority)">
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
const items = ref([]);
const ruleId = ref(null);
const listSelectedRulesId = ref([]);
const ruleTypeDoc = ref(null);
const listSelectedRulesTypeDoc = ref([]);
const rulePriority = ref(null);
const listSelectedRulesPriority = ref([]);
const ruleMessage = ref(null);
const selector = ref(null);
const isLoading = ref(true);
let rulesFiltered = [];

//  TODO mettre des checkBox dans le menu déroulant des types de documents

onMounted(() => {
  feedItems();
  feedTypeList();
  feedRulesPriorityList();
  resetSelector();
})

function resetSelector() {
  ruleId.value = null;
  ruleTypeDoc.value = null;
  rulePriority.value = null;
  rulesFiltered = items.value;
  selector.value = null;
}

function addSelector(select) {
  if (selector.value === null){
    selector.value = select;
  } else {
    selector.value += ", " + select + " ";
  }

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
  listSelectedRulesPriority.value.push("Tous");
  listSelectedRulesPriority.value.push("Essentielle");
  listSelectedRulesPriority.value.push("Avancée");
}

/**
 * Fonction qui permet d'afficher les typeDoc sélectionnés par l'utilisateur
 * @param element l'élément sélectionné
 * @returns {*[] | []} appelle la fonction d'affichage des Id sélectionnés par l'utilisateur
 */
function eventTypeDocChoice(element) {
  ruleTypeDoc.value = (element === "Tous") ? null : element;
  return filterRulesByTypeDoc();
}

/**
 * Fonction qui permet d'afficher les Id sélectionnés par l'utilisateur
 * @param element l'élément sélectionné
 * @returns {*[] | []} appelle la fonction d'affichage des Id sélectionnés par l'utilisateur
 */
function eventIdChoice(element) {
  ruleId.value = (element === "Tous") ? null : element;
  return filterRulesById();
}

/**
 * Fonction qui permet d'afficher les Priority sélectionnés par l'utilisateur
 * @param element l'élément sélectionné
 * @returns {*[] | []} appelle la fonction d'affichage des Priority sélectionnés par l'utilisateur
 */
function eventPriorityChoice(element) {
  rulePriority.value = (element === "Tous") ? null : element;
  return filterRulesByPriority();
}

/**
 * Fonction qui permet de remplir la liste des items sélectionnés par l'utilisateur par Id, typeDoc ou Priority
 * @returns {[]|[]|UnwrapRef<[]>} les items sélectionnés pas l'utilsateur
 */
function filterRulesBySelector() {
  if (ruleId.value === null && ruleTypeDoc.value === null && rulePriority.value === null) {
    return items.value;
  } else if (ruleId.value !== null) {
    return filterRulesById();
  } else if (ruleTypeDoc.value !== null) {
    return filterRulesByTypeDoc();
  } else if (rulePriority.value !== null) {
    return filterRulesByPriority();
  } else return items.value;
}

/**
 * Fonction qui permet de remplir la liste des items sélectionnés par l'utilisateur par Id
 * @returns {[]|UnwrapRef<[]>} les items sélectionnés pas l'utilsateur
 */
function filterRulesById(){
  if (ruleId.value !== null) {
    ruleTypeDoc.value = null;
    rulePriority.value = null;
    ruleMessage.value = null;
    rulesFiltered = items.value.filter(item => {
      return item.id === ruleId.value;
    });
    return rulesFiltered;
  }
}

/**
 * Fonction qui permet de remplir la liste des items sélectionnés par l'utilisateur par typeDoc
 * @returns {[]|UnwrapRef<[]>} les items sélectionnés pas l'utilsateur
 */
function filterRulesByTypeDoc(){
  if (ruleTypeDoc.value !== null) {
    if(rulesFiltered !== null) {// Si un sélecteur est déjà appliqué
      let tempRulesFiltered = rulesFiltered;
      rulesFiltered = [];
      rulesFiltered = tempRulesFiltered.filter(tempRulesFiltered => {
        return tempRulesFiltered.typeDoc.toLocaleLowerCase().includes(ruleTypeDoc.value.toLocaleLowerCase());
      });
    } else {
      { // Si aucun sélecteur n'est appliqué
        rulesFiltered = items.value.filter(item => {
          return item.typeDoc.toLocaleLowerCase().includes(ruleTypeDoc.value.toLocaleLowerCase());
        });
      }
    }
    ruleId.value = null;
    rulePriority.value = null;
    ruleMessage.value = null;
    return rulesFiltered;
  }
}

/**
 * Fonction qui permet de remplir la liste des items sélectionnés par l'utilisateur par Priority
 * @returns {[]|UnwrapRef<[]>} les items sélectionnés pas l'utilsateur
 */
function filterRulesByPriority(){
    if (rulePriority.value !== null) {
      if(rulesFiltered !== null) {// Si un sélecteur est déjà appliqué
        let tempRulesFiltered = rulesFiltered;
        rulesFiltered = [];
        rulesFiltered = tempRulesFiltered.filter(tempRulesFiltered => {
          return tempRulesFiltered.priority === rulePriority.value;
        });
      } else {
        { // Si aucun sélecteur n'est appliqué
          rulesFiltered = items.value.filter(item => {
            return item.priority === rulePriority.value;
          });
        }
      }
      ruleId.value = null;
      ruleTypeDoc.value = null;
      ruleMessage.value = null;
      return rulesFiltered;
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