window.onload = function () {
  var header = document.getElementsByName("GradeTaskHeader")[0].contentWindow;
  var body = document.getElementsByName("GradeTaskBody")[0].contentWindow;
  var footer = document.getElementsByName("GradeTaskBottom")[0].contentWindow;

  var students = {};
  students["Task"] = header.document.getElementById('TaskName').value;

  var studentCount = body.document.getElementById('StudentCount').value;
  var outOf = body.document.getElementById('OutOf').value;

  function sendGrades() { 
    var i; for (i = 0; i < studentCount; i++) {
      var workingRow = body.document.getElementsByTagName('tr').item(i);
      var workingId = workingRow.getElementsByTagName('td')[0].innerHTML;

      var matches = /\(([^)]+)\)/.exec(workingId);
      workingId = (matches != null) ? matches[1] : "10048"; 

      var workingGrade = workingRow.getElementsByTagName('input')[1].value;
      workingGrade = Math.round(workingGrade / outOf * 100).toString();
      students[workingId] = workingGrade;
    }
    chrome.runtime.sendMessage({data: students});
  }

  footer.document.getElementById("Submit1").addEventListener("click", function () {
    sendGrades(); 
  })
};