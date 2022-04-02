<template>
    <div class="mapdata">
        <!-- <textarea class="content" v-model="message"></textarea>
        <button class="sure" v-on:click="onclick">提交</button> -->

        <!-- <input class="" type="file" @change="getFile" /> -->
        <div class="file-upload">
            <div class="file-upload-text">上传文件</div>
            <input
                class="file-upload-input"
                id="upfile"
                type="file"
                @change="getFile"
            />
        </div>
        <div class="fileName">{{ fileName }}</div>
    </div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            name: "mapdata",
            message: null,
            fileName: "",
        };
    },
    created() {
        // console.log(this.name);
    },
    methods: {
        getFile(e) {
            console.log(e.target.files);
            var fileSelect = e.target.files[0];
            this.fileName = fileSelect.name;
            let reader = new FileReader();
            if (typeof FileReader === "undefined") {
                console.log("您的浏览器不支持FileReader接口");
                return;
            }
            reader.readAsText(fileSelect, "gb2312"); //注意读取中文的是用这个编码，不是utf-8
            const _this = this;
            reader.onload = function() {
                // console.log(reader.result);
                var result = reader.result;
                // _this.$nextTick(() => {
                //     _this.voiceContent = reader.result;
                // });
                _this.handleStr(result);
            };
            //console.log(reader);
        },
        // onclick() {
        //     console.log(this.message);
        //     this.handleStr(this.message);
        // },
        handleStr(mapstr) {
            var maparr = mapstr.split("<DIV ");
            //console.log("maparr", maparr);
            var _this = this;
            var allDiv = [];
            //debugger;
            maparr.map((item) => {
                var divobj = {};
                var divarr = item.split(" ");
                //console.log("divarr", divarr);
                divarr.map(function(item) {
                    if (item.indexOf("id=") > -1) {
                        var idarr = item.split("=");
                        // debugger;
                        var idstr = idarr[1];
                        divobj.id = idstr;
                        // console.log("idstr", idstr);
                        return;
                    }
                });

                divobj.height = this.getNum(item, "HEIGHT");
                divobj.width = this.getNum(item, "WIDTH");
                divobj.left = this.getNum(item, "LEFT");
                divobj.top = this.getNum(item, "TOP");
                if (divobj.width) {
                    allDiv.push(divobj);
                }

                // var hindex = divarr.indexOf("HEIGHT:");
                // var windex = divarr.indexOf("WIDTH:");
                // var lindex = divarr.indexOf("LEFT:");
                // var tindex = divarr.indexOf("TOP:");
                //console.log(hindex, windex, lindex, tindex);
            });
            console.log("allDiv", allDiv);
            console.log("allDiv-string", JSON.stringify(allDiv));
            this.saveMapInfo(allDiv);
        },
        saveMapInfo(allDiv) {
            this.$axios.post(this.$api.saveMapInfo, allDiv).then((res) => {
                debugger;
            });
        },
        getNum(str, param) {
            //debugger;
            var paindex = str.indexOf(param);
            if (paindex > -1) {
                var palength = param.length;
                var otherstr = str.substr(paindex + palength);
                var pxindex = otherstr.indexOf("px");
                var numstr = otherstr.substr(0, pxindex);
                numstr = numstr.replace(/:/, "");
                return numstr ? Number(numstr) : "";
            }
            return "";
        },
    },
});
</script>
<style lang="less" scoped>
.mapdata {
    padding: 30px;
    position: relative;
    // }
    // .file-upload {
    //     width: 90px;
    //     height: 40px;
    //     position: relative;
    //     overflow: hidden;
    //     border: 1px solid #0f996b;
    //     display: inline-block;
    //     border-radius: 4px;
    //     font-size: 15px;
    //     color: #000;
    //     text-align: center;
    //     line-height: 40px;
    // }
    // .file-upload-input {
    //     background-color: transparent;
    //     position: absolute;
    //     width: 999px;
    //     height: 999px;
    //     top: 0px;
    //     left: 0px;
    //     cursor: pointer;
    // }

    .file-upload {
        width: 90px;
        height: 36px;
        position: relative;
        overflow: hidden;
        border: 1px solid #0f996b;
        display: inline-block;
        border-radius: 4px;
        font-size: 14px;
        color: #0f996b;
        text-align: center;
        line-height: 36px;
        margin: 10px 0 auto auto;
    }
    .file-upload-input {
        background-color: transparent;
        position: absolute;
        width: 999px;
        height: 999px;
        top: -100px;
        left: -100px;
        cursor: pointer;
    }
    .fileName {
        margin-top: 14px;
        color: #000000;
        font-size: 16px;
    }
    // .content {
    //     width: 900px;
    //     height: 700px;
    // }
    // .sure {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     cursor: pointer;
    //     width: 60px;
    //     height: 40px;
    //     font-size: 16px;
    //     color: #575271;
    //     font-weight: 400;
    //     line-height: 22px;
    //     margin-left: 10px;
    //     background: rgb(126, 216, 116);
    //     border: 2px solid hsla(0, 0%, 100%, 0.8);
    //     box-sizing: border-box;
    //     border-radius: 8px;
    //     margin-top: 20px;
    // }
}
</style>
