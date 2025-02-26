document.querySelector('#push').onclick = function () {
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Please Enter a Task !!")
    }else{
        document.querySelector('#tasks').innerHTML
        += `
        <div class="task">
        <span id="taskname">
            ${document.querySelector
            ('#newtask input').value}
        </span>
                <button class="delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
        </div>  
         `;
         var currrent_task = document.querySelectorAll(".delete");
         for(var i=0; i<currrent_task.length; i++){
            currrent_task[i].onclick = function(){
                this.parentNode.remove();
            }
         }
         var tasks = document.querySelectorAll(".task");
         for(var i = 0; i<tasks.length; i++){
            tasks[i].onclick = function(){
                this.classList.toggle('completed');
            }
         }
         document.querySelector("#newtask input").value = "";
    }
}

// For sidebar in mobile

const navbar = document.getElementById('navbar')
const openButton = document.getElementById('open-sidebar-button')
const media = window.matchMedia("(width < 768px")

function openSidebar (){
    navbar.classList.add('show')
    openButton.setAttribute('aria-expand','true')
    navbar.removeAttribute('inert')
}
function closeSidebar (){
    navbar.classList.remove('show')
    openButton.setAttribute('aria-expand','false')
}

