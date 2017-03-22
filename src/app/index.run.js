(function() {
  'use strict';

  angular
    .module('annyang')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
