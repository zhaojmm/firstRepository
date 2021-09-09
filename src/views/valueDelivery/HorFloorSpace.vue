<template>
    <div class="floorSpace">
        <div
            class="floor-item"
            v-for="(item,index) in floorData"
            :key="index"
        >
            <div class="floor-num"><span>{{item.floorName}}</span></div>
            <div class="floor-space">
                <div
                    class="space-name"
                    v-for="(childItem,id) in item.data"
                    :key="id"
                >
                    <span>{{childItem.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: 'FloorSpace',
    data() {
        return {
            floorData: [
                {
                    floorName: "8F",
                    data: [
                        { id: 1, name: "空间1" },
                        { id: 2, name: "空间2" },
                        { id: 3, name: "空间3" },
                    ],
                },
                {
                    floorName: "7F",
                    data: [
                        { id: 1, name: "空间1" },
                        { id: 2, name: "空间2" },
                        { id: 3, name: "空间3" },
                    ],
                },
            ],
        };
    },
});
</script>
<style lang="less" scoped>
.floorSpace {
    .floor-item {
        display: flex;
        height: 130px;
        padding: 22px 0;
        box-sizing: border-box;
    }

    .floor-num {
        display: flex;
        margin: 0 23px;
        align-items: center;
        font-family: Persagy;
        font-size: 36px;
        font-weight: 700;
        line-height: 43px;
        color: #3b3558;
    }
    .floor-space {
        display: flex;
    }
    .space-name {
        margin-right: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 86px;
        width: 90px;
        border-radius: 8px;
        background: #d9f5d6;
    }
}
</style>


