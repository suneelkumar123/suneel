//  Performance Chart

zingchart.MODULESDIR = "https://cdn.zingchart.com/modules/";
ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "ee6b7db5b51705a13dc2339db3edaf6d"];


$(document).on('click', '.chart-pane-tab', function(event) {
console.log("asdasdadasdas");
    var board_value = $('.chart-title-text').html();
    board_value=board_value.split(":");
    board_value=board_value[1].replace(/\s+/g, '');

    var tab_value=$(this).text();
    tab_value = tab_value.replace(/\s+/g, '');

    // console.log(tab_value);
    // console.log(board_value);

    $.ajax
    ({
        url: 'http://localhost:8000/getchartdata',
        type: 'get',
        dataType: 'json', // added data type
        success: function(result)
        {
          var date = [];
          var system = [];
          var anti_system = [];
          var benchmark = [];
          var cumper = [];


          if(tab_value=='50K')
          {         
            $.each(result.v4micro_performance, function(l,m) {
              if(l==board_value)
              {
                  $.each(this, function(k, v) {

                      date.push(k);
                      // v = v.toLocaleString();
                      system.push(v);

                  });
              }
              if(l=='Anti-'+board_value)
              {
                  $.each(this, function(k, v) {

                      anti_system.push(v);

                  });
              }
              if(l=='benchmark')
              {
                  $.each(this, function(k, v) {

                      benchmark.push(v);

                  });
              }
              if(l==board_value+"_cumper")
              {
                  $.each(this, function(k, v) {

                      v = v + " %";
                      cumper.push(v);

                  });
              }
            });
          }
          else if(tab_value=='100K')
          {
            $.each(result.v4mini_performance, function(l,m) {
              if(l==board_value)
              {
                  $.each(this, function(k, v) {

                      date.push(k);
                      system.push(v);

                  });
              }
              if(l=='Anti-'+board_value)
              {
                  $.each(this, function(k, v) {

                      anti_system.push(v);

                  });
              }
              if(l=='benchmark')
              {
                  $.each(this, function(k, v) {

                      benchmark.push(v);

                  });
              }
              if(l==board_value+"_cumper")
              {
                  $.each(this, function(k, v) {

                      v = v + " %";
                      cumper.push(v);

                  });
              }
            });
          }
           else if(tab_value=='250K')
          {
            $.each(result.v4mini_performance, function(l,m) {
              if(l==board_value)
              {
                  $.each(this, function(k, v) {

                      date.push(k);
                      system.push(v);

                  });
              }
              if(l=='Anti-'+board_value)
              {
                  $.each(this, function(k, v) {

                      anti_system.push(v);

                  });
              }
              if(l=='benchmark')
              {
                  $.each(this, function(k, v) {

                      benchmark.push(v);

                  });
              }
              if(l==board_value+"_cumper")
              {
                  $.each(this, function(k, v) {
                      v = v + " %";
                      cumper.push(v);

                  });
              }
            });
          }

          var max_system = Math.max.apply(Math,system);
          var min_system = Math.min.apply(Math,system);

          var max_anti_system = Math.max.apply(Math,anti_system);
          var min_anti_system = Math.min.apply(Math,anti_system);

          var max_benchmark = Math.max.apply(Math,benchmark);
          var min_benchmark = Math.min.apply(Math,benchmark);

          var max = Math.max(max_system, max_anti_system, max_benchmark);
          var min = Math.min(min_system, min_anti_system, min_benchmark);
          
          max = max + 5000;
          min = min - 5000;

          var tot='';
          tot+=min.toString();
          tot+=":";
          tot+=max.toString();
          tot+=":1000";

          console.log(tot);
          var anti_val = 'Anti-'+board_value;
      

          var myConfig =  {
            "type":"line",
            "utc": true,
            "title": {
              "text": "Account Performance Chart",
              "font-size": "24px",
              "adjust-layout": true
            },
            "plotarea": {
              "margin": "dynamic 45 60 dynamic",
            },
            "scale-x":{
              "values":date,
              "transform": {
                "type": "date",
                "all": "%d %M %Y",
                "guide": {
                  "visible": false
                },
              },
              "item":{  
                "font-angle":315,  
              } 
            },
            "scale-y":{
              "values":tot,
              "guide": {
                "line-style": "dashed"
              },
              "thousands-separator":",",
            },
            "series":[
              {"values":system,
              "line-color":"#0000ff",
              "line-style":"line",
              "text": board_value,
              "legend-item": {
                "background-color": "#007790",
                "borderRadius": "5",
                "font-color": "white"
                },
                "marker": {
                  "background-color": "#da534d",
                  "border-width": 0,
                  "shadow": 0,
                  "border-color": "#faa39f"
                },
                "highlight-marker": {
                  "size": 6,
                  "background-color": "#da534d",
                }
              },
              {"values":anti_system,
              "line-color":"#0B850C",
              "line-style":"line",
              "text": anti_val,
              "legend-item": {
                "background-color": "#007790",
                "borderRadius": "5",
                "font-color": "white"
                },
                "marker": {
                  "background-color": "#da534d",
                  "border-width": 0,
                  "shadow": 0 ,
                  "border-color": "#faa39f"
                },
                "highlight-marker": {
                  "size": 6,
                  "background-color": "#da534d",
                }
              },
              {"values":benchmark,
              "line-color":"#ff0000",
              "line-style":"line",
              "text": "Benchmark",
              "legend-item": {
                "background-color": "#007790",
                "borderRadius": "5",
                "font-color": "white"
                },
                "marker": {
                  "background-color": "#da534d",
                  "border-width": 0,
                  "shadow": 0 ,
                  "border-color": "#faa39f"
                },
                "highlight-marker": {
                  "size": 6,
                  "background-color": "#da534d",
                }
              },
              {"values":cumper,
              "line-color":"#ff0000",
              "line-style":"line",
              "text": "Cum %",
              "legend-item": {
                "background-color": "#007790",
                "borderRadius": "5",
                "font-color": "white"
                },
                "marker": {
                  "background-color": "#da534d",
                  "border-width": 0,
                  "shadow": 0 ,
                  "border-color": "#faa39f"
                },
                "highlight-marker": {
                  "size": 6,
                  "background-color": "#da534d",
                }
              },
            ],
            "plot": {
              "highlight": true,
              "tooltip-text": "%t: %v<br>Date:%k",
              "shadow": 0,
              "line-width": "2px",
              "marker": {
                "type": "circle",
                "size": 1
              },
              "highlight-state": {
                "line-width": 3
              },
              "animation": {
                "effect": 1,
                "sequence": 2,
                "speed": 100,
              },
            },
            "crosshair-x": {
              "line-color": "#efefef",
              "plot-label": {
                "border-radius": "5px",
                "border-width": "1px",
                "border-color": "#f6f7f8",
                "padding": "10px",
                "font-weight": "bold",
                "thousands-separator":",",
              },
              "scale-label": {
                "font-color": "#000",
                "background-color": "#f6f7f8",
                "border-radius": "5px"
              },
            },
            "tooltip": {
              "visible": false
            },
          };


          zingchart.render({
            id: 'performance_chart',
            data: myConfig,
            // height: '100%',
            // width: '100%'
          });
        }
    });




    $.ajax
    ({
    url: 'http://localhost:8000/getchartdata',
    type: 'get',
    dataType: 'json', // added data type
    success: function(result)
    {
      var rank = [];
      var value_1 = [];
      var value_2 = [];
      var value_3 = [];

      if(tab_value=='50K')
      {         
        $.each(result.v4micro_ranking, function(l,m) {
          if(l=='20Day Lookback')
          {
              $.each(this, function(k, v) {

                  rank.push(k);
                  value_1.push(v);

              });
          }
          if(l=='2Day Lookback')
          {
              $.each(this, function(k, v) {

                  value_2.push(v);

              });
          }
          if(l=='5Day Lookback')
          {
              $.each(this, function(k, v) {

                  value_3.push(v);

              });
          }
        });
      }
      else if(tab_value=='100K')
      {         
        $.each(result.v4mini_ranking, function(l,m) {
          if(l=='20Day Lookback')
          {
              $.each(this, function(k, v) {

                  rank.push(k);
                  value_1.push(v);

              });
          }
          if(l=='2Day Lookback')
          {
              $.each(this, function(k, v) {

                  value_2.push(v);

              });
          }
          if(l=='5Day Lookback')
          {
              $.each(this, function(k, v) {

                  value_3.push(v);

              });
          }
        });
      }
      else if(tab_value=='250K')
      {         
        $.each(result.v4futures_ranking, function(l,m) {
          if(l=='20Day Lookback')
          {
              $.each(this, function(k, v) {

                  rank.push(k);
                  value_1.push(v);

              });
          }
          if(l=='2Day Lookback')
          {
              $.each(this, function(k, v) {

                  value_2.push(v);

              });
          }
          if(l=='5Day Lookback')
          {
              $.each(this, function(k, v) {

                  value_3.push(v);

              });
          }
        });
      }

      // console.log(rank);
      // console.log(value_1);
      // console.log(value_2);
      // console.log(value_3);

      // console.log(value_1[1]);
      // console.log(value_2[1]);
      // console.log(value_3[1]);
      // console.log(value_1[2]);



        // {
        //     "category": "John",
        //     "segments": [ {
        //         "start": 7,
        //         "duration": 2,
        //         "color": "#46615e",
        //         "task": "Task #1"
        //     }, {
        //         "duration": 2,
        //         "color": "#727d6f",
        //         "task": "Task #2"
        //     }, {
        //         "duration": 2,
        //         "color": "#8dc49f",
        //         "task": "Task #3"
        //     } ]
        // },

        // var data = '';
        // $.each(result.rank, function(k,v) {
        //     data += '{';
        //     data += '"category": "'+k'",';
        //     data += '"segments": [ {';
        //     data += '"start": '+v+',';
        //     data += '"duration": 2,';
        //     data += '"color": "#46615e",';
        //     data += '';
        //     data += '';
        //     data += '';
        //     data += '';
        //     data += '';
        //     data += '';
        // });




      var chart = AmCharts.makeChart( "ranking_chart", {
        "type": "gantt",
        "theme": "none",
        "marginRight": 50,
        // "period": "hh",
        // "dataDateFormat":"YYYY-MM-DD",
        // "balloonDateFormat": "JJ:NN",
        "columnWidth": 0.5,
        "valueAxis": {
            "type": "number"
        },
        "brightnessStep": 10,
        "graph": {
            "fillAlphas": 1,
            "balloonText": "<b>[[task]]</b>: [[open]] [[value]]"
        },
        "rotate": true,
        "categoryField": "category",
        "segmentsField": "segments",
        "colorField": "color",
        "startDate": "2015-01-01",
        "startField": "start",
        "endField": "end",
        "durationField": "duration",
        "dataProvider": [ {
            "category": "John",
            "segments": [ {
                "start": 7,
                "duration": 2,
                "color": "#46615e",
                "task": "Task #1"
            }, {
                "duration": 2,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "duration": 2,
                "color": "#8dc49f",
                "task": "Task #3"
            } ]
        }, {
            "category": "Smith",
            "segments": [ {
                "start": 10,
                "duration": 2,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "duration": 1,
                "color": "#8dc49f",
                "task": "Task #3"
            }, {
                "duration": 4,
                "color": "#46615e",
                "task": "Task #1"
            } ]
        }, {
            "category": "Ben",
            "segments": [ {
                "start": 12,
                "duration": 2,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "start": 16,
                "duration": 2,
                "color": "#FFE4C4",
                "task": "Task #4"
            } ]
        }, {
            "category": "Mike",
            "segments": [ {
                "start": 9,
                "duration": 6,
                "color": "#46615e",
                "task": "Task #1"
            }, {
                "duration": 4,
                "color": "#727d6f",
                "task": "Task #2"
            } ]
        }, {
            "category": "Lenny",
            "segments": [ {
                "start": 8,
                "duration": 1,
                "color": "#8dc49f",
                "task": "Task #3"
            }, {
                "duration": 4,
                "color": "#46615e",
                "task": "Task #1"
            } ]
        }, {
            "category": "Scott",
            "segments": [ {
                "start": 15,
                "duration": 3,
                "color": "#727d6f",
                "task": "Task #2"
            } ]
        }, {
            "category": "Julia",
            "segments": [ {
                "start": 9,
                "duration": 2,
                "color": "#46615e",
                "task": "Task #1"
            }, {
                "duration": 1,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "duration": 8,
                "color": "#8dc49f",
                "task": "Task #3"
            } ]
        }, {
            "category": "Bob",
            "segments": [ {
                "start": 9,
                "duration": 8,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "duration": 7,
                "color": "#8dc49f",
                "task": "Task #3"
            } ]
        }, {
            "category": "Kendra",
            "segments": [ {
                "start": 11,
                "duration": 8,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "start": 16,
                "duration": 2,
                "color": "#FFE4C4",
                "task": "Task #4"
            } ]
        }, {
            "category": "Tom",
            "segments": [ {
                "start": 9,
                "duration": 4,
                "color": "#46615e",
                "task": "Task #1"
            }, {
                "duration": 3,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "duration": 5,
                "color": "#8dc49f",
                "task": "Task #3"
            } ]
        }, {
            "category": "Kyle",
            "segments": [ {
                "start": 6,
                "duration": 3,
                "color": "#727d6f",
                "task": "Task #2"
            } ]
        }, {
            "category": "Anita",
            "segments": [ {
                "start": 12,
                "duration": 2,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "start": 16,
                "duration": 2,
                "color": "#FFE4C4",
                "task": "Task #4"
            } ]
        }, {
            "category": "Jack",
            "segments": [ {
                "start": 8,
                "duration": 10,
                "color": "#46615e",
                "task": "Task #1"
            }, {
                "duration": 2,
                "color": "#727d6f",
                "task": "Task #2"
            } ]
        }, {
            "category": "Kim",
            "segments": [ {
                "start": 12,
                "duration": 2,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "duration": 3,
                "color": "#8dc49f",
                "task": "Task #3"
            } ]
        }, {
            "category": "Aaron",
            "segments": [ {
                "start": 18,
                "duration": 2,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "duration": 2,
                "color": "#FFE4C4",
                "task": "Task #4"
            } ]
        }, {
            "category": "Alan",
            "segments": [ {
                "start": 17,
                "duration": 2,
                "color": "#46615e",
                "task": "Task #1"
            }, {
                "duration": 2,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "duration": 2,
                "color": "#8dc49f",
                "task": "Task #3"
            } ]
        }, {
            "category": "Ruth",
            "segments": [ {
                "start": 13,
                "duration": 2,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "duration": 1,
                "color": "#8dc49f",
                "task": "Task #3"
            }, {
                "duration": 4,
                "color": "#46615e",
                "task": "Task #1"
            } ]
        }, {
            "category": "Simon",
            "segments": [ {
                  "start": 10,
                "duration": 3,
                "color": "#727d6f",
                "task": "Task #2"
            }, {
                "start": 17,
                "duration": 4,
                "color": "#FFE4C4",
                "task": "Task #4"
            } ]
        } ],
        "valueScrollbar": {
            "autoGridCount":true
        },
        "chartCursor": {
            "cursorColor":"#55bb76",
            "valueBalloonsEnabled": false,
            "cursorAlpha": 0,
            "valueLineAlpha":0.5,
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true,
            "zoomable":false,
            "valueZoomable":true
        },
        "export": {
            "enabled": true
        }
      });
    }
    });

});
