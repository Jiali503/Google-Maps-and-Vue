var graph_path = graph_path || '';

jQuery(function() {
  var vue_building_register = new Vue({
    el: '#building-register-app',
    components: {
      'buildingregister': httpVueLoader(graph_path + 'buildingregister.vue')
    }
  });
});
