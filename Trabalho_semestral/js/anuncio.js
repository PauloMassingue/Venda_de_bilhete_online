const nextButton =document.querySelector('.btn-next');
const prevButton =document.querySelector('.btn-prev');
const steps =document.querySelectorAll('.step');
const form_steps=document=document.querySelectorAll('.form-step');
let active=1;


nextButton.addEventListener('click',()=>{
    active++;
    if(active>steps.length){
        active=steps.length;
    }
    updateProgress();
})

prevButton.addEventListener('click' ,()=>{
    active--;
    if(active<1){
        active=1;

    }
    updateProgress();
})


const updateProgress =()=>{
    console.log('steps.length=>' +steps.length);
    console.log('active=>' +active);

     // essa parte troca os steps de acordo com os cliques nos botoes

     steps.forEach((step, i)=>{
        if(i==(active-1)){

            step.classList.add('active');
            form_steps[i].classList.add('active');
            console.log('i=>' +i);
        }
        else{
            step.classList.remove('active');
            form_steps[i].classList.remove('active');
        }
     });


     // esspa parte habilita e desabilita o botao voltar

     if(active===1){
        prevButton.disabled=FALSE;
     }else if(active===steps.length){
        nextButton.desabled=true;

     }else{
        prevButton.desabled=false;
        nextButton.desabled=false;
     }
}







// ==================parte de upload de imagens ======================

const uploadForm = document.getElementById("upload-form");
  const imageUpload = document.getElementById("image-upload");
  imageUpload.addEventListener("change", handleFileSelect);



function handleFileSelect(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById("preview-container");
    previewContainer.innerHTML = "";
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onload = function (event) {
        const image = new Image();
        image.src = event.target.result;
        previewContainer.appendChild(image);
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  
  