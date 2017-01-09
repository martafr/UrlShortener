$(document).ready(
    function() {
        getStatistics();

        $('#form').submit(
            function(event){
                event.preventDefault();

                var formData = $(this).serialize();

                getStatisticsFiltered(formData);
            }
        );
    }
);

function getStatistics() {
    $. ajax({
        type : "GET",
        url : "/statistics",
        success : function(msg) {
            getData(msg);
        }
    } );
}

function getStatisticsFiltered(data) {
    $. ajax({
        type : "GET",
        url : "/statistics",
        data: data,
        success : function(msg) {
            getData(msg);
        }
    } );
}

function getData(msg) {
    var data="";
    data+=
        "<div class='text-left'><table class='table table-hover table-bordered' id='data'>"
        + "<thead>"
        + "<tr>"
        + "<th>Browser</th>"
        + "<th>Version</th>"
        + "<th>Click Stats</th>"
        + "</tr>"
        + "</thead><tbody>";

    var browserLen = msg.browserList.length;

    for(var i=0;i<browserLen;i++) {
        var versionLen=msg.versionList[i].length;
        for(var j=0;j<versionLen;j++){
            // save browsers data
            data += "<tr><td>" +msg.browserList[i]+"</td>"+"<td>" +msg.versionList[i][j]+"</td>"+"<td>" +((msg.clicksforversion[i][j]/msg.clicks)*100).toFixed(2)+" %</td></tr>";
        }

    }
    data+="</tbody></table></div>";

    data+=
        "<div class='text-left'><table class='table table-hover table-bordered'>"
        + "<thead>"
        + "<tr>"
        + "<th>Operative System</th>"
        + "<th>Click Stats</th>"
        + "</tr>"
        + "</thead><tbody>";
    var osLen=msg.osList.length;
    for(var i=0;i<osLen;i++) {
        // save os data
        data += "<tr><td>" +msg.osList[i]+"</td>"+"<td>" +((msg.clicksforos[i]/msg.clicks)*100).toFixed(2)+" %</td></tr>";
    }
    data+="</tbody></table></div>";
    $("#result").html(data);
}
