/* globals d3 */

const url = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json";

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  
    const w = 1100
    const h = 1000;
    
    const root = d3.hierarchy(data)
    const treeLayout = d3.treemap();
    treeLayout.size([w, 1000]);
  
    root.sum(function(d) {
      return d.value;
    });
  
    treeLayout(root);
    
    console.log(root.descendants());
    const filtered = root.descendants().filter((d) => d.height === 0);
    console.log(filtered);
  
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
  
    const nodes = d3.select('svg')
      .selectAll('g')
      .data(filtered)
      .enter()
      .append('g')
      .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})

    nodes
      .append('rect')
      .attr("class", "tile")
      .attr('width', function(d) { return d.x1 - d.x0; })
      .attr('height', function(d) { return d.y1 - d.y0; })
      .attr('stroke', '#fff')
      .attr("data-name", (d) => d.data.name)
      .attr("data-category", (d) => d.data.category)
      .attr("data-value", (d) => d.data.value)
      .attr('fill', (d) => {
        let fill;
        switch(d.data.category) {
          case "2600":
            fill = "red";
            break;
          case "Wii":
            fill = "orange";
            break;
          case "NES":
            fill = "yellow";
            break;
          case "GB":
            fill = "magenta";
            break;
          case "X360":
            fill = "green";
            break;
          case "PS3":
            fill = "blue";
            break;
          case "PS2":
            fill = "pink";
            break;
          case "SNES":
            fill = "silver";
            break;       
          case "GBA":
            fill = "grey";
            break;
          case "PS4":
            fill = "brown";
            break;
          case "3DS":
            fill = "coral";
            break;
          case "N64":
            fill = "violet";
            break;
          case "PS":
            fill = "chartreuse";
            break;
          case "XB":
            fill = "cadetblue";
            break;
          case "PC":
            fill = "blueviolet";
            break;
          case "PSP":
            fill = "aliceblue";
            break;
          case "XOne":
            fill = "beige";
            break;
          case "DS":
            fill = "cyan";
            break;
        }
        return fill;
      }).on("mouseover", function(d) {
          tooltip
            .transition()
            .duration(100)
            .style("opacity", 0.85);
          tooltip
            .html("<p>" + d.data.name + ", " + d.data.category +  "</p><p><strong>Value:<strong> " + d.data.value + "</p>")
            .style("left", d3.event.pageX + 15 + "px")
            .style("top", d3.event.pageY + 15 + "px");
          tooltip.attr("data-value", d.data.value);
        })
        .on("mouseout", function(d) {
          tooltip
            .transition()
            .style("opacity", 0);
        });

    nodes
      .append('text')
      .attr('dx', 4)
      .attr('dy', 14)
      .text(function(d) {
        return d.data.name;
    })

    
  /*
    d3.select('svg')
      .append('text')
      .selectAll('tspan')
      .data(filtered)
      .enter()
      .append('tspan')
      .text((d) => d.data.name)
      .attr('x', function(d) { return d.x0 + 5; })
      .attr('y', function(d) { return d.y0 + 15; })
      .attr("width", 10)
*/
    // Legend
    const svg2 = d3.select(".container2")
      .append("svg")
      .attr("id", "info")
      .attr("width", 300)
      .attr("height", 200)
    
    const legend = svg2.append("g")
                    .attr("id", "legend");
      
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "red")
      .attr("class", "legend-item")
      
    legend.append("text")
      .text("2600")
      .attr("x", 20)
      .attr("y", 29)
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (40))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "orange")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("Wii")
      .attr("x", 20)
      .attr("y", (49))
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (60))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "yellow")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("NES")
      .attr("x", 20)
      .attr("y", (69))
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (80))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "green")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("X360")
      .attr("x", 20)
      .attr("y", (89))
  
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (100))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "blue")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("PS3")
      .attr("x", 20)
      .attr("y", (109))
  
    legend.append("rect")
      .attr("x", 0)
      .attr("y", (120))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "purple")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("GB")
      .attr("x", 20)
      .attr("y", (129))
  
    // 2nd column
    legend.append("rect")
      .attr("x", 100)
      .attr("y", 20)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "magenta")
      .attr("class", "legend-item")
      
    legend.append("text")
      .text("DS")
      .attr("x", 120)
      .attr("y", 29)
    
    legend.append("rect")
      .attr("x", 100)
      .attr("y", (40))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "silver")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("SNES")
      .attr("x", 120)
      .attr("y", (49))
    
    legend.append("rect")
      .attr("x", 100)
      .attr("y", (60))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "grey")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("GBA")
      .attr("x", 120)
      .attr("y", (69))
    
    legend.append("rect")
      .attr("x", 100)
      .attr("y", (80))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "brown")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("PS4")
      .attr("x", 120)
      .attr("y", (89))
  
    legend.append("rect")
      .attr("x", 100)
      .attr("y", (100))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "coral")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("3DS")
      .attr("x", 120)
      .attr("y", (109))
  
    legend.append("rect")
      .attr("x", 100)
      .attr("y", (120))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "violet")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("N64")
      .attr("x", 120)
      .attr("y", (129))
  
    // 3rd column
    legend.append("rect")
      .attr("x", 200)
      .attr("y", 20)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "pink")
      .attr("class", "legend-item")
      
    legend.append("text")
      .text("PS2")
      .attr("x", 220)
      .attr("y", 29)
    
    legend.append("rect")
      .attr("x", 200)
      .attr("y", (40))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "chartreuse")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("PS")
      .attr("x", 220)
      .attr("y", (49))
    
    legend.append("rect")
      .attr("x", 200)
      .attr("y", (60))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "cadetblue")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("XB")
      .attr("x", 220)
      .attr("y", (69))
    
    legend.append("rect")
      .attr("x", 200)
      .attr("y", (80))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "aliceblue")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("PSP")
      .attr("x", 220)
      .attr("y", (89))
  
    legend.append("rect")
      .attr("x", 200)
      .attr("y", (100))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "beige")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("XOne")
      .attr("x", 220)
      .attr("y", (109))
  
    legend.append("rect")
      .attr("x", 200)
      .attr("y", (120))
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "blueviolet")
      .attr("class", "legend-item")
  
    legend.append("text")
      .text("PC")
      .attr("x", 220)
      .attr("y", (129))
  
  });