
// Getting data from the json file
d3.json("samples.json").then(function(data) {
 
// Naming for practical purposes 
  id = data.names;
  metadata = data.metadata;
  samples = data.samples;

  var selection = d3.select("#selDataset");

  id.forEach(id=> {
    var option = selection.append("option");
    option.property("value", id);
    option.text(id);
  })

optionChanged(selection.property("value"));

})
  
// Table with demographic data

  function DemographicTable(value) {
    
    var eventData = metadata.filter(event => parseInt(event.id) === parseInt(value))[0];
    //console.log(eventData)

    var idData = eventData.id;
    var ethnicity = eventData.ethnicity;
    var gender = eventData.gender;
    var age = eventData.age;
    var location = eventData.location;
    var bbtype = eventData.bbtype;
    var wfreq = eventData.wfreq;
  
  
    var DemographicTable = d3.select("#sample-metadata");
    DemographicTable.html("");

    var demographic_info = `Id: ${idData}<br/>`;
    demographic_info += `Ethnicity: ${ethnicity}<br/>`;
    demographic_info += `Gender: ${gender}<br/>`;
    demographic_info += `Age: ${age}<br/>`;
    demographic_info += `Location: ${location}<br/>`;
    demographic_info += `Blood type: ${bbtype}<br/>`;
    demographic_info += `Wfreq: ${wfreq}<br/>`;
    DemographicTable.html(demographic_info)
  
  }

  // Bar Plot

  function Plotbar(value) {
    var eventData = samples.filter(event => parseInt(event.id) === parseInt(value))[0];

    var sample_values = eventData.sample_values.slice(0,10).reverse();
    var otu_top = (eventData.otu_ids.slice(0, 10)).reverse();
    var otu_id = otu_top.map(d => "OTU " + d)
    var otu_labels = (eventData.otu_labels.slice(0, 10)).reverse();


  
    var trace1 = {
      x: sample_values,
      y: otu_id,
      text: otu_labels,
      type: "bar",
      orientation: "h"
    };
    
    var layout = {
      title: "",
      margin: {
        l:100,
        r:100,
        t:100,
        b:100,
      }
    }
    
    var plotData = [trace1];
    Plotly.newPlot("bar", plotData, layout);
  
  }

  function BubbleChart(value) {
    var eventData = samples.filter(event => parseInt(event.id) === parseInt(value))[0];

    var sample_values = eventData.sample_values;
    var otu_id = eventData.otu_ids;
    var otu_labels = eventData.otu_labels;


    var trace2 = {
      x: otu_id,
      y: sample_values,
      mode: 'markers',
      text: otu_labels,
      marker: {
        color: otu_id,
        colorscale: 'Earth',
        type: 'heatmap',
        opacity: otu_id.map(id => 0.7),
        size: sample_values
      }
    };
    
    var data = [trace2];
    
    var layout = {
      title: '',
      height: 600,
      width: 1250,
      xaxis: {
        title: {
          text: 'Operational taxonomic units ID'
        }
      },
      yaxis: {
        title: {
          text: 'Sample Values'
        }
      }

    };
    
    Plotly.newPlot('bubble', data, layout);
  }

  function optionChanged(value) {
    DemographicTable(value)
    Plotbar(value)
    BubbleChart(value)
  }

  function change(value) {
    optionChanged(value)
  }

  
  
