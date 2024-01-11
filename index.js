const dropArea = document.getElementById("dropArea");
var files = [];
// Dosyaların sürüklendiği olay dinleyicisi
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});

// Dosyaların bırakıldığı olay dinleyicisi
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

// Dosyalar bırakıldığında veya dosya seçildiğinde tetiklenen olay dinleyicisi
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");


  files = e.dataTransfer.files;
  handleFiles(files);
  appendToTable(files);
  var isValid = handleFiles(files);
  if(!isValid)
    applyNotValidOperation();
});

// Dosya seçmek için tıklanıldığında tetiklenen olay dinleyicisi
fileInput.addEventListener("change", (e) => {
  const files = e.target.files;

  //if(isValid) 
    //sendFiles();
});

// Dosyaları işleyen fonksiyon
function handleFiles(files) {
    console.log(files.length);
    if(files.length <= 2) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log("Yüklenen dosya:", file.name);
          if(files[i].size > 50000)
            return false;
        }
        return true;
    }else {
        alert("Only VIP account's insert more than 2 files.");
        return false;
    }
}


function applyNotValidOperation() { 
  var alert = $("#alert");
  alert.style.display = "block";
}

function appendToTable(files) {
  for (const file of files) {
     $("#table").find("tbody").append("<tr>" + "<th>" + file.name + "</th>"  + "<th>" + file.size + "</th>" + '<th><a class="btn btn-danger" onclick="remove()">Remove</a></th>' +  "</tr>");
  }
   
}

function sendFiles(files) {
  $.$.ajax({
    type: "post",
    url: "/Home/getFiles",
    data: files,
    success: function (response) {
      
    },
    error: function (param) {
      alert("Files couldn't send");
      }
  });

}