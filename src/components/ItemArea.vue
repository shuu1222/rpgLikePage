<template>
  <div class="item-dialog">
    <div
      class="item-dialog-list"
      v-for="(item, index) in getItems"
      :key="index"
    >
      {{ item.name }}
      <br />
      <img class="item-dialog-list-icon" :src="imageSrc(item)" alt="" />
      {{ "所持数 : " + item.count + " 個" }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ItemArea",

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
@import url(https://fonts.googleapis.com/css?family=M+PLUS+1p);

.item-dialog {
  width: 150px;
  min-width: 150px;
  height: 500px;
  font-size: 14px;
  background-color: #17184b;
  color: #fff;
  font-family: "M PLUS 1p";
  padding-top: 25px;
  padding-left: 5px;
  &-list {
    margin-bottom: 25px;
    &-icon {
      width: 20px;
      vertical-align: bottom;
    }
  }
}
</style>
