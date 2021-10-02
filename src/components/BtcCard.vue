<template>
  <div class="parent">
    <div class="hello">
      <div class="header">
        <h3>
          Bitcoin Price
        </h3>
        <h4>
          {{currPrice?.time?.updated}}
        </h4>
      </div>
      <div class="content">
        <!-- binding for dynamic color classname by current price value -->
        <h3 v-bind:class="[color]">
          <!-- diplay formated data using numberWithCommas func -->
          &#36; {{this.numberWithCommas(currPrice?.bpi?.USD.rate_float.toFixed(2))||price}}
        </h3>
      </div>
    </div>
    <h4 class="footer">
        Taken from coinbase Public Api <br/>
        Made by BAGUS JATI KUNCORO
    </h4>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BtcCard',
  data(){
    return{
      currPrice:{},
      color:'crimson'
    }
  },

//setting watcher for updated current price data, this function will run evry currPrice data has changed
  watch:{
    currPrice:function(newVal,oldVal){
      console.log(newVal?.bpi?.USD.rate_float.toFixed(2),oldVal?.bpi?.USD.rate_float.toFixed(2))
      //check is price go Up or go Down
      const check = newVal?.bpi?.USD.rate_float > oldVal?.bpi?.USD.rate_float?'naik':newVal?.bpi?.USD.rate_float < oldVal?.bpi?.USD.rate_float?'turun':'tetap'
      console.log(check)
      //set color class name by 3 stat, naik == green , turun == crimson  , tetap == stay on last color condition
      if(check=='naik'){
        this.color = 'mediumseagreen'
      }
      if(check=='turun'){
        this.color = 'crimson'
      }
    }
  },

  props:['price'],

  methods:{
    //fetching data with axios
    getData() {
      axios .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => {
        // console.log(res.data)
        this.currPrice = res.data
      })
      .catch(err => {
        console.log({err})
      })
    },

    //recursive function for fethcing interval 
    recursiveTimeOutGetData(){
      this.getData()
      setTimeout(function(){
        this.recursiveTimeOutGetData()
      }.bind(this),5000)
    },

    //format price float data
    numberWithCommas(x){
        if(x) return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
  },

  mounted(){
    //start recursive function when component mounted
    this.recursiveTimeOutGetData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .parent{
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  @media (max-width: 700px) {
    .hello{
      display: flex;
      flex-direction: column;
      height: 140px;
      width: 400px;
      background-color: #fff;
      border-radius: 20px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      padding:8px;
    }
  }
  .hello{
    display: flex;
    flex-direction: column;
    height: 140px;
    width: 85%;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding:8px;
  }
  .header{
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
  }
  .header h4{
    font-size: 15px;
    font-weight: 400;
    color: #9a9a9a;
  }
  .content{
    display: flex;
    flex: 3;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 4px;
  }
  .content h3{
    font-size: 40px;
    font-weight:bold;
  } 
  .crimson{
    color: crimson;
  }
  .mediumseagreen{
    color: mediumseagreen;
  }
  .footer{
    margin-top: 40px !important;
    font-weight: 400;
    color:#9a9a9a;
  }
</style>
