const title = document.getElementById("title");
const description = document.getElementById("description");
const addButton = document.querySelector(".add-btn");
const items = document.getElementById("ul-items");

addButton.addEventListener("click", show);

window.onload = function(){
  let blogs = JSON.parse(localStorage.getItem('blogs',)) || [];
  blogs.forEach(blog => {
    renderBlog(blog)
  });
}

function renderBlog(blog) {
  const li = document.createElement("li");
  const h1 = document.createElement("h1");
  const p = document.createElement('p');
  const delBtn = document.createElement('button');
  const editBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  editBtn.textContent = 'Edit';
  delBtn.id = 'del-btn'
  editBtn.id = 'edit-btn'
  h1.textContent = blog.title;
  p.textContent = blog.description;
  li.append(h1,p,delBtn,editBtn)
  items.appendChild(li)

  delBtn.addEventListener('click', function(){
    li.remove()
    removeFromLocalStorage(blog);
  })
  editBtn.addEventListener('click', function(){
    title.value = h1.textContent;
    description.value = p.textContent;
    li.remove();
  })
}
function show(event){
  event.preventDefault();
  const newBlog = {
    title: title.value,
    description: description.value,
  }
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.push(newBlog);
  localStorage.setItem("blogs",JSON.stringify(blogs))

  renderBlog(newBlog)

  title.value = "";
  description.value = "";
}
function removeFromLocalStorage(blogToRemove) {
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs = blogs.filter(
    (blog) =>
      !(
        blog.title === blogToRemove.title &&
        blog.description === blogToRemove.description
      )
  );
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

function searchBlog(){
    const searchInput = document.getElementById("search-item").value.toLowerCase() ;
    const blogItems = document.getElementById('ul-items').getElementsByTagName('li');

    for(let i = 0; i < blogItems.length; i++){
        const h1 = blogItems[i].getElementsByTagName('h1')[0];
        const titleText =h1.textContent.toLowerCase();

        if(titleText.includes(searchInput)){
            blogItems[i].style.display = "";
        }else{
            blogItems[i].style.display = 'none'
        }
    }
}

