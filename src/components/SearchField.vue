<template>
  <input id="search-field" type="text" v-model="searchinput" placeholder="Enter search terms" />
</template>

<script>
export default {
  data: function () {
    return {
      searchinput: ""
    }
  },
  methods: {
    initAutocomplete: function() {
      console.log('+> Initialize search component');
      // TODO: Need to remove jQuery usage.
      /*
      var _self = this;
      var $search_field = jQuery('#search-field');
      $search_field.autocomplete({
        source: function(request, response) {
          $.getJSON('./src/data/searchresults.json', function(resp) {
            var rtn = [];
            resp.forEach(function(item) {
              rtn.push({label: item.title, value: item.title});
            });
            response(rtn);
          });
        }
      });
      $search_field.on('autocompleteselect', this.select);
      */
    },
    select: function(event, ui) {
      this.$emit('selection', ui);
    }
  },
  mounted() {
    this.initAutocomplete();
  },
  props: [],
  watch: {}
}
</script>

<style>

</style>

