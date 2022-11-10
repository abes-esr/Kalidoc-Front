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
                single-select
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
import {onMounted, ref} from "vue";
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
let items = ref([]);

onMounted(() => {
  feedItems();
})

/**
 * fonction permetant de recuperer la liste des règles
 */
function feedItems(){
  items.value = [];
  serviceApi.getRules()
      .then((response) => {
        response.data.forEach((el) => items.value.push(el));
      }).catch((error) => {
    //TODO : emit erreur si impossible de récupérer les types via appel axios
    //emitOnError(error);
  });
}

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