<template>
  <div class="graphs">
    <h1>La page des graphiques</h1>
     <Charts/>
  </div>
</template>


<script>
import Charts from '@/components/Chart.vue'

export default {
  name: 'Graphiques',
  components: {
    Charts
  }
}
</script>
