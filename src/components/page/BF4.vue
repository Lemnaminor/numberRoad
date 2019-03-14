<template>
    <div class="gameIndex-box">
        <!-- 头部导航 -->
        <div class="game-navbar">
            <router-link to="/"><em><i class="iconfont icon-ffanhui-"></i></em></router-link>
            <span>{{$route.params.level}}*{{$route.params.level}}</span>
            <a><em><i class="iconfont icon-shengyin1"></i></em></a>
        </div>

        <!-- 游戏区域 -->
        <div class="game-cont">
            <!-- 计时器 -->
            <div class="time-box">
                <i class="iconfont icon-shizhong1"></i>
                <span id="gameTime">{{mytime}}</span>
            </div>
            <p>目标图案</p>

            <!-- 九宫格 -->
            <ul class="game-menu1">
                <li v-for="(number,index) in levelArray" :key="number.id" @click="changeNumber(index)" clickMusic='true'>
                    <div><span>{{number}}</span></div>
                </li>

                <!-- 开始按钮 -->
                <div class="btn-box2">
                    <span class="gameStart" @click="gameStart">{{gameStartText}}</span>
                </div>
            </ul>
        </div>

        <!-- 游戏结束提示框 -->
        <div class="game-prompt" v-show="isPromptShow">
            <strong>通关啦</strong>
            <p>
                <span>
                    <i class="iconfont icon-shizhong1"></i>
                    本次用时:
                </span>
                <strong>{{newsTime}}</strong>
            </p>
            <p>
                <span>
                    <i class="iconfont icon-shizhong1"></i>
                    历史最佳:
                </span>
                <strong>{{goodsTime}}</strong>
            </p>
            <div class="prompt-btn">
                <span><router-link to="/">关卡选择</router-link></span>
                <span @click="againGame">再玩一次</span>
            </div>
        </div>

        <audio id="btnMusic" 
            preload="auto"
            src="../../assets/music/buttonclick.mp3">
        </audio>

    </div>
</template>


<script>
  import VueAudio from 'vue-audio'
    export default {
        data() {
            return {
                levelArray: [],
                isGameStart: false,
                gameStartText: '开始游戏',
                min: 0,
                sec: 0,
                resetTime: 0,
                mytime: '00:00',
                isPromptShow: false,
                newsTime: '',
                goodsTime: '',
                
            }
        },
        mounted: function () {
            // 初始化页面
            let level = parseInt(this.$route.params.level);
            for (let i = 1; i < (level * level); i++) {
                this.levelArray.push(i);
            }
            this.levelArray.push(level * level);
            this.levelPage();
            this.setEmpty();



        },
        methods: {
            // 游戏开始
            gameStart: function () {
                console.log('start')
                this.createPage();
                this.setEmpty();
                this.isGameStart = true;
                this.gameStartText = '重置游戏';
                this.timeReset();
                this.timeStart();
            },

            // 创建游戏页面
            createPage: function () {
                let gameArr = [];
                let level = parseInt(this.$route.params.level);
                for (let i = 1; i < (level * level); i++) {
                    gameArr.push(i);
                }
                // 随机重排
                gameArr = this.shuffle(gameArr);
                this.levelArray = gameArr;
                gameArr.push(level * level);
                this.levelPage();

            },
            // 根据level值生成不同页面
            levelPage: function () {
                let level = parseInt(this.$route.params.level);
                switch (level) {
                    case 3: document.querySelector('.game-menu1').classList.add("level3"); break;
                    case 4: document.querySelector('.game-menu1').classList.add("level4"); break;
                    case 5: document.querySelector('.game-menu1').classList.add("level5"); break;
                    case 6: document.querySelector('.game-menu1').classList.add("level6"); break;
                    case 7: document.querySelector('.game-menu1').classList.add("level7"); break;
                    case 8: document.querySelector('.game-menu1').classList.add("level8"); break;
                }
            },
            // 给空白格子添加class类
            setEmpty: function () {
                this.$nextTick(function () {
                    let gameLi = document.getElementsByTagName("li");
                    for (var i = 0; i < gameLi.length; i++) {
                        gameLi[i].classList.remove('empty');
                        if (parseInt(gameLi[i].innerText) == gameLi.length) {
                            gameLi[i].classList.add('empty');
                        }
                    }
                })
            },
            // 点击交换数字
            changeNumber: function (ele) {
                if (this.isGameStart == false) return false;
                let level = parseInt(this.$route.params.level);
                let activeIndex = ele; // 下标数字
                let activeNumber = this.levelArray[ele]; // 下标内容数字

                // 点击不为空0的方块时执行
                if (activeNumber != 0) {
                    // 添加音效
                    this.clickButton();

                    // console.log(activeIndex+1);
                    // console.log(activeNumber);
                    // 获取上下左右的数字
                    let emptyNum = parseInt(level * level);
                    let topNum = this.levelArray[ele - level];
                    let leftNum = this.levelArray[ele - 1];
                    let rightNum = this.levelArray[ele + 1];
                    let bottomNum = this.levelArray[ele + level];

                    if (topNum == emptyNum) {
                        this.$set(this.levelArray, ele, emptyNum);
                        this.$set(this.levelArray, ele - level, activeNumber);
                        this.setEmpty();
                    }
                    if (leftNum == emptyNum) {
                        this.$set(this.levelArray, ele, emptyNum);
                        this.$set(this.levelArray, ele - 1, activeNumber);
                        this.setEmpty();
                    }
                    if (rightNum == emptyNum) {
                        this.$set(this.levelArray, ele, emptyNum);
                        this.$set(this.levelArray, ele + 1, activeNumber);
                        this.setEmpty();
                    }
                    if (bottomNum == emptyNum) {
                        this.$set(this.levelArray, ele, emptyNum);
                        this.$set(this.levelArray, ele + level, activeNumber);
                        this.setEmpty();
                    }
                    console.log(this.levelArray);
                    this.checkGameover();

                }
            },
            // 检查游戏是否完成
            checkGameover: function () {
                let isGameover = this.levelArray.every((ele, index) => {

                    return ele === index + 1;

                })
                console.log(isGameover);
                this.$nextTick(function () {
                    if (isGameover == true) {
                        setTimeout(() => {
                            this.isGameStart = false,
                            this.gameStartText = '开始游戏';
                            this.isPromptShow = true;
                            
                            console.log(this.newsTime);
                            if(sessionStorage.getItem("goodsTime") == null){
                                console.log('step1');
                                sessionStorage.setItem('goodsTime',this.newsTime);
                            }
                            console.log(sessionStorage.getItem("goodsTime").toString());
                            if(this.newsTime <= sessionStorage.getItem("goodsTime") == true){
                                console.log('step2');
                                sessionStorage.setItem('goodsTime',this.newsTime);
                                this.goodsTime = sessionStorage.getItem("goodsTime");
                            }
                            this.timeReset();
                        }, 100);
                    }
                })

            },
            // 经典随机算法
            shuffle: function (arr) {
                var len = arr.length;
                for (var i = 0; i < len - 1; i++) {
                    var idx = Math.floor(Math.random() * (len - i));
                    var temp = arr[idx];
                    arr[idx] = arr[len - i - 1];
                    arr[len - i - 1] = temp;
                }
                return arr;
            },
            // 计时器
            timer: function () {
                this.sec++;

                if (this.sec == 60) {
                    this.min++;
                    this.sec = 0;
                }

                this.mytime = this.toDub(this.min) + ":" + this.toDub(this.sec);
                this.newsTime = this.mytime;
            },
            // 计时开始
            timeStart: function () {
                this.time = setInterval(this.timer, 1000);
            },
            // 时间重置
            timeReset: function () {
                clearInterval(this.time);
                this.min = 0;
                this.sec = 0;
                this.mytime = "00:00";
            },

            // 时间补0
            toDub: function (n) {
                if (n < 10) {
                    return "0" + n;
                }
                else {
                    return "" + n;
                }
            },
            // 弹出页面再玩一次按钮事件
            againGame:function(){
                this.isPromptShow = false;
            },
            // 添加音效
            clickButton:function(){
                console.log('music');
                let audio = document.getElementById('btnMusic');
                audio.play();
            },



        },
    }
</script>