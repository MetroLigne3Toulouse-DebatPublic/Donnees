(function () {
    'use strict';

    console.log('tes1t')
    angular
        .module('app', ['ngAnimate'])
        .controller('MainCtrl', MainCtrl);

    function MainCtrl() {
        var $ctrl = this;

        $ctrl.activeTags = ['density', 'environment', 'alternatives'];

        $ctrl.maps = [{
            imageUrl: 'https://c8.staticflickr.com/6/5473/29358613943_57a8334b1b_b.jpg',
            flickrUrl: 'https://www.flickr.com/photos/cndpdebatpublic/29358613943/',
            forumUrl: 'https://forum.metroligne3toulouse.fr/t/carte-densite-de-population-par-categorie-socio-professionnelle/72/2',
            title: 'Carte densit\u00e9 de population par cat\u00e9gorie socio-professionnelle',
            tags: ['density']
        }, {
            imageUrl: 'https://c7.staticflickr.com/6/5150/29691369750_61bc49292d_b.jpg',
            flickrUrl: 'https://www.flickr.com/photos/cndpdebatpublic/29691369750/',
            forumUrl: 'https://forum.metroligne3toulouse.fr/t/carte-densite-de-population-par-tranche-d-age/71/2',
            title: 'Carte densit\u00e9 de population par tranche d\'\u00e2ge',
            tags: ['density']
        }, {
            imageUrl: './cartes/en-cours-realisation.png',
            title: 'Itin\u00e9raire alternatif X',
            tags: ['alternatives']
        }, {
            imageUrl: './cartes/en-cours-realisation.png',
            title: 'Carte de pollution atmosph\u00e9rique',
            forumUrl: 'https://forum.metroligne3toulouse.fr/t/carte-de-pollution-atmospherique/77',
            tags: ['environment']
        }];

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
