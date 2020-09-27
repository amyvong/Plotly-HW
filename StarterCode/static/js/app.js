


function init() {
    d3.json("samples.json").then(function(data) {
        var names = data.names;

        var selDataset = d3.select("#selDataset")
        names.forEach(name=>{
            selDataset.append("option").text(name)
        })
    buildTable(names[0]) 
    buildPlots(names[0])

   });
    
}
init()


function buildTable(name){
    d3.json("samples.json").then(function(data){
        var metadata=data.metadata;
        var filteredmetaData = metadata.filter(data=>data.id==name)[0]
        
        console.log(filteredmetaData)
        
        var samplebody = d3.select("#sample-metadata");
            samplebody.html("")
            Object.entries(filteredmetaData).forEach(([key, value]) => {
                samplebody.append("h5").text(`${key}: ${value}`);
                
            });
        
            
    

    })  

    }

    function buildPlots(name){
        d3.json("samples.json").then(function(data){
            var samples=data.samples;
            var filteredsampledata = samples.filter(data=>data.id==name)[0] 
            var sample_values =filteredsampledata.sample_values
            var otu_ids = filteredsampledata.otu_ids
            var otu_labels = filteredsampledata.otu_labels
    
            var reversed_otu_labels=otu_labels.slice(0, 10).reverse();
            var reversed_otu_ids=console.log(otu_ids.slice(0, 10).reverse());
            var reversed_sample_values=console.log(sample_values.slice(0, 10).reverse());
            var otu_id_label=otu_ids.map(d =>"OTU " +d);
            var metadata=data.metadata;
            var filteredmetaData = metadata.filter(data=>data.id==name)[0]
            var wfreq=filteredmetaData.wfreq
    
            var barselect = d3.select("#bar");
                var trace1 = {
                x: sample_values.slice(0, 10).reverse(),
                y: otu_id_label,
                text: `${otu_id_label}`,
                name: "Horizontal Bar Chart",
                type: "bar",
                orientation: "h"
              };
              // data
                var data = [trace1];
    
    // Apply the group bar mode to the layout
                    var layout = {
                    title: "Bar",
                    };
    
                    // Render the plot to the div tag with id "plot"
                    Plotly.newPlot("bar", data, layout);
                    
         var bubblebody=d3.select("#bubble");
                var trace2 = {
                x: otu_ids,
                y: sample_values,
                mode: 'markers',
                marker: {
                    size: sample_values,
                    color: otu_ids
                        },
                labels: otu_labels,
                
                
            };
                      
            var data2 = [trace2];
                      
            var layout2 = {
                title: 'Bubble Plot',
                showlegend: false,
                height: 600,
                width: 600
                      };
                      
                      Plotly.newPlot('bubble', data2, layout2);
                       
    
                      var data3 = [
                        {
                            domain: { x: [0, 9], y: [0, 9] },
                            value: wfreq,
                            title: { text: "Belly Button Washing" },
                            type: "indicator",
                            mode: "gauge+number",
                            gauge:{
                                axis:{range:[null,10]}
                            }
                          
                        

                        }
                    ];
                    
                    var layout3 = 
                    { width: 600, 
                    height: 500, 
                    margin: { t: 0, b: 0 } };
                    
                    Plotly.newPlot('gauge', data3, layout3);
    
        });
    }
    
    
function optionChanged(name){
    buildTable(name)
    buildPlots(name)
}



