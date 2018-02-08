;(function() {
  "use strict";

  angular
  .module('alt.onoff', [])
    .directive('altOnoff', ['$rootScope', '$sce', function($rootScope, $sce) {
      var _template = `<div class="alt-onoff-container">
							<div class="alt-onoff">
								<input type="checkbox" name="alt-onoff" class="alt-onoff-checkbox"
								ng-model="modelo"
								ng-class="{'alt-onoff-checked': modelo}"
								id="alt-onoff">
								<label class="alt-onoff-label" for="alt-onoff">
									<span class="alt-onoff-inner"></span>
									<span class="alt-onoff-switch"></span>
								</label>
							</div>
							<div class="alt-onoff-text">
								<p>{{label}}</p>
							</div>
						</div>`;

      var _scope = {modelo: '=', label: '@'};

      var _replace = true;

      var _restrict = 'E';

      return {
                restrict: _restrict,
                replace: _replace,
                template: _template,
                scope: _scope
             };
    }]);
}());
