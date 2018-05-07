$(document).ready(function(){
let pixelCanvas = $("#pixelCanvas");
  
function makeGrid(cols, rows) {
  let mousedown=false;
  
  $(document).mousedown((event)=>{
  if(event.which===1)  {
    mousedown=true;
  }
    $("td").on("dblclick", function(){
        const color = $("#colorPicker").val();
        $(this).css("background-color","#ffffff");  
    });
    
    $("td").on("click", function(){
        const color = $("#colorPicker").val();
        $(this).css("background-color",color);
    });
    
    $("td").on("mousedown", function(){
        const color = $("#colorPicker").val();
        $(this).css("background-color",color);
    });
    
    $("td").on("mouseover", function(){
      if(mousedown===true){
        const color = $("#colorPicker").val();
        $(this).css("background-color",color);
      }
        });
    
    $(document).mouseup((event)=>{
    mousedown=false;
    });
  });
  
          $("#pixelCanvas tr").remove();
          for (x = 0; x < cols; ++x) {
          const tr = $("<tr></tr>");
          pixelCanvas.append(tr);
               for (y = 0; y < rows; ++y) {
                const td = $("<td></td>");
                $(tr).append(td);
               }
          }
         
  }

  $("#sizePicker").submit(function(event){
    event.preventDefault();
    const cols = $("#inputHeight").val();
    const rows = $("#inputWeight").val();
    makeGrid(cols,rows);
    
  const pixelSize = $("#pixelSize").val();
  const finalPixelSize = pixelSize*2+"px";
  const height = "height";
  const width = "width"; 
   const maxWidth = "max-width";
  $("tr").css(height, finalPixelSize);
  $("td").css(width, finalPixelSize);
  
  const padWidth = finalPixelSize*rows;
  const padHeight = finalPixelSize*cols;
  $("#table").css(maxWidth, padWidth);
  $("#table").css(height, padHeight); 
  });
  
  $("#saveimg").click(function(){
        html2canvas($("#pixelCanvas"), {
            onrendered: function(canvas) {         
                var imgData = canvas.toDataURL(
                    'image/png');              
                var doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save('sample-file.pdf');
            }
        });
  });
    
$('#saveimg').click(function () {
    html2canvas($(pixelCanvas), {
        onrendered: function (canvas) {
            let imgData = canvas.toDataURL(
                'image/png');
            let doc = new jsPDF('p', 'mm');
            doc.addImage(imgData, 'PNG', 10, 10);
            doc.save('sample-file.pdf');
        }
    });
});
});