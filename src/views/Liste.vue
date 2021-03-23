<template>
  <div class="liste">
    <h1>Liste du json</h1>
    <DataList/>
  </div>
</template>

<script>
// @ is an alias to /src
import DataList from '@/components/DataList.vue'

export default {
  name: 'Liste',
  components: {
    DataList
  }
}
</script>
