<template>
    <div style="display: inline-flex; align-items:center">
        <button class="button_save" @click="saveFile()">Télécharger en CSV</button>
    </div>

    <div class="wrap-table100">
        <div class="table100 ver1 m-b-110">
            <div class="table100-head">
                <table>
                    <thead>
                        <tr class="row100 head">
                            <th class="cell100 column1">Nom</th>
                            <th class="cell100 column2">Prénom</th>
                            <th class="cell100 column3">Genre</th>
                            <th class="cell100 column4">Mail</th>
                            <th class="cell100 column5">Adresse</th>
                            <th class="cell100 column6">Ville</th> 
                            <th class="cell100 column7">Pays</th> <!-- graph -->
                            <th class="cell100 column8">Location</th>
                            <th class="cell100 column9">Téléphone</th>
                            <th class="cell100 column10">Animal favoris</th> <!-- graph -->
                            <th class="cell100 column11">Fruit favoris</th> <!-- graph -->
                            <th class="cell100 column12">Couleure favorite</th> <!-- graph -->
                            <th class="cell100 column13">Film favoris</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="table100-body js-pscroll ps ps--active-y">
                <table>
                    <tbody>
                        <tr v-for="(data, key) in paginedList" :key="key" class="row100 body"> 
                            <td class="cell100 column1"> {{ data.firstname }}</td>
                            <td class="cell100 column2"> {{ data.lastname }}</td>
                            <td class="cell100 column3"> {{ data.gender }}</td>
                            <td class="cell100 column4"> {{ data.contact.email }}</td>
                            <td class="cell100 column5"> {{ data.contact.address }}</td>
                            <td class="cell100 column6"> {{ data.contact.city }}</td>
                            <td class="cell100 column7"> {{ data.contact.country }}</td>
                            <td class="cell100 column8"> {{ data.contact.location.lon }} <br/>{{ data.contact.location.lat }}</td>
                            <td class="cell100 column9"> {{ data.contact.phone }}</td>
                            <td class="cell100 column10"> {{ data.preferences.favorite_pet }}</td>
                            <td class="cell100 column11"> {{ data.preferences.favorite_fruit }}</td>
                            <td class="cell100 column12"> {{ data.preferences.favorite_color }}</td>
                            <td class="cell100 column13"> {{ data.preferences.favorite_movie }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
                <tfoot><!-- Foot fait à la va vite à retoucher pour rendre propre -->
                    <tr>
                        <th scope="row" colspan="2" style="padding: 15px;">Rechercher :</th>
                        <input type="text" id="searchbar" v-model="filter" placeholder="Rechercher un élément"/>
                        <th id="search_logo" @click="Search"><img alt="Vue logo" src="../assets/loupe.svg"></th>
                        <th id="pagination"> 
                            <button v-if="currentPage > 1" @click="prevPage()" class="button_pagination">Précédent</button>
                            <button @click="nextPage()" class="button_pagination">Suivant</button>
                            <p style="padding: 0px 15px;"> Page <br/> <strong>{{currentPage}}</strong> </p>
                            <select v-model="pageSize" placeholder="Nb lignes affichées" style="padding: 15px;">
                                <option>5</option>
                                <option>15</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                        </th>
                     </tr>
                </tfoot>
        </div>
    </div>
</template>

<script>

export default {
  name: "DataList",
  components:{},
  data() {
    return {
        dataList: [],
        currentPage: 1,
        pageSize: '5',
        filter: "",
       // search: "",
    };
  },
  mounted() {  //mounted permet la récupération des que le composant se déclanche
    var requestURL =
      "https://run.mocky.io/v3/70e5b0ad-7112-41c5-853e-b382a39e65b7";
    fetch(requestURL)
      .then((response) => response.json())
      .then((data) => (this.dataList = data.people));
  },
  methods: {
    /*Search(){
        return this.dataList.filter(this.search);
    },*/
    
    nextPage() {
        if (this.currentPage * this.pageSize < this.dataList.length)
            this.currentPage++;
        },

    prevPage() {
        if (this.currentPage > 1) this.currentPage--;
    },

    saveFile() {
      let dataStr = JSON.stringify({...this.paginedList});
      let dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      let exportFileName = "list.json";

      let linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileName);
      linkElement.click();
    }
  },
    computed: {
        paginedList() {
            // Pour l'instant la fonction retourne $pageSize poeple soit 10 --> le rendre dynamique pour que utilisateur choisisse
            return this.filteredRows.filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;
            });
        },
           filteredRows() {
                return this.dataList.filter((row) => {
                    const firstname = row.firstname.toLowerCase();
                    const lastname = row.lastname.toLowerCase();
                    const pays = row.contact.country.toLowerCase(); //ville, animal, fruit, couleur
                    const ville = row.contact.city.toLowerCase();
                    const fruit = row.preferences.favorite_fruit.toLowerCase();
                    const animal = row.preferences.favorite_pet.toLowerCase();
                    const color = row.preferences.favorite_color.toLowerCase();
                    const searchTerm = this.filter.toLowerCase();
                    return firstname.includes(searchTerm) || lastname.includes(searchTerm) || pays.includes(searchTerm) || ville.includes(searchTerm)
                    || fruit.includes(searchTerm) || animal.includes(searchTerm) || color.includes(searchTerm);
                });
            },
        searchResult() {
            let searchedList = this.dataList;
            
            if (this.searchValue != '' && this.searchValue) {
                    searchedList = searchedList.filter((item) => {
                    return item.title
                        .toUpperCase()
                        .includes(this.searchValue.toUpperCase())
                    })
                }
                return searchedList;
        }
    },
}

</script>

<style scoped>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
}

tr{
    width: 100%;
    height: 2%;
}

th{
    width: max-content;
    text-align: left;
    border-right: 1px solid #626cb7;
}

th, td {
    font-weight: unset;
    padding: 2px;
}

td{
    border-right: solid 1px #f2f2f2;
}

 table {
    width: 100%;
    border-collapse: collapse;
}
 
 .wrap-table100{
    width: 98%;
    margin: auto;
 }

.table100{
    position: relative;
    padding-top: 60px;
    background-color: #fff;
}

.table100-head{
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    text-align: center;
}

.m-b-110{
    margin-bottom: 110px;
}

 .table100.ver1{
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 40px 0 rgba(0,0,0,.15);
    -moz-box-shadow: 0 0 40px 0 rgba(0,0,0,.15);
    -webkit-box-shadow: 0 0 40px 0 rgba(0,0,0,.15);
    -o-box-shadow: 0 0 40px 0 rgba(0,0,0,.15);
    -ms-box-shadow: 0 0 40px 0 rgba(0,0,0,.15);
    text-align: center;
 }

 .table100.ver1 th{
    font-family: Lato-Bold;
    font-size: 18px;
    color: #fff;
    line-height: 1.4;
    background-color: #6c7ae0;
    text-align: center;
 }

.table100-body {
    overflow: auto;
    font-size: 14px;
}
.js-pscroll {
    position: relative;
    overflow: hidden;
}
.ps {
    overflow: hidden !important;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;
}

.table100.ver1 .table100-body tr:nth-child(2n) {
    background-color: #f8f6ff;
}

.table100.ver1 .table100-body tr:nth-child(2n) > td{
    border-right: 1px solid #e9e7f1;
}


.column1{
    width: 4.5%;
}

.column2{
    width: 6%;
}

.column3{
    width: 3.5%;
}

.column4{
    width: 12.5%; /* Voir si j'ai pas inversé avec 5 */
    text-align: justify;
}

.column5{
    width: 11%;
    text-align: justify;
}

.column6{
    width: 6.5%;
}

.column7{
    width: 7%;
}

.column8{
    width: 6%;   
}

.column9{
    width: 10%;
}

.column10{
    width: 6%;
}

.column11{
    width: 6%;
}

.column12{
    width: 6%;
}

.column13{
    width: 15%;
    text-align: justify;
}

#searchbar{
    width: 30%;
    border: none;
    padding: 15px;
    font-size: 1.2rem;
}

tfoot{
    display: block;
    text-align: left;
    align-self: left;
    flex-direction: row;
}

tfoot tr{
    display: flex;
    width: 100%;
}

#search_logo{
    width: 2%;
    background-color: white;
    padding: 5px;
    display: flex;
    border: none;
}

#pagination{
    display: flex;
}


.button_pagination {
    background-image: linear-gradient(to right, #6190E8 0%, #A7BFE8  51%, #6190E8  100%)
    }

.button_pagination {
    margin: 10px;
    padding: 5px 25px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    border-radius: 10px;
    display: block;
}

.button_pagination:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}


.button_save {background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA  51%, #77A1D3  100%)}
.button_save {
    margin: 10px;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    border-radius: 10px;
    display: block;
}

.button_save:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}
         
         


</style>