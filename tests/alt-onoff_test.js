"use strict";

describe('altOnOffDirective', function() {
  var _rootScope, _scope, _compile, _element

  beforeEach(module('alt.onoff'))

  beforeEach(inject(function($injector) {
    _rootScope = $injector.get('$rootScope')
    _scope = _rootScope.$new()
    _compile = $injector.get('$compile')

    var _html = '<alt-onoff></alt-onoff>'

    _element = angular.element(_html)
    _compile(_element)(_scope)
    _scope.$digest()
  }))

  describe('diretiva', function() {

    describe('criação', function() {
      it('deve ter o element criado e acessível', function() {
        expect(_element).toBeDefined()
      })

      it('deve ter os parâmetros atribuídos corretamente', function() {
        _scope.obj = {
          a: '123',
          b: '456'
        }
        _scope.label = 'teste'

        var _html = `<alt-onoff modelo="obj.a" label="{{label}}"></alt-onoff>`

        _element = angular.element(_html)
        _compile(_element)(_scope)
        _scope.$digest()

        expect(_element.isolateScope().modelo).toEqual(_scope.obj.a)
        expect(_element.isolateScope().label).toEqual(_scope.label)
      })
    })
  })
});
