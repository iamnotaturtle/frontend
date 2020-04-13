<template>
  <div class="hello">
    <ul>
      <li v-for="(item, index) in items" :key="index" class="list-item">
        {{ item.name }}
      </li>
    </ul>
    <Observer @intersect="intersected" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Observer from "@/components/Observer.vue";

@Component({
  components: {
    Observer
  }
})
export default class HelloWorld extends Vue {
  page = 1;
  items: any = [];

  async intersected(): Promise<void> {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${this.page}&_limit=50`
    );
    this.page += 1;
    const items = await res.json();
    this.items = [...this.items, ...items];
  }
}
</script>
