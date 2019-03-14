<template>
    <div class="checkPoint_box">
        <p class="game-title">数字华容道</p>
        <p class="game-select">关卡难度选择</p>
        <ul class="btn-menu1">
            <li><router-link to="/gameindex/3">3*3</router-link></li>
            <li><router-link to="/gameindex/4">4*4</router-link></li>
            <li><router-link to="/gameindex/5">5*5</router-link></li>
            <li><router-link to="/gameindex/6">6*6</router-link></li>
            <li><router-link to="/gameindex/7">7*7</router-link></li>
            <li><router-link to="/gameindex/8">8*8</router-link></li>
        </ul>

        <div class="game-rules">
            <strong>游戏规则：</strong>
            <p>在宫图中滑动各数字片至数字顺序按照从小到大、从左往右从上往下排列即挑战完成。</p>
        </div>
    </div>
</template>


<script>


export default {
    data(){
        return {
            
        }
    }
}
</script>

