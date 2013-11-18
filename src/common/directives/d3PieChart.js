angular.module('ngQuestionnaires.directives')

  .directive('d3PieChart', [
    '$window',
    'd3',
    function ($window, d3) {
      return {
        restrict: 'AE',
        scope: {
          data: '=',
          label: '@',
          value: '@',
          height: '@'
        },
        link: function (scope, element, attrs) {

          var chart = d3.select(element[0])
              .append('svg')
              .attr('class', 'pie-chart'),
            height = scope.height || 500,
            colour = d3.scale.category20(),
            value = function (d) {
              return d[scope.value];
            };

          $window.onresize = function () {
            scope.$apply();
          };

          scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
          }, function () {
            scope.render(scope.data);
          });

          scope.$watch('data', function (data) {
            scope.render(data);
          }, true);

          scope.render = function (data) {

            var width = element[0].offsetWidth,
              radius = Math.min(height, width) / 2,
              margin = 30,
              arc = d3.svg.arc()
                .startAngle(function (d) {
                  return d.startAngle;
                })
                .endAngle(function (d) {
                  return d.endAngle;
                })
                .outerRadius(radius - margin)
                .innerRadius(60),
              pie = d3.layout.pie().value(value),
              arcs,
              total = 0,
              pieData,
              label = function (d) {
                var percentage = (d.data[scope.value] / total) * 100;
                return percentage.toFixed(1) + "%";
              };

            chart.selectAll('*').remove();

            if (!data || !angular.isArray(data)) {
              return;
            }

            // Remove any zero values from data
            data = data.filter(function (d) {
              return +d[scope.value] !== 0;
            });

            data.forEach(function (d) {
              total += d[scope.value];
            });

            pieData = pie(data);

            arcs = chart.attr('height', height)
              .append('g')
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
              .selectAll('.arc')
              .data(pieData)
              .enter()
              .append('g')
              .attr('class', 'arc');

            arcs.append('path')
              .attr('d', arc)
              .attr('fill', function (d, i) {
                return colour(i);
              });

            chart.append('g')
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
              .selectAll('line')
              .data(pieData)
              .enter()
              .append('line')
              .attr('x1', 0)
              .attr('x2', 0)
              .attr('y1', -radius + margin - 1)
              .attr('y2', -radius + margin - 10)
              .attr('transform', function (d) {
                return 'rotate(' + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ')';
              });

            chart.append('g')
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
              .selectAll('text')
              .data(pieData)
              .enter()
              .append('text')
              .attr('class', 'label')
              .attr("dy", function (d) {
                if ((d.startAngle + d.endAngle) / 2 > Math.PI / 2 && (d.startAngle + d.endAngle) / 2 < Math.PI * 1.5) {
                  return 5;
                } else {
                  return -7;
                }
              })
              .attr("transform", function (d) {
                return "translate(" + Math.cos(((d.startAngle + d.endAngle - Math.PI) / 2)) * (radius - margin + 12) + "," +
                  Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * (radius - margin + 12) + ")";
              })
              .attr("text-anchor", function (d) {
                if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
                  return "beginning";
                } else {
                  return "end";
                }
              })
              .attr('fill', function (d, i) {
                return colour(i);
              })
              .text(function (d) {
                return d.data[scope.label];
              });

            arcs.append('text')
              .attr('transform', function (d) {
                return 'translate(' + arc.centroid(d) + ')';
              })
              .attr('dy', '0.33em')
              .attr('text-anchor', 'middle')
              .text(label);

            chart.append('text')
              .attr('class', 'label')
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
              .attr('dy', -5)
              .attr('text-anchor', 'middle')
              .text('TOTAL');

            chart.append('text')
              .attr('class', 'total')
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
              .attr('dy', 20)
              .attr('text-anchor', 'middle')
              .text(total);
          };

        }
      };
    }
  ]);
