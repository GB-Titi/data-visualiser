<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
    name: 'Charts',
  data() {
    return {
      dataList: [],
    }
  },
mounted() {
    var requestURL =
      "https://run.mocky.io/v3/70e5b0ad-7112-41c5-853e-b382a39e65b7";
    fetch(requestURL)
      .then((response) => response.json())
      .then((data) => (this.dataList = data.people));
     // console.log('MOUNTED => build chart')
        new Chart(document.getElementById('chart').getContext('2d'), {
            type:'pie',
            data: {
                labels: ["Bird", "Cat"],
                datasets: [{
                    label: "Favorite Animals",
                    data: [this.getAnimalStats],
                    borderColor: [
                        'rgb(0, 0, 255)',
                        'rgb(0, 255, 255)',
                        'rgb(0, 100, 0)',
                        'rgb(255, 0, 0)'
                    ],
                    backgroundColor: [
                        'rgb(0, 0, 255)',
                        'rgb(0, 255, 255)',
                        'rgb(0, 100, 0)',
                        'rgb(255, 0, 0)',
                    ],
                    borderWidth: 1
                }],
            },
        })
  },
  methods:{},
  computed:{
    getAnimalStats: () =>
    {
      //objet avec clefs (dog, cat etc..)
      //et y ajouter les fonctions de filtres diff
    /*  let cats = 0;
      this.dataList.preferences.favorite_pet.forEach(element => {
        if(element == this.dataList.preferences.favorite_pet.toUpperCase('cat')){
          cats = cats++;
        }
      });
      console.log(cats);

      let birds = 0;
      this.dataList.preferences.favorite_pet.forEach(element => {
        if(element == this.dataList.preferences.favorite_pet.toUpperCase('bird')){
          birds = birds++;
        }
      });

      return cats, birds;
*/
      return this.dataList.filter( (item) => {
          return item.preferences.favorite_pet.toUpperCase() == 'cat'.toUpperCase(), item.preferences.favorite_pet.toUpperCase() == 'bird'.toUpperCase()
      }).length;
    }
  }
}

</script>