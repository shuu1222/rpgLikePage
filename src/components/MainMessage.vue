<template>
  <v-container class="pa-0 main-dialog-wrapper">
    <div class="main-dialog">
      {{ textData }}
      <br />
      <div class="main-dialog-sub">
        {{ textDataSecoundLine }}
      </div>
    </div>
    <app-select-button
      :selectButtonIsVisible="selectButtonIsVisible"
      :whichTreasure="whichTreasure"
      @onClickNoButton="onClickNoButton()"
    ></app-select-button>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import SelectButton from "./DialogSelectButton.vue";

export default Vue.extend({
  name: "MainDialog",
  components: {
    AppSelectButton: SelectButton
  },
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
    isAlreadyTalkedSister: { key: false },
    whichTreasure: "",
    selectButtonIsVisible: false,
    onClickNoText: ""
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
      // 王様に初めて話しかけた場合
      if (value.y === 9 && value.x === 16 && !this.isAlreadyTalked.key) {
        this.kingGiveKeys();
        // メイドさんに初めて話しかけた場合
      } else if (
        value.y === 3 &&
        value.x === 23 &&
        this.isAlreadyTalked.key &&
        !this.isAlreadyTalkedMaid.key
      ) {
        this.maidGiveKeys();
        // シスターに初めて話しかけた場合
      } else if (
        value.y === 3 &&
        value.x === 13 &&
        this.isAlreadyTalkedMaid.key &&
        !this.isAlreadyTalkedSister.key
      ) {
        this.talkToSister();
        // about this siteの遷移確認ダイアログを表示する
      } else if (
        value.y === 5 &&
        value.x === 11 &&
        this.isAlreadyTalkedSister.key
      ) {
        this.dialogAboutSite();
        this.whichTreasure = "aboutSite";
        // about meの遷移確認ダイアログを表示する
      } else if (
        value.y === 5 &&
        value.x === 13 &&
        this.isAlreadyTalkedSister.key
      ) {
        this.dialogAboutMe();
        this.whichTreasure = "aboutMe";
        // contactの遷移確認ダイアログを表示する
      } else if (
        value.y === 5 &&
        value.x === 15 &&
        this.isAlreadyTalkedSister.key
      ) {
        this.dialogContact();
        this.whichTreasure = "contact";
      }
    }
  },
  methods: {
    // 宝箱の鍵を手に入れる
    kingGiveKeys(): void {
      this.$store.dispatch("items/registerItemlist", [
        { name: "`About This Site`の鍵", id: "1", count: 1 },
        { name: "About Meの鍵", id: "2", count: 1 },
        { name: "Contactの鍵", id: "3", count: 1 },
        { name: "宝の巻物", id: "4", count: 0 }
      ]);
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
    // 宝箱の巻物を手に入れる(メイドさんに話しかける)
    maidGiveKeys(): void {
      this.$store.dispatch("items/registerItemlist", [
        { name: "About This Siteの鍵", id: "1", count: 1 },
        { name: "About Meの鍵", id: "2", count: 1 },
        { name: "Contactの鍵", id: "3", count: 1 },
        { name: "宝の巻物", id: "4", count: 1 }
      ]);
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
    // 宝箱の巻物を手に入れた（メイドさんから貰う）
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
      this.$store.dispatch("items/registerItemlist", [
        { name: "About This Siteの鍵", id: "1", count: 1 },
        { name: "About Meの鍵", id: "2", count: 1 },
        { name: "Contactの鍵", id: "3", count: 1 },
        { name: "宝の巻物", id: "4", count: 0 }
      ]);
      this.resetDialogOption();
      const getKey = "シスター「勇者さん、よくここまで頑張りましたね。」";
      let count = 0;
      this.isAlreadyTalkedSister.key = true;
      this.setMoveRestriction();
      const interval = setInterval(() => {
        count++;
        this.textData = getKey.substring(0, count);
        if (count === getKey.length) {
          this.boxAppears();
          clearInterval(interval);
        }
      }, 50);
    },
    // 宝箱が出現した（シスターが出してくれる）
    boxAppears(): void {
      const gotKey = "宝箱が出現した。";
      let count = 0;
      const interval = setInterval(() => {
        count++;
        this.textDataSecoundLine = gotKey.substring(0, count);
        if (count === gotKey.length) {
          this.resetMoveRestriction();
          this.$emit("treasureAppears");
          clearInterval(interval);
        }
      }, 50);
    },
    // About This Siteへ遷移する際のダイアログ
    dialogAboutSite(): void {
      this.setMoveRestriction();
      this.resetDialogOption();
      const message = "About This Site　ページへ移動しますか？";
      let count = 0;
      const interval = setInterval(() => {
        count++;
        this.textData = message.substring(0, count);
        if (count === message.length) {
          this.resetMoveRestriction();
          this.onClickNoText = "About This Site　ページ";
          this.selectButtonIsVisible = true;
          clearInterval(interval);
        }
      }, 50);
    },
    // About Meへ遷移する際のダイアログ
    dialogAboutMe(): void {
      this.setMoveRestriction();
      this.resetDialogOption();
      const message = "About Me ページへ移動しますか？";
      let count = 0;
      const interval = setInterval(() => {
        count++;
        this.textData = message.substring(0, count);
        if (count === message.length) {
          this.resetMoveRestriction();
          this.onClickNoText = "About Me ページ";
          this.selectButtonIsVisible = true;
          clearInterval(interval);
        }
      }, 50);
    },
    // Contactへ遷移する際のダイアログ
    dialogContact(): void {
      this.setMoveRestriction();
      this.resetDialogOption();
      const message = "コンタクトページ へ移動しますか？";
      let count = 0;
      const interval = setInterval(() => {
        count++;
        this.textData = message.substring(0, count);
        if (count === message.length) {
          this.resetMoveRestriction();
          this.onClickNoText = "コンタクトページ";
          this.selectButtonIsVisible = true;
          clearInterval(interval);
        }
      }, 50);
    },
    // 鍵をしまう
    onClickNoButton(): void {
      this.setMoveRestriction();
      this.resetDialogOption();
      const message = "勇者は" + this.onClickNoText + "の鍵をしまった";
      let count = 0;
      const interval = setInterval(() => {
        count++;
        this.textData = message.substring(0, count);
        if (count === message.length) {
          this.resetMoveRestriction();
          clearInterval(interval);
        }
      }, 50);
    },
    // 会話ダイアログの表示が完了するまで移動制限をオンにする
    setMoveRestriction(): void {
      this.$emit("setMoveRestriction");
    },
    // 移動制限をオフにする
    resetMoveRestriction(): void {
      this.$emit("resetMoveRestriction");
    },
    // ダイアログの文章と選択ボタンを無効にする
    resetDialogOption(): void {
      this.textDataSecoundLine = "";
      this.textData = "";
      this.selectButtonIsVisible = false;
      this.whichTreasure = "";
    }
  }
});
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=M+PLUS+1p);

.main-dialog {
  width: 1000px;
  height: 100px;
  padding-left: 150px;
  font-size: 25px;
  background-color: #333333;
  color: #fff;
  font-family: "M PLUS 1p";
  &-sub {
    display: flex;
  }
  &-wrapper {
    display: flex;
  }
}
</style>
