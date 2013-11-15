angular.module('ngQuestionnaires.directives')

  .directive('d3PackChart', [
    '$window',
    '$location',
    '$timeout',
    'd3',
    function ($window, $location, $timeout, d3) {
      return {
        restrict: 'AE',
        scope: {
          data: '=',
          title: '@',
          children: '@',
          value: '@',
          url: '@'
        },
        link: function (scope, element, attrs) {

          var svg = d3.select(element[0])
              .append('svg')
              .attr('class', 'd3-pack-chart'),
            format = d3.format(',d'),
            colour = d3.scale.category10();

          function render() {
            var diameter = svg[0][0].offsetWidth,
              margin = 1,
              sw = diameter - margin * 2,
              sh = sw,
              pack = d3.layout.pack()
                .size([sw, sh])
                .value(function (d) {
                  return d[scope.value];
                }),
              chart,
              node;

            svg.selectAll('*').remove();

            chart = svg.attr('width', diameter)
              .attr('height', diameter)
              .append('g')
              .attr('transform', 'translate(' + margin + ',' + margin + ')');

            if (scope.data) {
              node = chart.datum(scope.data)
                .selectAll('.node')
                .data(pack.nodes)
                .enter()
                .append('g')
                .attr('class', function (d) {
                  return d[scope.children] ? 'node' : 'leaf node';
                })
                .attr('transform', function (d) {
                  return 'translate(' + d.x + ',' + d.y + ')';
                })
                .on('click', function (d) {
                  function url(node) {
                    if (!node.parent) {
                      return;
                    } else if (node[scope.url]) {
                      return node[scope.url];
                    }
                    return url(node.parent);
                  }

                  var path = url(d);

                  if (path) {
                    $timeout(function () {
                      $location.path(path);
                    });
                  }
                });

              node.append('title')
                .text(function (d) {
                  return d[scope.title] + (d[scope.children] ? '' : ': ' + format(d[scope.value]));
                });

              node.append('circle')
                .attr('r', 0)
                .style('fill', function (d) {
                  return colour(d.depth);
                })
                .transition()
                .attr('r', function (d) {
                  return d.r;
                })
                .delay(function (d, i) {
                  return i * 5;
                })
                .duration(100);

              node.filter(function (d) {
                return !d[scope.children];
              })
                .append('text')
                .attr('dy', '0.33em')
                .style('text-anchor', 'middle')
                .transition()
                .delay(function (d, i) {
                  return i * 7;
                })
                .duration(100)
                .text(function (d) {
                  return d[scope.title].substring(0, d.r / 2.1);
                });
            }
          }

          scope.$watch('data', render);

          $window.onresize = function () {
            scope.$apply();
          };

          scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
          }, function () {
            render();
          });
        }
      };
    }
  ]);
