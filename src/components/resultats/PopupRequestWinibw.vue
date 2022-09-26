<template>
  <v-dialog v-model="props.dialog">
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            color="#252C61"
            dark
        >Requête WinIBW</v-toolbar>
        <v-card-text>
          <div class="font-weight-bold pa-12">{{ props.winibwRequest }}</div>
          <v-btn @click="copyText"><v-icon>mdi-content-copy</v-icon></v-btn>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="dialog.value = false"
          >Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
const props = defineProps({winibwRequest: String, dialog: Boolean});

/** fonction permettant de copier la requête winIBW dans le presse-papier
 *
 */
function copyText() {
  navigator.clipboard.writeText(props.winibwRequest);
}
</script>

<style scoped>

</style>