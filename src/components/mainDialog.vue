<template>
  <v-container>
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
  name: "mainDialog",
  props: {
    positionY: {
      type: Number,
      default: 14,
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
    dialogOption: "",
    isAlreadyTalked: { key: false }
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
      if (value.y === 9 && value.x === 16 && !this.isAlreadyTalked.key) {
        this.kingGiveKeys();
      }
    }
  },
  methods: {
    // 宝箱の鍵を手に入れる
    kingGiveKeys(): void {
      const getKey =
        "勇者よ、よく「まおう」を倒してくれた。其方に宝の鍵を授けよう";
      let count = 0;
      this.isAlreadyTalked.key = true;
      this.setMoveRestriction();
      const interval = setInterval(() => {
        count++;
        this.textData = getKey.substring(0, count);
        if (count === getKey.length) {
          this.dialogOption = "contact";
          setTimeout(() => {
            this.playerGotKeys();
          }, 1000);
          clearInterval(interval);
        }
      }, 80);
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
      }, 80);
    },
    // 会話ダイアログの表示が完了するまで移動制限をオンにする
    setMoveRestriction(): void {
      this.$emit("setMoveRestriction");
    },
    resetMoveRestriction(): void {
      this.$emit("resetMoveRestriction");
    },
    // ダイアログの選択ボタンを無効にする
    resetDialogOption(): void {
      this.dialogOption = "";
    }
  }
});
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=M+PLUS+1p);

.main-dialog {
  width: 1050px;
  height: 200px;
  font-size: 30px;
  background-color: #17184b;
  color: #fff;
  font-family: "M PLUS 1p";
}
</style>