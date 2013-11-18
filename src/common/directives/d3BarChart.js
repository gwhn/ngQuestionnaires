angular.module('ngQuestionnaires.directives')

  .directive('d3BarChart', [
    '$window',
    'd3',
    function ($window, d3) {
      return {
        restrict: 'AE',
        scope: {
          data: '=',
          label: '@',
          value: '@',
          marginTop: '@',
          marginRight: '@',
          marginBottom: '@',
          marginLeft: '@',
          labelHeight: '@',
          barHeight: '@'
        },
        link: function (scope, element, attrs) {

          var margin = {
              top: +scope.marginTop || 40,
              right: +scope.marginRight || 50,
              bottom: +scope.marginBottom || 0,
              left: +scope.marginLeft || 10
            },
            barHeight = +scope.barHeight || 30,
            labelHeight = +scope.labelHeight || 30,
            label = function (d) {
              return d[scope.label];
            },
            value = function (d) {
              return d[scope.value];
            },
            chart = d3.select(element[0])
              .append('svg')
              .attr('class', 'bar-chart');

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

            chart.selectAll('*').remove();

            if (!data || !angular.isArray(data)) {
              return;
            }

            var length = data.length,
              width = element[0].offsetWidth,
              barsWidth = width - margin.left - margin.right,
              barsHeight = ((barHeight + labelHeight) * length),
              chartHeight = barsHeight + margin.top + margin.bottom,
              max = d3.max(data, value),
              x = d3.scale.linear()
                .domain([0, max])
                .range([0, barsWidth]),
              xAxis = d3.svg.axis()
                .ticks(max < 10 ? max : max < 100 ? 10 : 100)
                .scale(x)
                .orient('top')
                .tickSize(-barsHeight)
                .tickFormat(d3.format('f')),
              bar,
              colour = d3.scale.category20();

            bar = chart.attr('height', chartHeight)
              .append('g')
              .attr('class', 'bars')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
              .selectAll('g')
              .data(data)
              .enter()
              .append('g')
              .attr('class', 'bar')
              .attr('transform', function (d, i) {
                return 'translate(0,' + (i * (barHeight + labelHeight)) + ')';
              });

            bar.append('rect')
              .attr('transform', 'translate(0,' + labelHeight + ')')
              .attr('width', 0)
              .attr('height', barHeight)
              .attr('fill', function (d, i) {
                return colour(i);
              })
              .transition()
              .attr('width', function (d) {
                return x(d[scope.value]);
              })
              .delay(function (d, i) {
                return i * 200;
              })
              .duration(1000);

            bar.append('text')
              .attr('class', 'label')
              .attr('x', 1)
              .attr('y', labelHeight / 2)
              .attr('dy', '0.67em')
              .attr('fill', function (d, i) {
                return colour(i);
              })
              .text(label);

            bar.append('text')
              .attr('class', 'value')
              .attr('transform', function (d) {
                return 'translate(' + x(d[scope.value]) + ',' + labelHeight + ')';
              })
              .attr('x', 1)
              .attr('y', barHeight / 2)
              .attr('dy', '0.33em')
              .attr('fill', function (d, i) {
                return colour(i);
              })
              .attr('opacity', 0)
              .text(value)
              .transition()
              .attr('opacity', 1)
              .delay(function (d, i) {
                return (i * 200) + 1000;
              })
              .duration(200);

            chart.append('g')
              .attr('class', 'axis')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
              .attr('height', barsHeight)
              .attr('width', barsWidth)
              .call(xAxis)
              .append('text')
              .attr('transform', 'translate(' + barsWidth + ',-' + margin.top + ')')
              .attr('dy', '1em')
              .text(scope.value);

          };

        }
      };
    }
  ]);
