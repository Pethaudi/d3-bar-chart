const chart = d3.select("#bar");
const ymax = 1000;
const xmax = 2000;
const margin = calculateMargin();
const axisWidth = 10;
const axisColor = "#cacaca";
const ticksWidth = axisWidth / 2;
const ticksLength = 50;
createAxis(["all the bars", "value of the bars"], 2, ["1", "2"]);

function calculateMargin() {
    const text = chart.append("text")
        .text("demotext")
        .attr("font-size", "4em")
        .attr("x", 100)
        .attr("y", 100);

    const bbox = text.node().getBBox();
    text.remove();
    return bbox.height * 1.2;
}

/**
 * @param labels array with 2 string, first x, second y axis
 * @param ticks amount of ticks on the y axis
 * @param dataLabels array with 2 subarray, labels of the bars and ticks to display
 */
function createAxis(labels, ticks, dataLabels) {
    const axis = chart.append("g").attr("id", "axis");

    const yaxis1 = createLine(axis.append("line"), margin, margin, margin, ymax - margin);
    const yaxis2 = createLine(axis.append("line"), xmax - margin, margin, xmax - margin, ymax - margin);
    const xaxis = createLine(axis.append("line"), margin, ymax - margin, xmax - margin, ymax - margin);

    /*const ylabel1 = axis.append("text")
        .text(labels[1])
        .attr("x", 0)
        .attr("y", 0)
        .attr("line-height", "4em")
        .attr("font-size", "4em");

    ylabel1.attr("transform", "translate(" + ((margin / 1.2) * 1.1) + ", " + (ymax / 2 + ylabel1.node().getBBox().width / 2) + ") rotate(270)");

    const ylabel2 = axis.append("text")
        .text(labels[1])
        .attr("x", 0)
        .attr("y", 0)
        .attr("line-height", "4em")
        .attr("font-size", "4em");

    ylabel2.attr("transform", "translate(" + (xmax - ((margin / 1.2) * 0.5)) + ", " + (ymax / 2 + ylabel1.node().getBBox().width / 2) + ") rotate(270)");*/

    const xlabel = axis.append("text")
        .text(labels[0])
        .attr("x", 0)
        .attr("y", 0)
        .attr("line-height", "4em")
        .attr("font-size", "4em");

    xlabel.attr("transform", "translate(" + (xmax / 2 - xlabel.node().getBBox().width / 2)  + ", " + (ymax - (margin / 1.2) * 0.5) + ")")

    const arr = [];
    for (let i = 0; i < ticks; i++) {
        arr.push(i);
    }

    const ticksContainer = axis.append("g").attr("id", "ticks");

    ticksContainer.selectAll("svg")
        .data(arr)
        .enter()
        .append("svg")
        .attr("width", margin + (ticksLength / 2))
        .attr("height", ticksLength)
        .attr("x", 0)
        .attr("y", (elem, idx) => {
            const lengthOfAxis = ymax - 2 * margin;
            return (lengthOfAxis / ticks) * idx + margin;
        })
        .append("line")
        .attr("x1", margin - (ticksLength / 2))
        .attr("y1", 0)
        .attr("x2", margin + (ticksLength / 2))
        .attr("y2", 0)
        .attr("stroke", axisColor)
        .attr("stroke-width", axisWidth);

    ticksContainer.selectAll("svg")
        .append("text")
        .text((elem, idx) => dataLabels[idx])
        .attr("x", margin - (ticksLength / 2))
        .attr("y", ticksLength / 2)
        .attr("font-size", "2em")
        .attr("text-anchor", "end");
}

function createLine(elem, x1, y1, x2, y2) {
    return elem.attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke-linecap", "round")
        .attr("stroke", axisColor)
        .attr("stroke-width", axisWidth);
}

function createLabel(elem, text, rotation, translationX, translationY) {
    return elem.text(text)
        .attr("font-size", "4em")
        .attr("x", 0)
        .attr("y", 0)
        .attr("transform", "rotate(" + rotation + ") translate(" + translationX + ", " + translationY + ")");
}