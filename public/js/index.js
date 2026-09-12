
console.log("Validation JS Loaded");
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})

let tax=document.querySelector(".tax-switch");
tax.addEventListener("change",()=>{
let tax_info = document.querySelectorAll(".tax-info");
for (let info of tax_info){
  if(info.style.display !=="inline"){
  info.style.display="inline";}
  else{
    info.style.display="none";
}
  }
}
);
