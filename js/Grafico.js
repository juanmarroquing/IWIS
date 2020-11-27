am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_kelly);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // create chart
    var chart = am4core.create("chartdiv", am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);
    
    /**
     * Normal axis
     */
    
    var axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 50;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 0.5;
    axis.renderer.ticks.template.disabled = false
    axis.renderer.ticks.template.strokeOpacity = 0.5;
    axis.renderer.ticks.template.length = 10;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40;
    axis.renderer.labels.template.adapter.add("text", function(text) {
      return text + "°C";
    })
    
    /**
     * Axis for ranges
     */
    
    var colorSet = new am4core.ColorSet();
    
    var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
    axis2.min = 0;
    axis2.max = 50;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;
    
    var range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 25;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);
    
    var range1 = axis2.axisRanges.create();
    range1.value = 25;
    range1.endValue = 50;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);
    
    /**
     * Label
     */
    
    var label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 30;
    label.x = am4core.percent(25);
    label.y = am4core.percent(50);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = "50 °C";
    
    
    /**
     * Hand
     */
    
    var hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(30);
    hand.startWidth = 10;
    hand.pin.disabled = true;
    hand.value = 0;
    
    hand.events.on("propertychanged", function(ev) {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      label.text = axis2.positionToValue(hand.currentPosition).toFixed(1);
      axis2.invalidate();
    });
    
    setInterval(function() {
      var value = Potenciometro;
      var animation = new am4core.Animation(hand, {
        property: "value",
        to: value
      }, 1000, am4core.ease.cubicOut).start();
    }, 2000);
    
    }); // end am4core.ready()