<template>
  <input type="color" :value="value" @input="inputted" @change="changed" />
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Colors extends Vue {
  /**
   * Default value for picker
   */
  @Prop()
  value!: string;

  /**
   * Emits selected color
   */
  @Emit()
  inputted(event: Event): string {
    return (event!.target! as HTMLInputElement).value;
  }

  /**
   * Emits event after picker is closed
   */
  @Emit()
  changed(event: Event): string {
    return (event!.target! as HTMLInputElement).value;
  }
}
</script>
