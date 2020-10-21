<template>
  <v-container>
    <div class="move-area-wrapper">
      <div class="move-area-y" v-for="(item, index) in moveArea" :key="index">
        <div
          class="move-area-x"
          v-for="(xItems, xIndex) in moveArea[index]"
          :key="xIndex"
        >
          <img
            :src="
              moveArea[index][xIndex] === 1
                ? require(`../assets/images/${playerDirection}.png`)
                : ''
            "
            alt=""
          />
          <!-- 座標テスト -->
          <!-- {{moveArea[index][xIndex]}} -->
        </div>
        <br />
      </div>
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "HelloWorld",
  data: () => ({
    moveArea: [
      [0, 0, 3, 3, 0, 0, 0, 0, 3, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 3, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ], // 0=moveable, 1=player, 3=unable to enter
    positionY: 14,
    positionX: 12,
    direction: "front1", //front,up,right,left
    moveAnimation: false
  }),
  created() {
    this.moveArea[this.positionY][this.positionX] = 1;
    const eventHandler = (e: KeyboardEvent) => {
      this.pressedKey(e);
    };
    document.addEventListener("keydown", eventHandler);
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", eventHandler);
    });
  },
  computed: {
    playerDirection(): string {
      return this.direction;
    }
  },
  methods: {
    // キーダウンイベントを感知した際の処理
    pressedKey(e: KeyboardEvent): void {
      if (e.key === "ArrowUp" && this.positionY != 0) {
        this.moveAnimation ? this.direction = "up2" : this.direction = "up3"
        this.moveAnimation = !this.moveAnimation
        this.pressedKeyUp();
      } else if (e.key === "ArrowDown" && this.positionY != 15) {
        this.moveAnimation ? this.direction = "front2" : this.direction = "front3"
        this.moveAnimation = !this.moveAnimation
        this.pressedKeyDown();
      } else if (e.key === "ArrowRight" && this.positionX != 25) {
        this.moveAnimation ? this.direction = "right2" : this.direction = "right3"
        this.moveAnimation = !this.moveAnimation
        this.pressedKeyRight();
      } else if (e.key === "ArrowLeft" && this.positionX != 0) {
        this.moveAnimation ? this.direction = "left2" : this.direction = "left3"
        this.moveAnimation = !this.moveAnimation
        this.pressedKeyLeft();
      }
    },
    // 方向キーの↑が押下された際の処理
    async pressedKeyUp(): Promise<void> {
      const y = this.positionY - 1;
      const upperPosition = this.moveArea[y][this.positionX];
      if (upperPosition === 3) {
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
      if (bottomPosition === 3) {
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
      if (leftPosition === 3) {
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
      if (rightPosition === 3) {
        return;
      } else {
        await this.moveArea[this.positionY].splice(this.positionX, 1, 0);
        this.positionX += 1;
        this.moveArea[this.positionY].splice(this.positionX, 1, 1);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.move-area {
  &-wrapper {
    background-size:1050px auto;
    width: 1050px;
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
    height: 40px;
    z-index: 1;
  }
}
</style>