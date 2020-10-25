<template>
  <div class="item-dialog-button">
    <v-btn dark tile text>{{ "はい" }}</v-btn>
    <v-btn dark tile text>{{ "いいえ" }}</v-btn>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ItemArea",
  props: {},
  data: () => ({
    textData: "",
    textDataSecoundLine: ""
  }),
  computed: {
    // VuexのStoreに保管されているアイテムリスト情報を取得する。
    getItems(): Array<{ name: string; id: string; count: number }> {
      return this.$store.getters["items/getItemList"];
    }
  },
  methods: {
    // アイテムIDに対応するアイテムのアイコン情報を取得する
    imageSrc(item: { name: string; id: string }) {
      return item.id != ""
        ? require(`../assets/images/item${item.id}.png`)
        : "";
    }
  }
});
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Sawarabi+Gothic);

.item-dialog {
  &-button {
    width: 200px;
    background-color: #17184b;
  }
}
.v-btn {
  font-size: 30px !important;
  font-family: "Sawarabi Gothic";
}
</style>
