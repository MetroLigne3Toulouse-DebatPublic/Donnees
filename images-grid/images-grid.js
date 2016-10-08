(function () {
    'use strict';

    angular
        .module('app', ['ngAnimate'])
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($http) {
        var $ctrl = this;

        $ctrl.openAllTooltips = true;

        $ctrl.maps = [];

        $ctrl.tags = [{
            id: 'transport',
            label: 'Transport/mobilité'
        }, {
            id: 'urbanisme',
            label: 'Urbanisme/socio-économie'
        }, {
            id: 'environnement',
            label: 'Environnement, paysage et patrimoine'
        }, {
            id: 'propositions',
            label: 'Propositions du public'
        }];

        $ctrl.activeTags = $ctrl.tags.reduce(function (activeTags, tag) {
            activeTags.push(tag.id);
            return activeTags;
        }, []);

        // load maps from json file
        $http.get('maps.json').success(function (maps) {
            $ctrl.maps = maps;
        });

        $ctrl.isSelected = function (map) {
            return angular.isDefined($ctrl.selectedMap) && $ctrl.selectedMap.imageUrl === map.imageUrl;
        }

        $ctrl.countMapsByTag = function (tag) {
            return $ctrl.maps.reduce(function (count, map) {
                if (map.tags.indexOf(tag) !== -1) {
                    count++;
                }
                return count;
            }, 0);
        }

        $ctrl.activeMaps = angular.copy($ctrl.maps);

        $ctrl.getMapLink = function (map) {
            if (angular.isDefined(map.flickrUrl)) {
                return map.flickrUrl;
            }
            return map.imageUrl;
        }

        function isActiveMap(map) {
            var isActiveMap = map.tags.reduce(function (isActive, tag) {
                if (!isActive && $ctrl.activeTags.indexOf(tag) !== -1) {
                    isActive = true;
                }
                return isActive;
            }, false);
            return isActiveMap;
        }

        $ctrl.toggleTag = function (tag) {
            var index = $ctrl.activeTags.indexOf(tag);
            if (index === -1) {
                $ctrl.activeTags.push(tag);
            } else {
                $ctrl.activeTags.splice(index, 1);
            }
            // update maps activity
            for (var i = 0; i < $ctrl.maps.length; i++) {
                var map = $ctrl.maps[i];
                map.hide = !isActiveMap(map);
            }
        }
    }

})();
