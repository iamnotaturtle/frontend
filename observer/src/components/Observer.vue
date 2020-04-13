<template>
  <div class="observer" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Observer extends Vue {
  observer: IntersectionObserver | null = null;

  @Prop()
  options: any;

  mounted(): void {
    this.setupObserver();
  }

  setupObserver(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    });

    this.observer.observe(this.$el);
    this.$once("hook:beforeDestroy", () => {
      this.observer!.disconnect();
    });
  }
}
</script>
