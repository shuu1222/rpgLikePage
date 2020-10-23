<template>
  <v-container class="pa-0">
    <div class="main-dialog">
      {{ textData }}
      <br />
      {{ textDataSecoundLine }}
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MainDialog",
  props: {
    positionY: {
      type: Number,
      default: 10,
      required: true
    },
    positionX: {
      type: Number,
      default: 14,
      required: true
    }
  },
  data: () => ({
    textData: "",
    textDataSecoundLine: "",
    isAlreadyTalked: { key: false },
    isAlreadyTalkedMaid: { key: false },
    isAlreadyTalkedSister: { key: false }
  }),
  computed: {
    // プレイヤーの位置情報をオブジェクトで返す
    positionInfo(): { y: number; x: number } {
      return { y: this.positionY, x: this.positionX };
    }
  },
  watch: {
    // プレイヤーの位置情報を監視し、位置に対応したな処理を実行する
    positionInfo(value): void {
      console.log(value);
      if (value.y === 9 && value.x === 16 && !this.isAlreadyTalked.key) {
        const standardKeys = [
          { name: "`About This Site`の鍵", id: "1", count: 1 },
          { name: "About Meの鍵", id: "2", count: 1 },
          { name: "Contactの鍵", id: "3", count: 1 },
          { name: "宝の巻物", id: "4", count: 0 }
        ];
        this.kingGiveKeys();
        this.$store.dispatch("items/registerItemlist", standardKeys);
      } else if (value.y === 3 && value.x === 23 && this.isAlreadyTalked.key) {
        const standardKeys = [
          { name: "About This Siteの鍵", id: "1", count: 1 },
          { name: "About Meの鍵", id: "2", count: 1 },
          { name: "Contactの鍵", id: "3", count: 1 },
          { name: "宝の巻物", id: "4", count: 1 }
        ];
        this.maidGiveKeys();
        this.$store.dispatch("items/registerItemlist", standardKeys);
      } else if (
        value.y === 3 &&
        value.x === 13 &&
        this.isAlreadyTalkedMaid.key
      ) {
        const standardKeys = [
          { name: "About This Siteの鍵", id: "1", count: 1 },
          { name: "About Meの鍵", id: "2", count: 1 },
          { name: "Contactの鍵", id: "3", count: 1 },
          { name: "宝の巻物", id: "4", count: 0 }
        ];
        this.talkToSister();
        console.log("talkedToSister");
        this.$store.dispatch("items/registerItemlist", standardKeys);
      }
    }
  },
  methods: {
    // 宝箱の鍵を手に入れる
    kingGiveKeys(): void {
      this.resetDialogOption();
      const getKey =
        "勇者よ、よく「まおう」を倒してくれた。其方に宝の鍵を授けよう。";
      let count = 0;
      this.isAlreadyTalked.key = true;
      this.setMoveRestriction();
      const interval = setInterval(() => {
        count++;
        this.textData = getKey.substring(0, count);
        if (count === getKey.length) {
          setTimeout(() => {
            this.playerGotKeys();
          }, 500);
          clearInterval(interval);
        }
      }, 50);
    },
    // 宝箱の鍵を手に入れた
    playerGotKeys(): void {
      const gotKey = "勇者は各ページへの鍵を手に入れた";
      let count = 0;
      const interval = setInterval(() => {
        count++;
        this.textDataSecoundLine = gotKey.substring(0, count);
        if (count === gotKey.length) {
          this.resetMoveRestriction();
          clearInterval(interval);
        }
      }, 50);
    },
    // 宝箱の巻物を手に入れる
    maidGiveKeys(): void {
      this.resetDialogOption();
      const getKey =
        "メイドさん「勇者から預かっていた秘密の巻物をお返しします。」";
      let count = 0;
      this.isAlreadyTalkedMaid.key = true;
      this.setMoveRestriction();
      const interval = setInterval(() => {
        count++;
        this.textData = getKey.substring(0, count);
        if (count === getKey.length) {
          this.playerGotMaidKeys();
          clearInterval(interval);
        }
      }, 50);
    },
    // 宝箱の巻物を手に入れた
    playerGotMaidKeys(): void {
      const gotKey = "ピアノの前にいるシスターに話しかけよう。";
      let count = 0;
      const interval = setInterval(() => {
        count++;
        this.textDataSecoundLine = gotKey.substring(0, count);
        if (count === gotKey.length) {
          this.resetMoveRestriction();
          clearInterval(interval);
        }
      }, 50);
    },
        // シスターに話しかける
    talkToSister(): void {
      this.resetDialogOption();
      const getKey =
        "シスター「勇者よ、よくここまで頑張りましたね。」";
      let count = 0;
      this.isAlreadyTalkedSister.key = true;
      this.setMoveRestriction();
      const interval = setInterval(() => {
        count++;
        this.textData = getKey.substring(0, count);
        if (count === getKey.length) {
          this.boxAppears()
          clearInterval(interval);
        }
      }, 50);
    },
        // 宝箱の巻物を手に入れた
    boxAppears(): void {
      const gotKey = "宝箱が出現した。";
      let count = 0;
      const interval = setInterval(() => {
        count++;
        this.textDataSecoundLine = gotKey.substring(0, count);
        if (count === gotKey.length) {
          this.resetMoveRestriction();
          clearInterval(interval);
        }
      }, 50);
    },
    // 会話ダイアログの表示が完了するまで移動制限をオンにする
    setMoveRestriction(): void {
      this.$emit("setMoveRestriction");
    },
    resetMoveRestriction(): void {
      this.$emit("resetMoveRestriction");
    },
    // ダイアログの文章と選択ボタンを無効にする
    resetDialogOption(): void {
      this.textDataSecoundLine = "";
      this.textData = "";
    }
  }
});
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=M+PLUS+1p);

.main-dialog {
  width: 1200px;
  height: 100px;
  padding-left: 150px;
  font-size: 30px;
  background-color: #17184b;
  color: #fff;
  font-family: "M PLUS 1p";
}
</style>
