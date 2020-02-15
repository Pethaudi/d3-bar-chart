const chart = d3.select("#chart");
const axisWidth = 5;
const axisColor = "#000";
const xmax = 2000;
const ymax = 1000;
const margin = 10;

const axis = chart.append("g");
axis.attr("stroke", axisColor)
	.attr("stroke-width", axisWidth);

const yaxis = axis.append("line");
yaxis.attr("x1", margin)
	.attr("y1", margin)
	.attr("x2", margin)
	.attr("y2", ymax - margin);

const xaxis = axis.append("line");
xaxis.attr("x1", margin - 2.5)
	.attr("y1", ymax - margin)
	.attr("x2", xmax - margin)
	.attr("y2", ymax - margin);

const ylabel = axis.append("text");
const rotate = "rotate(270)";
ylabel.text("the ylabel")
	.attr("font-size", "4em")
	.attr("x", 0)
	.attr("y", 0);

const translatey = "translate(" + ylabel.node().getBBox().height + ", " + ((ymax + ylabel.node().getBBox().width) / 2) + ")";
ylabel.attr("transform", translatey + rotate);

const xlabel = axis.append("text");
xlabel.text("the xlabel")
	.attr("font-size", "4em")
	.attr("x", 0)
	.attr("y", 0);

const translatex = "translate(" + ((xmax - xlabel.node().getBBox().width) / 2) + ", " + (ymax - margin) + ")";
xlabel.attr("transform", translatex);


const data = [10, 20, 30, 40, 50];

const bars = chart.append("g");

const wb = (2 * xmax) / (3 * data.length + 1);

function calc(n) {
	return ((n + 1) * wb / 2) + n * wb;
}

bars.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
	.attr("width", wb)
	.attr("height", 100)
	.attr("stroke", "green")
	.attr("transform", function(a, idx) { return "translate(" + calc(idx) + ", " + (ymax - 100) + ")"});