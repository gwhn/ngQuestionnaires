angular.module('ngQuestionnaires.directives')

  .directive('d3BarChart', ['$window', '$timeout', 'd3',
    function ($window, $timeout, d3) {
      return {
        restrict: 'A',
        scope: {
          data: '='
        },
        link: function (scope, element, attrs) {
          var margin = parseInt(attrs.margin, 10) || 20,
            barHeight = parseInt(attrs.barHeight, 10) || 30,
            barPadding = parseInt(attrs.barPadding, 10) || 10,
            label = attrs.label || 'text',
            value = attrs.value || 'count';

          var svg = d3.select(element[0])
            .append('svg')
            .style('width', '100%');

          $window.onresize = function () {
            scope.$apply();
          };

          scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
          }, function () {
            scope.render(scope.data);
          });

          scope.$watch('data', function (newData) {
            scope.render(newData);
          }, true);

          scope.render = function (data) {
            svg.selectAll('*').remove();

            if (data) {
              var width = d3.select(element[0])[0][0].offsetWidth - margin - barHeight,
                height = scope.data.length * (barHeight + barPadding),
                color = d3.scale.category10(),
                xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function (item) {
                    return item[value];
                  })])
                  .range([0, width]);

              svg.attr('height', height);

              svg.selectAll('badge')
                .data(data)
                .enter()
                .append('circle')
                .attr('r', Math.round(barHeight / 2))
                .attr('cx', Math.round(margin / 2) + Math.round(barHeight / 2))
                .attr('cy', function (item, index) {
                  return (index * (barHeight + barPadding)) + Math.round(barHeight / 2);
                })
                .attr('fill', function (item) {
                  return color(item[value]);
                });

              svg.selectAll('value')
                .data(data)
                .enter()
                .append('text')
                .attr('y', function (item, index) {
                  return index * (barHeight + barPadding) + 20;
                })
                .attr('x', 20)
                .text(function (item) {
                  return item[value];
                });

              svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('height', barHeight)
                .attr('width', 200)
                .attr('x', Math.round(margin / 2) * 5)
                .attr('y', function (item, index) {
                  return index * (barHeight + barPadding);
                })
                .attr('fill', function (item) {
                  return color(item[value]);
                })
                .transition()
                .duration(2000)
                .attr('width', function (item) {
                  return xScale(item[value]);
                });

              svg.selectAll('label')
                .data(data)
                .enter()
                .append('text')
                .attr('y', function (item, index) {
                  return index * (barHeight + barPadding) + 20;
                })
                .attr('x', Math.round(margin / 2) * 6)
                .text(function (item) {
                  return item[label];
                });
            }
          };
        }};
    }]);