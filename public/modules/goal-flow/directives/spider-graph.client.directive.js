'use strict';

angular.module('goal-flow').directive('spiderGraph', [
	function() {
		return {
			restrict: 'E',
			scope: {goals: '='},
			link: function postLink(scope, element, attrs) {
				var w = 500, h = 500;
				var colorscale = d3.scale.category10();
				var LegendOptions = ['Time t0','Time t1','Time t2'];
				var data = [
					[
						{axis:"Goal 1",value:0.12},
						{axis:"Goal 2",value:0.20},
						{axis:"Goal 3",value:0.15}
					],[
						{axis:"Goal 1",value:0.32},
						{axis:"Goal 2",value:0.30},
						{axis:"Goal 3",value:0.20}
					],[
						{axis:"Goal 1",value:0.65},
						{axis:"Goal 2",value:0.45},
						{axis:"Goal 3",value:0.34}
					]
				];
				var options = {
					w: w,
					h: h,
					maxValue: 0.6,
					levels: 6,
					ExtraWidthX: 300
				};

				RadarChart.draw(attrs.id, data, options);

				var svg = d3.select('#body')
					.selectAll('svg')
					.append('svg')
					.attr("width", w+300)
					.attr("height", h)

				var text = svg.append("text")
					.attr("class", "title")
					.attr('transform', 'translate(90,0)')
					.attr("x", w - 70)
					.attr("y", 10)
					.attr("font-size", "12px")
					.attr("fill", "#404040")
					.text("% of achievement for each goal per time period");

				var legend = svg.append("g")
						.attr("class", "legend")
						.attr("height", 100)
						.attr("width", 200)
						.attr('transform', 'translate(90,20)')
					;

				legend.selectAll('rect')
					.data(LegendOptions)
					.enter()
					.append("rect")
					.attr("x", w - 65)
					.attr("y", function(d, i){ return i * 20;})
					.attr("width", 10)
					.attr("height", 10)
					.style("fill", function(d, i){ return colorscale(i);})
				;

				legend.selectAll('text')
					.data(LegendOptions)
					.enter()
					.append("text")
					.attr("x", w - 52)
					.attr("y", function(d, i){ return i * 20 + 9;})
					.attr("font-size", "11px")
					.attr("fill", "#737373")
					.text(function(d) { return d; })
				;
			}
		};
	}
]);
