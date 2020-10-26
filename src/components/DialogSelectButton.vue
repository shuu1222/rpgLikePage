<template>
  <div class="item-dialog-button">
    <v-btn
      width="135"
      @click="onClickYesButton()"
      v-if="selectButtonIsVisible"
      dark
      tile
      text
      >{{ "はい" }}</v-btn
    >
    <v-btn
      width="135"
      @click="onClickNoButton()"
      v-if="selectButtonIsVisible"
      dark
      tile
      text
      >{{ "いいえ" }}</v-btn
    >
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ItemArea",
  props: {
    selectButtonIsVisible: {
      type: Boolean,
      default: false
    },
    whichTreasure: {
      type: String,
      default: "",
      required: true
    }
  },
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
    },
    onClickYesButton(): void {
      console.log("ここで別のページに遷移する処理を描く");
      console.log("/" + this.whichTreasure);
      // this.$router.push({
      //   path: "/" + this.whichTreasure
      // });
    },
    onClickNoButton(): void {
      this.$emit("onClickNoButton");
    }
  }
});
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Sawarabi+Gothic);

.item-dialog {
  &-button {
    width: 200px;
    background-color: #333333;
  }
}
.v-btn {
  font-size: 30px !important;
  font-family: "Sawarabi Gothic";
}
</style>
