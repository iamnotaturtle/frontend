<template>
  <div class="colors">
    <ColorPicker value="#00ffff" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ColorPicker from "@/components/ColorPicker.vue";

@Component({
  components: {
    ColorPicker
  }
})
export default class Colors extends Vue {}
</script>
