/* globals d3 */

const url = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json";

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  
    const w = 1200
    const h = 700;
    
    const root = d3.hierarchy(data)
    const treeLayout = d3.treemap();
    treeLayout.size([w, h]);
  
    root.sum(function(d) {
      return d.value;
    });
  
    treeLayout(root);
    
    console.log(root.descendants());
    const svg = d3.select(".container")
      .append("svg")
      .attr("id", "chart")
      .attr("width", w)
      .attr("height", h)
    
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style("opacity", 0)

    d3.select(".heading")
      .append("h1")
      .attr("id", "title")
      .text("Videogame Sales");

    d3.select(".heading")
      .append("h2")
      .attr("id", "description")
      .text("Top 100 Most Sold Video Games Grouped by Platform");
  
  d3.select('svg')
      .selectAll('rect')
      .data(root.descendants())
      .enter()
      .append('rect')
      .attr("class", "tile")
      .attr('x', function(d) { return d.x0; })
      .attr('y', function(d) { return d.y0; })
      .attr('width', function(d) { return d.x1 - d.x0; })
      .attr('height', function(d) { return d.y1 - d.y0; })
      .attr('stroke', '#fff')
      .attr('fill', (d) => {
        let fill;
        switch(d.data.category) {
          case "2600":
            fill = "red";
            break;
          case "Wii":
            fill = "green";
            break;
        }
        return fill;
      })
  
  });