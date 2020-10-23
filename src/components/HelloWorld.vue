<template>
  <v-container>
    <div class="main-panel-box">
      <app-item-area></app-item-area>
      <div class="move-area-wrapper">
        <div class="move-area-y" v-for="(item, index) in moveArea" :key="index">
          <div
            class="move-area-x"
            v-for="(xItems, xIndex) in moveArea[index]"
            :key="xIndex"
          >
            <img :src="imageSources(index, xIndex)" alt="" class="images" />
            <!-- 座標テスト -->
            <!-- {{moveArea[index][xIndex]}} -->

          </div>
          <br />
        </div>
      </div>
    </div>
    <AppMainDialog
      :positionY="positionY"
      :positionX="positionX"
      @setMoveRestriction="setMoveRestriction()"
      @resetMoveRestriction="resetMoveRestriction()"
    ></AppMainDialog>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import AppMainDialog from "./MainMessage.vue";
import AppItemArea from "./ItemArea.vue";

export default Vue.extend({
  name: "HelloWorld",
  components: {
    AppMainDialog,
    AppItemArea
  },
  data: () => ({
    moveArea: [
      [0, 0, 3, 3, 0, 0, 0, 0, 3, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 3, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 7, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ], // 0=moveable, 1=player, 3=unable to enter
    positionY: 11,
    positionX: 12,
    direction: "front1", //front,up,right,left
    moveAnimation: false,
    movementRestriction: false,
    isTalking: false
  }),
  created() {
    // キー押下イベントを取得する
    this.moveArea[this.positionY][this.positionX] = 1;
    const eventHandler = (e: KeyboardEvent) => {
      this.pressedKey(e);
    };
    document.addEventListener("keydown", eventHandler);
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", eventHandler);
    });
    this.resetRestriction();
  },
  mounted() {
    // アイテム一覧の初期値を設定する
    const defaultItems = [
      { name: "About This Siteの鍵", id: "1", count: 0 },
      { name: "About Meの鍵", id: "2", count: 0 },
      { name: "Contactの鍵", id: "3", count: 0 },
      { name: "宝の巻物", id: "4", count: 0 }
    ];
    this.$store.dispatch("items/registerItemlist", defaultItems);
  },
  computed: {
    // dataのプレイヤーの向き対応した画像ファイルのキーワードを返す
    playerDirection(): string {
      return this.direction;
    }
  },
  methods: {
    // 座標に応じたキャラクター画像を返す
    imageSources(index: number, xIndex: number) {
      return this.moveArea[index][xIndex] === 1
        ? require(`../assets/images/${this.playerDirection}.png`)
        : this.moveArea[index][xIndex] === 6
        ? require(`../assets/images/king.png`)
        : this.moveArea[index][xIndex] === 7
        ? require(`../assets/images/maidLeft.png`)
        : this.moveArea[index][xIndex] === 8
        ? require(`../assets/images/sister.png`)
        : "";
    },
    // キーダウンイベントを感知した際の処理
    pressedKey(e: KeyboardEvent): void {
      if (this.movementRestriction || this.isTalking) return;
      // 方向キーの↑が押下された際の処理
      if (e.key === "ArrowUp" && this.positionY != 0) {
        this.moveAnimation
          ? (this.direction = "up2")
          : (this.direction = "up3");
        this.moveAnimation = !this.moveAnimation;
        this.pressedKeyUp();
        // 方向キーの↓が押下された際の処理
      } else if (e.key === "ArrowDown" && this.positionY != 11) {
        this.moveAnimation
          ? (this.direction = "front2")
          : (this.direction = "front3");
        this.moveAnimation = !this.moveAnimation;
        this.pressedKeyDown();
        // 方向キーの→が押下された際の処理
      } else if (e.key === "ArrowRight" && this.positionX != 25) {
        this.moveAnimation
          ? (this.direction = "right2")
          : (this.direction = "right3");
        this.moveAnimation = !this.moveAnimation;
        this.pressedKeyRight();
        // 方向キーの←が押下された際の処理
      } else if (e.key === "ArrowLeft" && this.positionX != 0) {
        this.moveAnimation
          ? (this.direction = "left2")
          : (this.direction = "left3");
        this.moveAnimation = !this.moveAnimation;
        this.pressedKeyLeft();
      }
      this.movementRestriction = true;
    },
    // 一定時間おきに移動制限をリセットする
    resetRestriction(): void {
      setTimeout(() => {
        this.movementRestriction = false;
        this.resetRestriction();
      }, 150);
    },
    // 方向キーの↑が押下された際の処理
    async pressedKeyUp(): Promise<void> {
      const y = this.positionY - 1;
      const upperPosition = this.moveArea[y][this.positionX];
      if (upperPosition >= 3) {
        return;
      } else {
        await this.moveArea[this.positionY].splice(this.positionX, 1, 0);
        this.positionY -= 1;
        this.moveArea[this.positionY].splice(this.positionX, 1, 1);
      }
    },
    // 方向キーの↓が押下された際の処理
    async pressedKeyDown(): Promise<void> {
      const y = this.positionY + 1;
      const bottomPosition = this.moveArea[y][this.positionX];
      if (bottomPosition >= 3) {
        return;
      } else {
        await this.moveArea[this.positionY].splice(this.positionX, 1, 0);
        this.positionY += 1;
        this.moveArea[this.positionY].splice(this.positionX, 1, 1);
      }
    },
    // 方向キーの←が押下された際の処理
    async pressedKeyLeft(): Promise<void> {
      const x = this.positionX - 1;
      const leftPosition = this.moveArea[this.positionY][x];
      if (leftPosition >= 3) {
        return;
      } else {
        await this.moveArea[this.positionY].splice(this.positionX, 1, 0);
        this.positionX -= 1;
        this.moveArea[this.positionY].splice(this.positionX, 1, 1);
      }
    },
    // 方向キーの→が押下された際の処理
    async pressedKeyRight(): Promise<void> {
      const x = this.positionX + 1;
      const rightPosition = this.moveArea[this.positionY][x];
      if (rightPosition >= 3) {
        return;
      } else {
        await this.moveArea[this.positionY].splice(this.positionX, 1, 0);
        this.positionX += 1;
        this.moveArea[this.positionY].splice(this.positionX, 1, 1);
      }
    },
    // 会話ダイアログの表示が完了するまで移動制限をオンにする
    setMoveRestriction(): void {
      this.isTalking = true;
    },
    // 移動制限を解除する
    resetMoveRestriction(): void {
      this.isTalking = false;
    }
  }
});
</script>

<style lang="scss" scoped>
.move-area {
  &-wrapper {
    background-size: 1050px auto;
    width: 1050px;
    height: 500px;
    position: relative;
    background-image: url("../assets/mapdata.png");
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: red;
  }
  &-y {
    display: inline-block;
    width: 1050px;
    z-index: 1;
  }
  &-x {
    display: inline-block;
    width: 40px;
    height: 39px;
    z-index: 1;
  }
}
.main-panel {
  &-box {
    display: flex;
  }
}
.images{
}
</style>
