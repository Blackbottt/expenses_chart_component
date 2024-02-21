console.log("Js, is no challenge...!")
const chart = document.getElementById("chart");
console.log("Js, ", chart);

// variables that are useful
var width = 400;
var height = 200;
var svgHeight = 220; //axis + graph but within svg
var margins = {
  top: 30,
  bottom: 30,
  left: 20,
  right: 20
}
var padding = 5;

d3.json("data.json")
  .then(function(data) {
    // Your code to handle the loaded data
    console.log(data);
    // extract days from json
    const expenses = [];
    data.map(d => expenses.push(d.day));
    console.log("E", expenses);
    // append svg to html element
    var svg = d3.select(chart)
      .append("svg")
      .attr("width", width)
      .attr("height", svgHeight)
    ;      
    
    // setting scales
    const xScales = d3.scaleBand()
      .domain(data.map(d => d.day)) // Extract country names from data
      .range([0, width])
      .padding(0.2)
    ;
    const yScales = d3.scaleLinear()
      .domain([0, d3.max(data.map(d => d.amount))])
      .range([height, 0])
    ;
    
    // svg elements
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("x", d => xScales(d.day))
      .attr("y", d => yScales(d.amount))
      .attr("width", xScales.bandwidth())
      // hardcoded height 
      .attr("height", d => 200 - yScales(d.amount))
      // .attr("fill", "steelblue")
      .classed("heavy", true)
      .attr("opacity", 0.7)
      .attr("hover", 0.7)
    ;
    //
     // select all rect
    d3.selectAll("rect")
      .on("mouseover", function(d) {
        // change the selection style
        d3.select(this)
          .classed("heavy", false)
          .attr("fill", "hsl(186, 34%, 60%)")
      })
      .on("mouseout", function() {
        // change the selection style
        d3.select(this)
          .classed("heavy", true)
      })
    ; 
    // 
    // add axis
    const xAxis = d3.axisBottom(xScales);

    svg.append("g")
      .attr("transform", `translate(0, ${height + 1})`) // Move X-axis to bottom
      .call(xAxis)
      .selectAll('.domain, line')
      .attr('opacity', 0)
      .attr("color", "hsl(28, 10%, 53%)")
    ;

    // add tooltip
    svg.selectAll("rect")
      .append("title") // Add tooltips
      .text(d => `Amount: ${d.amount}`)
    ;

  })
  .catch(function(error) {
    // Handle errors if the file can't be loaded
    console.error("Error loading data:", error);
});
