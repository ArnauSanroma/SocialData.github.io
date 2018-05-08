function placeEl(str_id,x_pos, y_pos) {
  if (typeof(str_id) == "string"){
    var d = document.getElementById(str_id);
  }
  else {d = str_id}
  d.style.position = "absolute";
  d.style.left = x_pos+'px';
  d.style.top = y_pos+'px';
}

arr_del_view = [1,1,1,1]
arr_del_view_aux = arr_del_view.slice()
arr_del_from = 0
arr_del_to = 3

dep_del_view = [1,1,1,1]
dep_del_view_aux = dep_del_view.slice()
dep_del_from = 0
dep_del_to = 3

function change_slice(pos0,pos1){
  arr = [0,0,0,0]
  for (i = pos0; i <= pos1; i++){
    arr[i] = 1
  }
  return arr
}

function arr_del1_change() {
  arr_del_from = parseInt(document.getElementById("arr_del1").value.slice(0,3))/30-1
  arr_del_view_aux = change_slice(arr_del_from,arr_del_to)
}

function arr_del2_change() {
  tmp = document.getElementById("arr_del2").value.slice(0,3)
  if (tmp == "> 1") {
    arr_del_to = 3
  }
  else {
    arr_del_to = parseInt(tmp)/30-2
  }
  arr_del_view_aux = change_slice(arr_del_from,arr_del_to)
}

function dep_del1_change() {
  dep_del_from = parseInt(document.getElementById("dep_del1").value.slice(0,3))/30-1
  dep_del_view_aux = change_slice(dep_del_from,dep_del_to)
}

function dep_del2_change() {
  tmp = document.getElementById("dep_del2").value.slice(0,3)
  if (tmp == "> 1") {
    dep_del_to = 3
  }
  else {
    dep_del_to = parseInt(tmp)/30-2
  }
  dep_del_view_aux = change_slice(dep_del_from,dep_del_to)
}

w_window = 0.9*window.innerWidth;
h_window = 0.9*window.innerHeight;


margin = 0.1 ;
w_window = (1-margin)*w_window;



w_map =  0.6*w_window;
h_map = 0.8*h_window;
w_timeline = w_window;
h_timeline = 0.2*h_window;
w_box1 = 0.4*w_window;
h_box1 = 0.8*0.7*h_window;
w_box2 = 0.4*w_window ;
h_box2 = 0.8*0.3*h_window ;

padding = 25;


document.body.style.height = h_window + "px";
document.body.style.width = w_window + "px";
document.getElementById("map").style.height = h_map + "px";
document.getElementById("map").style.width = w_map + "px";
document.getElementById("timeline").style.height = h_timeline + "px";
document.getElementById("timeline").style.width = w_timeline + "px";
document.getElementById("box1").style.height = h_box1 + "px";
document.getElementById("box1").style.width = w_box1 + "px";
document.getElementById("box2").style.height = h_box2 + "px";
document.getElementById("box2").style.width = w_box2 + "px";
document.getElementById("legend1").setAttribute("class", "legend_arr")
document.getElementById("legend2").setAttribute("class", "legend_dep")

placeEl("select_all",window.parent.document.getElementById("box2").offsetLeft ,window.parent.document.getElementById("box2").offsetTop)
placeEl("reset",window.parent.document.getElementById("box2").offsetLeft + w_box2/4,window.parent.document.getElementById("box2").offsetTop)
placeEl("apply",window.parent.document.getElementById("box2").offsetLeft + 1.7*w_box2/4,window.parent.document.getElementById("box2").offsetTop)

placeEl("legend1",window.parent.document.getElementById("box1").offsetLeft+60,window.parent.document.getElementById("box1").offsetTop+padding)
placeEl("legend2",window.parent.document.getElementById("box1").offsetLeft+60,window.parent.document.getElementById("box1").offsetTop+2*padding)
placeEl("legend1_text",window.parent.document.getElementById("box1").offsetLeft+75,window.parent.document.getElementById("box1").offsetTop+padding-3)
placeEl("legend2_text",window.parent.document.getElementById("box1").offsetLeft+75,window.parent.document.getElementById("box1").offsetTop+2*padding-3)

placeEl("arr_text1",window.parent.document.getElementById("box2").offsetLeft,window.parent.document.getElementById("box2").offsetTop+h_box2/3)
placeEl("arr_text2",window.parent.document.getElementById("box2").offsetLeft+100,window.parent.document.getElementById("box2").offsetTop+h_box2/3)
placeEl("arr_del1",window.parent.document.getElementById("arr_text2").offsetLeft + 40,window.parent.document.getElementById("arr_text2").offsetTop)
placeEl("arr_text3",window.parent.document.getElementById("arr_del1").offsetLeft+80,window.parent.document.getElementById("arr_del1").offsetTop)
placeEl("arr_del2",window.parent.document.getElementById("arr_del1").offsetLeft + 100,window.parent.document.getElementById("arr_del1").offsetTop)

placeEl("dep_text1",window.parent.document.getElementById("box2").offsetLeft,window.parent.document.getElementById("box2").offsetTop+h_box2/1.5)
placeEl("dep_text2",window.parent.document.getElementById("box2").offsetLeft+120,window.parent.document.getElementById("box2").offsetTop+h_box2/1.5)
placeEl("dep_del1",window.parent.document.getElementById("dep_text2").offsetLeft + 40,window.parent.document.getElementById("dep_text2").offsetTop)
placeEl("dep_text3",window.parent.document.getElementById("dep_del1").offsetLeft+80,window.parent.document.getElementById("dep_del1").offsetTop)
placeEl("dep_del2",window.parent.document.getElementById("dep_del1").offsetLeft +100,window.parent.document.getElementById("dep_del1").offsetTop)

var svg_map = d3.select("#map")
                .append("svg")
                .attr("height", h_map)
                .attr("width", w_map);

var svg_timeline = d3.select("#timeline")
                .append("svg")
                .attr("height", h_timeline)
                .attr("width", w_timeline);

var svg_box1 = d3.select("#box1")
                .append("svg")
                .attr("height", h_box1)
                .attr("width", w_box1);

var svg_box2 = d3.select("#box2")
                .append("svg")
                .attr("height", h_box2)
                .attr("width", w_box2);

var airport_scale  = d3.scaleSqrt()
                       .range([w_window/250, w_window/40])

var thick_scale = d3.scaleLinear()
                    .range([0,2])

var timeline_xScale = d3.scaleTime()
                        .domain([new Date(2008,0,1), new Date(2008,11,31,23,59)])
                        .range([padding, w_timeline - 2.5*padding])

var timeline_yScale = d3.scaleLinear()
                      .range([h_timeline - padding, padding/2])

var box1_xScale = d3.scaleBand()
                    .domain([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23])
                    .rangeRound([padding, w_box1 - 3*padding])
                    .paddingInner(0.3)

var box1_yScale = d3.scaleLinear()
                    .range([h_box1 - padding, 2*padding])

var box1_yScale_right= d3.scaleLinear()
                    .range([h_box1 - padding, 2*padding])


var timeline_xAxis = d3.axisBottom()
                      .scale(timeline_xScale)
                      .ticks(12)

var timeline_yAxis = d3.axisLeft()
                      .scale(timeline_yScale)
                      .ticks(3)

var box1_xAxis = d3.axisBottom()
                      .scale(box1_xScale)
                      .ticks(24)

var box1_yAxis = d3.axisLeft()
                      .scale(box1_yScale)
                      .ticks(10)

var box1_yAxis_right = d3.axisRight()
                      .scale(box1_yScale_right)
                      .ticks(10)


var map_projection = d3.geoAlbersUsa()
                       .translate([w_map/2, h_map/2])
                       .scale([w_map*1.2])

var map_path = d3.geoPath()
                 .projection(map_projection)

var rowConverter = function(d){
 return {
   date:d.Date,
   flights:parseInt(d.Flights)
 }
}

var clicked_airports = [];
var initial_index = 0;
var initial_index2 = 0;
var final_index = 365;
var final_index2 = 8783;

coordinates_dict = {}
d3.json("airport_coordinates.json",function(tmp){
  coordinates_dict = tmp
})

d3.json("us-states.json", function(json) {

  d3.csv("airport_coordinates.csv",function(airport_coordinates){

    d3.csv("connection_dataset2.csv",rowConverter, function(connection2_data) {

      airports = []
      for (i = 0; i < airport_coordinates.length; i++) {
        airports[i] = (airport_coordinates[i].airport)
      }
      one_way_connections = []
      for(i = 0; i < airports.length; i++){
        airport1 = airports[i]
        for(j = i + 1; j < airports.length; j++){
          airport2 = airports[j]
          one_way_connections.push(airport1 + "-" + airport2)
        }
      }

      arr_delay30 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      arr_delay60 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      arr_delay90 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      arr_delay120 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      dep_delay30 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      dep_delay60 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      dep_delay90 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      dep_delay120 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      flights = [0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01]

      d3.csv("airport_dataset.csv", function(airport_data) {

        d3.csv("connection_dataset.csv", function(connection_data) {

          connections = d3.keys(connection_data[0]).slice(1)
          flight_dataset = {}
          for (i = 0; i < airports.length; i++) {
            flight_dataset[airports[i]] = d3.sum(airport_data,function(d){
              return d[airports[i] + "_flights"]
            })
          }

          connection_dataset = {}
          for (i=0; i< connections.length; i++) {
            connection_dataset[connections[i]] = d3.sum(connection_data,function(d){
              return d[connections[i]]
            })
          }

          one_way_connections_dataset = []
          for (i=0; i < one_way_connections.length;i++){
            connection = one_way_connections[i]
            reversed_connection = connection.slice(-3) + "-" + connection.slice(0,3)
            one_way_connections_dataset.push({"connection":one_way_connections[i],"flights":connection_dataset[connection] + connection_dataset[reversed_connection]})
          }
          
          max_flight_dataset = 0
          for (var key in flight_dataset) {
            if (flight_dataset[key] > max_flight_dataset) {
              max_flight_dataset = flight_dataset[key]
            }
          }
          max_connection_dataset = 0
          min_connection_dataset = 1000000
          for (var key connection_dataset) {
            if (connection_dataset[key] > max_connection_dataset) {
              max_connection_dataset = connection_dataset[key]
            }
            if (connection_dataset[key] < min_connection_dataset) {
              min_connection_dataset = connection_dataset[key]
            }
          }
          airport_scale.domain([0,max_flight_dataset])
          thick_scale.domain([min_connection_dataset,max_connection_dataset])

          svg_map.selectAll("path")
             .data(json.features)
             .enter()
             .append("path")
             .attr("d", map_path)
             .style("fill", "silver")
             .style("stroke","black")
             .style("stroke-width",0.3)

           // Create lines for connections
           svg_map.selectAll("line")
             .data(one_way_connections_dataset)
             .enter()
             .append("line")
             .attr("x1", function(d) {
               var origin = d.connection.slice(0,3)
               return map_projection(coordinates_dict[origin])[0];
             })
             .attr("y1", function(d) {
               var origin = d.connection.slice(0,3)
               return map_projection(coordinates_dict[origin])[1];
             })
             .attr("x2", function(d) {
               var dest = d.connection.slice(-3)
               return map_projection(coordinates_dict[dest])[0];
             })
             .attr("y2", function(d) {
               var dest = d.connection.slice(-3)
               return map_projection(coordinates_dict[dest])[1];
             })
             .attr("stroke-width",function(d){
               return thick_scale(d.flights)
             })
             .property("origin",function(d){
               return d.connection.slice(0,3)
             })
             .property("dest",function(d){
               return d.connection.slice(-3)
             })
             .attr("class","line_default")
             .on("mouseover",function(){
               if (this.getAttribute("class") == "line_visible"){
                 this.setAttribute("class","line_hover")

                 var xPosition = (parseFloat(d3.select(this).attr("x1"))+parseFloat(d3.select(this).attr("x2")))/2 + window.parent.document.getElementById("map").offsetLeft;
                 var yPosition = (parseFloat(d3.select(this).attr("y1"))+parseFloat(d3.select(this).attr("y2")))/2 + window.parent.document.getElementById("map").offsetTop;
                 //Update the tooltip position and value
                 d3.select("#line_tooltip")
                   .style("left", xPosition + "px")
                   .style("top", yPosition + "px")
                   .select("#connection")
                   .text(this.origin + " - " + this.dest);
                 d3.select("#line_tooltip")
                   .select("#flights1")
                   .text(this.origin + "-" + this.dest + ": " + connection_dataset[this.origin + "-" + this.dest]);
                 d3.select("#line_tooltip")
                   .select("#flights2")
                   .text(this.dest + "-" + this.origin + ": " + connection_dataset[this.dest + "-" + this.origin]);
                 d3.select("#line_tooltip").classed("hidden", false);
               }
             })
             .on("mouseout",function(){
               if (this.getAttribute("class") == "line_hover"){
                 this.setAttribute("class","line_visible")
                 d3.select("#line_tooltip").classed("hidden", true);
               }
             })

          // Create circles for the airports
          svg_map.selectAll("circle")
            .data(airport_coordinates)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
              return map_projection([d.longitude, d.latitude])[0];
            })
            .attr("cy", function(d) {
              return map_projection([d.longitude, d.latitude])[1];
            })
            .attr("r", function(d){
              return airport_scale(flight_dataset[d.airport])
            })
            .attr("class","airport_default")
            .property("airport", function(d) {
              return d.airport
            })
            .property("is_clicked", function(d){
              return false;
            })
            .on("mouseover", function() {
              if (!this.is_clicked){
                this.setAttribute("class","airport_hover")
                var airport = this.airport
                d3.selectAll("line")
                  .attr("class", function() {
                    if(this.origin == airport || this.dest == airport || clicked_airports.includes(this.origin) || clicked_airports.includes(this.dest)){
                      return "line_visible"
                    } else{
                      return "line_default"
                    }
                  })
                }

                var xPosition = parseFloat(d3.select(this).attr("cx")) + window.parent.document.getElementById("map").offsetLeft + parseFloat(d3.select(this).attr("r"))/2;
      					var yPosition = parseFloat(d3.select(this).attr("cy")) + window.parent.document.getElementById("map").offsetTop + parseFloat(d3.select(this).attr("r"))/2;
      					//Update the tooltip position and value
      					d3.select("#airport_tooltip")
      						.style("left", xPosition + "px")
      						.style("top", yPosition + "px")
      						.select("#name")
      						.text(this.airport);
      			    d3.select("#airport_tooltip")
      	          .select("#flights")
      	          .text(flight_dataset[this.airport]);
      					d3.select("#airport_tooltip").classed("hidden", false);
            })
            .on("mouseout", function() {
              if (!this.is_clicked){
                this.setAttribute("class", "airport_default")
                d3.selectAll("line")
                  .attr("class", function(){
                    if (clicked_airports.includes(this.origin) || clicked_airports.includes(this.dest)){
                      return "line_visible"
                    }else{
                      return "line_default"
                    }
                  })
                }
                d3.select("#airport_tooltip").classed("hidden", true);
            })
            .on("click",function(){
              if (this.is_clicked){
                clicked_airports.splice(clicked_airports.indexOf(this.airport),1)
                this.setAttribute("class","airport_hover")
                this.is_clicked = false;
                for (i = initial_index2; i < final_index2; i++){
                  d = airport_data[i]
                  arr_delay30[parseInt(d.Date.slice(11,13))] -= parseInt(d[this.airport + "_ArrDelay30"])
                  arr_delay60[parseInt(d.Date.slice(11,13))] -= parseInt(d[this.airport + "_ArrDelay60"])
                  arr_delay90[parseInt(d.Date.slice(11,13))] -= parseInt(d[this.airport + "_ArrDelay90"])
                  arr_delay120[parseInt(d.Date.slice(11,13))] -= parseInt(d[this.airport + "_ArrDelay120"])
                  dep_delay30[parseInt(d.Date.slice(11,13))] -= parseInt(d[this.airport + "_DepDelay30"])
                  dep_delay60[parseInt(d.Date.slice(11,13))] -= parseInt(d[this.airport + "_DepDelay60"])
                  dep_delay90[parseInt(d.Date.slice(11,13))] -= parseInt(d[this.airport + "_DepDelay90"])
                  dep_delay120[parseInt(d.Date.slice(11,13))] -= parseInt(d[this.airport + "_DepDelay120"])
                  flights[parseInt(d.Date.slice(11,13))] -= parseInt(d[this.airport + "_flights"])
                }
                var arr_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                var dep_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                var arr_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                var dep_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

                for (i = 0; i < arr_delays.length; i++){
                  arr_delays[i] = arr_del_view[0]*arr_delay30[i] + arr_del_view[1]*arr_delay60[i] + arr_del_view[2]*arr_delay90[i] + arr_del_view[3]*arr_delay120[i]
                  dep_delays[i] = dep_del_view[0]*dep_delay30[i] + dep_del_view[1]*dep_delay60[i] + dep_del_view[2]*dep_delay90[i] + dep_del_view[3]*dep_delay120[i]
                  arr_del_ratio[i] = arr_delays[i]/flights[i]*100
                  dep_del_ratio[i] = dep_delays[i]/flights[i]*100
                }

                box1_yScale.domain([d3.min([d3.min(arr_delays),d3.min(dep_delays)]) ,d3.max([d3.max(arr_delays),d3.max(dep_delays)])])
                box1_yScale_right.domain([d3.min([d3.min(arr_del_ratio),d3.min(dep_del_ratio)]) ,d3.max([d3.max(arr_del_ratio),d3.max(dep_del_ratio)])])

                svg_box1.selectAll(".arrivals")
                        .data(arr_delays)
                        .transition()
                        .duration(500)
                        .attr("y", function(d) {
                          return  box1_yScale(d) - padding  ;
                        })
           						  .attr("height", function(d) {
           								 return h_box1 - box1_yScale(d)-padding;
           						   })
               svg_box1.select(".y.axis")
                      .transition()
                      .duration(500)
                      .call(box1_yAxis);

               svg_box1.select(".right.axis")
                      .transition()
                      .duration(500)
                      .call(box1_yAxis_right);


              svg_box1.selectAll(".departures")
                      .data(dep_delays)
                      .transition()
                      .attr("y", function(d) {
                        return  box1_yScale(d) - padding ;
                      })
                      .attr("height", function(d) {
                         return h_box1 - box1_yScale(d)-padding;
                       })

               //Create line

               svg_box1.select(".ratio_arr")
                 .transition()
                 .duration(500)
                 .attr("d", ratio(arr_del_ratio));

               //Create line
               svg_box1.select(".ratio_dep")
                 .transition()
                 .duration(500)
                 .attr("d", ratio(dep_del_ratio));


              }else {
                clicked_airports.push(this.airport)
                this.setAttribute("class","airport_click")
                this.is_clicked = true;
                for (i = initial_index2; i < final_index2; i++){
                  d = airport_data[i]
                  arr_delay30[parseInt(d.Date.slice(11,13))] += parseInt(d[this.airport + "_ArrDelay30"])
                  arr_delay60[parseInt(d.Date.slice(11,13))] += parseInt(d[this.airport + "_ArrDelay60"])
                  arr_delay90[parseInt(d.Date.slice(11,13))] += parseInt(d[this.airport + "_ArrDelay90"])
                  arr_delay120[parseInt(d.Date.slice(11,13))] += parseInt(d[this.airport + "_ArrDelay120"])
                  dep_delay30[parseInt(d.Date.slice(11,13))] += parseInt(d[this.airport + "_DepDelay30"])
                  dep_delay60[parseInt(d.Date.slice(11,13))] += parseInt(d[this.airport + "_DepDelay60"])
                  dep_delay90[parseInt(d.Date.slice(11,13))] += parseInt(d[this.airport + "_DepDelay90"])
                  dep_delay120[parseInt(d.Date.slice(11,13))] += parseInt(d[this.airport + "_DepDelay120"])
                  flights[parseInt(d.Date.slice(11,13))] += parseInt(d[this.airport + "_flights"])
                }

                var arr_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                var dep_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                var arr_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                var dep_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

                for (i = 0; i < arr_delays.length; i++){
                  arr_delays[i] = arr_del_view[0]*arr_delay30[i] + arr_del_view[1]*arr_delay60[i] + arr_del_view[2]*arr_delay90[i] + arr_del_view[3]*arr_delay120[i]
                  dep_delays[i] = dep_del_view[0]*dep_delay30[i] + dep_del_view[1]*dep_delay60[i] + dep_del_view[2]*dep_delay90[i] + dep_del_view[3]*dep_delay120[i]
                  arr_del_ratio[i] = arr_delays[i]/flights[i]*100
                  dep_del_ratio[i] = dep_delays[i]/flights[i]*100
                }

                box1_yScale.domain([d3.min([d3.min(arr_delays),d3.min(dep_delays)]) ,d3.max([d3.max(arr_delays),d3.max(dep_delays)])])
                box1_yScale_right.domain([d3.min([d3.min(arr_del_ratio),d3.min(dep_del_ratio)]) ,d3.max([d3.max(arr_del_ratio),d3.max(dep_del_ratio)])])

                svg_box1.selectAll(".arrivals")
                        .data(arr_delays)
                        .transition()
                        .duration(500)
                        .attr("y", function(d) {
                          return  box1_yScale(d) - padding  ;
                        })
           						  .attr("height", function(d) {
           								 return h_box1 - box1_yScale(d)-padding;
           						   })
               svg_box1.select(".y.axis")
                      .transition()
                      .duration(500)
                      .call(box1_yAxis);

               svg_box1.select(".right.axis")
                      .transition()
                      .duration(500)
                      .call(box1_yAxis_right);

                svg_box1.selectAll(".departures")
                        .data(dep_delays)
                        .transition()
                        .attr("y", function(d) {
                          return  box1_yScale(d) - padding ;
                        })
                        .attr("height", function(d) {
                           return h_box1 - box1_yScale(d)-padding;
                         })

                 //Create line

                 svg_box1.select(".ratio_arr")
                   .transition()
                   .duration(500)
                   .attr("d", ratio(arr_del_ratio));

                 //Create line
                 svg_box1.select(".ratio_dep")
                   .transition()
                   .duration(500)
                   .attr("d", ratio(dep_del_ratio));

              }
            })
            // barchart creation
            var arr_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            var dep_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            var flights = [0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01]
            var arr_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            var dep_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

            box1_yScale.domain([d3.min([d3.min(arr_delays),d3.min(dep_delays)]) ,d3.max([d3.max(arr_delays),d3.max(dep_delays)])])
            box1_yScale_right.domain([d3.min([d3.min(arr_del_ratio),d3.min(dep_del_ratio)]) ,d3.max([d3.max(arr_del_ratio),d3.max(dep_del_ratio)])])

            svg_box1.selectAll(".arrivals")
                    .data(arr_delays)
                    .enter()
                    .append("rect")
                    .attr("x", function(d,i) {
                      return box1_xScale(i) + padding ;
                    })
                    .attr("y", function(d) {
                      return  box1_yScale(d) - padding ;
                    })
                    .attr("width", box1_xScale.bandwidth()/2)
       						  .attr("height", function(d) {
       								 return h_box1 - box1_yScale(d)-padding;
       						   })
                    .attr("class", "arrivals")

     				 svg_box1.append("g")
                 .attr("class", "x axis")
     						 .attr("transform", "translate("+padding+"," + (h_box1-2*padding) + ")")
     						 .call(box1_xAxis)

             svg_box1.append("g")
                  .attr("class", "y axis")
                  .attr("transform", "translate(" + (+2*padding) + ","+-padding+")")
                  .call(box1_yAxis)

             svg_box1.append("g")
                  .attr("class", "right axis")
                  .attr("transform", "translate(" + (w_box1-2*padding) + ","+-padding+")")
                  .call(box1_yAxis_right)

            svg_box1.append("text")
  						.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
  						.attr("transform", "translate("+ (padding/1.5 -7) +","+(h_box1/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
  						.attr("font-size",12)
  						.text("# of Delays")
  						.style("font-family","sans-serif");

            svg_box1.append("text")
  						.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
  						.attr("transform", "translate("+ (w_box1 - padding/1.5) +","+(h_box1/2)+")rotate(+90)")  // text is drawn off the screen top left, move down and out and rotate
  						.attr("font-size",12)
  						.text("% of Delays")
  						.style("font-family","sans-serif");

            svg_box1.append("text")
  						.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
  						.attr("transform", "translate("+ (w_box1/2+padding/1.5) +","+(h_box1-padding/1.5)+")")  // text is drawn off the screen top left, move down and out and rotate
  						.attr("font-size",12)
  						.text("Hour of Day")
  						.style("font-family","sans-serif");


              svg_box1.selectAll(".departures")
                      .data(dep_delays)
                      .enter()
                      .append("rect")
                      .attr("x", function(d,i) {
                        return box1_xScale(i) + padding +box1_xScale.bandwidth()/2;
                      })
                      .attr("y", function(d) {
                        return  box1_yScale(d) - padding ;
                      })
                      .attr("width", box1_xScale.bandwidth()/2)
         						  .attr("height", function(d) {
         								 return h_box1 - box1_yScale(d)-padding;
         						   })
                      .attr("class", "departures")


              ratio = d3.line()
                    .x(function(d,i) { return box1_xScale(i) + padding; })
                    .y(function(d) { return box1_yScale_right(d) - padding; });

              //Create line
              svg_box1.append("path")
                .datum(arr_del_ratio)
                .attr("class", "ratio_arr")
                .attr("d", ratio);

              //Create line
              svg_box1.append("path")
                .datum(dep_del_ratio)
                .attr("class", "ratio_dep")
                .attr("d", ratio);

              //barchart deppartures

            // Select all button
            d3.select("#select_all").on("click",function(){
              d3.selectAll("circle")
                .attr("class","airport_click")
                .property("is_clicked", function(d){
                  return true;
                })

              d3.selectAll("line")
                .attr("class","line_visible")

              clicked_airports = airports.slice()

              arr_delay30 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              arr_delay60 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              arr_delay90 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              arr_delay120 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay30 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay60 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay90 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay120 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              flights = [0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01]

              for (i = initial_index2; i < final_index2; i++){
                d = airport_data[i]
                for (j = 0; j < clicked_airports.length; j++){
                  arr_delay30[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay30"])
                  arr_delay60[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay60"])
                  arr_delay90[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay90"])
                  arr_delay120[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay120"])
                  dep_delay30[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay30"])
                  dep_delay60[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay60"])
                  dep_delay90[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay90"])
                  dep_delay120[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay120"])
                  flights[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_flights"])
                }
              }

              var arr_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              var dep_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              var arr_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              var dep_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]


              for (i = 0; i < arr_delays.length; i++){
                arr_delays[i] = arr_del_view[0]*arr_delay30[i] + arr_del_view[1]*arr_delay60[i] + arr_del_view[2]*arr_delay90[i] + arr_del_view[3]*arr_delay120[i]
                dep_delays[i] = dep_del_view[0]*dep_delay30[i] + dep_del_view[1]*dep_delay60[i] + dep_del_view[2]*dep_delay90[i] + dep_del_view[3]*dep_delay120[i]
                arr_del_ratio[i] = arr_delays[i]/flights[i]*100
                dep_del_ratio[i] = dep_delays[i]/flights[i]*100
              }

              box1_yScale.domain([d3.min([d3.min(arr_delays),d3.min(dep_delays)]) ,d3.max([d3.max(arr_delays),d3.max(dep_delays)])])
              box1_yScale_right.domain([d3.min([d3.min(arr_del_ratio),d3.min(dep_del_ratio)]) ,d3.max([d3.max(arr_del_ratio),d3.max(dep_del_ratio)])])

              svg_box1.selectAll(".arrivals")
                      .data(arr_delays)
                      .transition()
                      .duration(500)
                      .attr("y", function(d) {
                        return  box1_yScale(d) - padding  ;
                      })
                      .attr("height", function(d) {
                         return h_box1 - box1_yScale(d)-padding;
                       })

             svg_box1.select(".y.axis")
                    .transition()
                    .duration(500)
                    .call(box1_yAxis);

             svg_box1.select(".right.axis")
                    .transition()
                    .duration(500)
                    .call(box1_yAxis_right);

              svg_box1.selectAll(".departures")
                      .data(dep_delays)
                      .transition()
                      .attr("y", function(d) {
                        return  box1_yScale(d) - padding ;
                      })
                      .attr("height", function(d) {
                         return h_box1 - box1_yScale(d)-padding;
                       })

               //Create line

               svg_box1.select(".ratio_arr")
                 .transition()
                 .duration(500)
                 .attr("d", ratio(arr_del_ratio));

               //Create line
               svg_box1.select(".ratio_dep")
                 .transition()
                 .duration(500)
                 .attr("d", ratio(dep_del_ratio));

            })

            // Reset button
            d3.select("#reset").on("click",function(){
              d3.selectAll("circle")
                .attr("class","airport_default")
                .property("is_clicked", function(d){
                  return false;
                })

              d3.selectAll("line")
                .attr("class","line_default")

              clicked_airports = []

              arr_delay30 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              arr_delay60 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              arr_delay90 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              arr_delay120 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay30 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay60 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay90 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay120 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

              var arr_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              var dep_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              var arr_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              var dep_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

              box1_yScale.domain([d3.min([d3.min(arr_delays),d3.min(dep_delays)]) ,d3.max([d3.max(arr_delays),d3.max(dep_delays)])])
              box1_yScale_right.domain([d3.min([d3.min(arr_del_ratio),d3.min(dep_del_ratio)]) ,d3.max([d3.max(arr_del_ratio),d3.max(dep_del_ratio)])])

              svg_box1.selectAll(".arrivals")
                      .data(arr_delays)
                      .transition()
                      .duration(500)
                      .attr("y", function(d) {
                        return  box1_yScale(d) - padding  ;
                      })
                      .attr("height", function(d) {
                         return h_box1 - box1_yScale(d)-padding;
                       })
              svg_box1.select(".y.axis")
                    .transition()
                    .duration(500)
                    .call(box1_yAxis);

              svg_box1.select(".right.axis")
                     .transition()
                     .duration(500)
                     .call(box1_yAxis_right);

              svg_box1.selectAll(".departures")
                      .data(dep_delays)
                      .transition()
                      .attr("y", function(d) {
                        return  box1_yScale(d) - padding ;
                      })
                      .attr("height", function(d) {
                         return h_box1 - box1_yScale(d)-padding;
                       })

               //Create line
               svg_box1.select(".ratio_arr")
                 .transition()
                 .duration(500)
                 .attr("d", ratio(arr_del_ratio));

               //Create line
               svg_box1.select(".ratio_dep")
                 .transition()
                 .duration(500)
                 .attr("d", ratio(dep_del_ratio));


            })

            d3.select("#apply").on("click",function(){
              arr_del_view = arr_del_view_aux.slice()
              dep_del_view = dep_del_view_aux.slice()

              arr_delay30 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              arr_delay60 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              arr_delay90 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              arr_delay120 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay30 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay60 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay90 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              dep_delay120 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              flights = [0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01]

              for (i = initial_index2; i < final_index2; i++){
                d = airport_data[i]
                for (j = 0; j < clicked_airports.length; j++){
                  arr_delay30[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay30"])
                  arr_delay60[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay60"])
                  arr_delay90[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay90"])
                  arr_delay120[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay120"])
                  dep_delay30[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay30"])
                  dep_delay60[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay60"])
                  dep_delay90[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay90"])
                  dep_delay120[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay120"])
                  flights[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_flights"])
                }
              }

              var arr_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              var dep_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              var arr_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
              var dep_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]


              for (i = 0; i < arr_delays.length; i++){
                arr_delays[i] = arr_del_view[0]*arr_delay30[i] + arr_del_view[1]*arr_delay60[i] + arr_del_view[2]*arr_delay90[i] + arr_del_view[3]*arr_delay120[i]
                dep_delays[i] = dep_del_view[0]*dep_delay30[i] + dep_del_view[1]*dep_delay60[i] + dep_del_view[2]*dep_delay90[i] + dep_del_view[3]*dep_delay120[i]
                arr_del_ratio[i] = arr_delays[i]/flights[i]*100
                dep_del_ratio[i] = dep_delays[i]/flights[i]*100
              }

              box1_yScale.domain([d3.min([d3.min(arr_delays),d3.min(dep_delays)]) ,d3.max([d3.max(arr_delays),d3.max(dep_delays)])])
              box1_yScale_right.domain([d3.min([d3.min(arr_del_ratio),d3.min(dep_del_ratio)]) ,d3.max([d3.max(arr_del_ratio),d3.max(dep_del_ratio)])])

              svg_box1.selectAll(".arrivals")
                      .data(arr_delays)
                      .transition()
                      .duration(500)
                      .attr("y", function(d) {
                        return  box1_yScale(d) - padding  ;
                      })
                      .attr("height", function(d) {
                         return h_box1 - box1_yScale(d)-padding;
                       })

             svg_box1.select(".y.axis")
                    .transition()
                    .duration(500)
                    .call(box1_yAxis);

             svg_box1.select(".right.axis")
                    .transition()
                    .duration(500)
                    .call(box1_yAxis_right);

              svg_box1.selectAll(".departures")
                      .data(dep_delays)
                      .transition()
                      .attr("y", function(d) {
                        return  box1_yScale(d) - padding ;
                      })
                      .attr("height", function(d) {
                         return h_box1 - box1_yScale(d)-padding;
                       })

               //Create line

               svg_box1.select(".ratio_arr")
                 .transition()
                 .duration(500)
                 .attr("d", ratio(arr_del_ratio));

               //Create line
               svg_box1.select(".ratio_dep")
                 .transition()
                 .duration(500)
                 .attr("d", ratio(dep_del_ratio));
            })

            timeline_yScale.domain([d3.min(connection2_data,function(d){return d.flights})-100,d3.max(connection2_data,function(d){return d.flights})+100])

            //Define line generator
            timeline = d3.line()
                  .x(function(d) { return timeline_xScale(new Date(d.date))+2*padding; })
                  .y(function(d) { return timeline_yScale(d.flights); });

            //Create line
            svg_timeline.append("path")
              .datum(connection2_data)
              .attr("class", "line")
              .attr("d", timeline);

            //Create axes
            svg_timeline.append("g")
              .attr("class","x axis")
              .attr("transform", "translate("+ 2*padding + "," + (h_timeline - padding) + ")")
              .call(timeline_xAxis);

            svg_timeline.append("g")
              .attr("class", "y axis")
              .attr("transform", "translate(" + (3*padding) + ","+(0) +")")
              .call(timeline_yAxis);

            svg_timeline.append("text")
  						.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
  						.attr("transform", "translate("+ (1.5*padding) +","+(h_timeline/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
  						.attr("font-size",12)
  						.text("# of Flights")
  						.style("font-family","sans-serif");

            function brushTimeline() {
               if (d3.event.selection != null) {
                   var brush_coords = d3.brushSelection(this);
                   initial_date= new Date (timeline_xScale.invert(brush_coords[0]-2*padding))
                   final_date= new Date (timeline_xScale.invert(brush_coords[1]-2*padding))
                   initial_day = initial_date.getDate()
                   initial_month = initial_date.getMonth() + 1
                   final_day = final_date.getDate()
                   final_month = final_date.getMonth() + 1
                   if (initial_day < 10) {
                     initial_day = "0" + initial_day
                   }
                   if (initial_month < 10) {
                     initial_month = "0" + initial_month
                   }
                   if (final_day < 10) {
                     final_day = "0" + final_day
                   }
                   if (final_month < 10) {
                     final_month = "0" + final_month
                   }
                   initial_string = initial_date.getFullYear() + "-" + initial_month + "-" + initial_day + " 00:00:00"
                   final_string = final_date.getFullYear() + "-" + final_month + "-" + final_day + " 00:00:00"
                   initial_index = connection_data.map(function(e) { return e.Date; }).indexOf(initial_string)
                   final_index = connection_data.map(function(e) { return e.Date; }).indexOf(final_string)
                   initial_index2 = airport_data.map(function(e) { return e.Date; }).indexOf(initial_string)
                   final_index2 = airport_data.map(function(e) { return e.Date; }).indexOf(final_string)

                   for (i = 0; i < airports.length; i++) {
                     flight_dataset[airports[i]] = d3.sum(airport_data.slice(initial_index2,final_index2),function(d){
                       return d[airports[i] + "_flights"]
                     })
                   }

                   arr_delay30 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   arr_delay60 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   arr_delay90 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   arr_delay120 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   dep_delay30 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   dep_delay60 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   dep_delay90 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   dep_delay120 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   flights = [0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01,0.01]

                   for (i = initial_index2; i < final_index2; i++){
                     d = airport_data[i]
                     for (j = 0; j < clicked_airports.length; j++){
                       arr_delay30[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay30"])
                       arr_delay60[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay60"])
                       arr_delay90[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay90"])
                       arr_delay120[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_ArrDelay120"])
                       dep_delay30[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay30"])
                       dep_delay60[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay60"])
                       dep_delay90[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay90"])
                       dep_delay120[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_DepDelay120"])
                       flights[parseInt(d.Date.slice(11,13))] += parseInt(d[clicked_airports[j] + "_flights"])
                     }
                   }

                   var arr_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   var dep_delays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   var arr_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                   var dep_del_ratio = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

                   for (i = 0; i < arr_delays.length; i++){
                     arr_delays[i] = arr_del_view[0]*arr_delay30[i] + arr_del_view[1]*arr_delay60[i] + arr_del_view[2]*arr_delay90[i] + arr_del_view[3]*arr_delay120[i]
                     dep_delays[i] = dep_del_view[0]*dep_delay30[i] + dep_del_view[1]*dep_delay60[i] + dep_del_view[2]*dep_delay90[i] + dep_del_view[3]*dep_delay120[i]
                     arr_del_ratio[i] = arr_delays[i]/flights[i]*100
                     dep_del_ratio[i] = dep_delays[i]/flights[i]*100
                   }

                   box1_yScale.domain([d3.min([d3.min(arr_delays),d3.min(dep_delays)]) ,d3.max([d3.max(arr_delays),d3.max(dep_delays)])])
                   box1_yScale_right.domain([d3.min([d3.min(arr_del_ratio),d3.min(dep_del_ratio)]) ,d3.max([d3.max(arr_del_ratio),d3.max(dep_del_ratio)])])

                   svg_box1.selectAll(".arrivals")
                           .data(arr_delays)
                           .transition()
                           .duration(500)
                           .attr("y", function(d) {
                             return  box1_yScale(d) - padding  ;
                           })
                           .attr("height", function(d) {
                              return h_box1 - box1_yScale(d)-padding;
                            })
                   svg_box1.select(".y.axis")
                         .transition()
                         .duration(500)
                         .call(box1_yAxis);

                   svg_box1.select(".right.axis")
                          .transition()
                          .duration(500)
                          .call(box1_yAxis_right);

                   svg_box1.selectAll(".departures")
                           .data(dep_delays)
                           .transition()
                           .duration(500)
                           .attr("y", function(d) {
                             return  box1_yScale(d) - padding ;
                           })
                           .attr("height", function(d) {
                              return h_box1 - box1_yScale(d)-padding;
                            })

                  //Create line

                  svg_box1.select(".ratio_arr")
                    .transition()
                    .duration(500)
                    .attr("d", ratio(arr_del_ratio));

                  //Create line
                  svg_box1.select(".ratio_dep")
                    .transition()
                    .duration(500)
                    .attr("d", ratio(dep_del_ratio));


                   for (i=0; i< connections.length; i++) {
                     connection_dataset[connections[i]] = d3.sum(connection_data.slice(initial_index,final_index),function(d){
                     return d[connections[i]]
                    })
                   }

                   one_way_connections_dataset = []
                   for (i=0; i < one_way_connections.length;i++){
                     connection = one_way_connections[i]
                     reversed_connection = connection.slice(-3) + "-" + connection.slice(0,3)
                     one_way_connections_dataset.push({"connection":one_way_connections[i],"flights":connection_dataset[connection] + connection_dataset[reversed_connection]})
                   }

                   //thick_scale.domain([d3.min(Object.values(connection_dataset)),d3.max(Object.values(connection_dataset))])

                  // Create lines for connections
                  svg_map.selectAll("line")
                    .data(one_way_connections_dataset)
                    .attr("stroke-width",function(d){
                      return thick_scale(d.flights)
                    })
                   // Create circles for the airports
                   svg_map.selectAll("circle")
                     .data(airport_coordinates)
                     .attr("r", function(d){
                       return airport_scale(flight_dataset[d.airport])
                     })
               }
             }
              var brush = d3.brushX()
                   .extent([[3*padding, padding/2],
                           [w_timeline-0.5*padding,h_timeline-padding]])
                   .on("end", brushTimeline);

              svg_timeline.append("g")
    						  .attr("id","brush")
                  .call(brush);

        })
      })
    })
  });
});
