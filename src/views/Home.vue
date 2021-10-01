<template>
  <div class="home">
    <BtcCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import BtcCard from '@/components/BtcCard.vue'

export default {
  name: 'Home',
  components: {
    BtcCard
  }
}
</script>

<style scoped>
  .home{
    display: flex;
    width: 100%;
    min-height: 100vh;
    padding-top: 30px;
    background-color: #eeeeee;
    justify-content: center;
    align-items: flex-start;
  }
</style>
