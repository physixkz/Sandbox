const newFormHandler = async (event) => {
  event.preventDefault();

  const dish = document.querySelector('#project-name').value.trim();
  const cooking_time = document.querySelector('#project-funding').value.trim();
  const ingredients = document.querySelector('#project-desc').value.trim();
  const instructions = document.querySelector('#project-inst').value.trim();
  const picture_link = document.querySelector('#project-pict').value.trim();

  if (dish && cooking_time && ingredients && instructions && picture_link) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ dish, cooking_time, ingredients, instructions, picture_link }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const deleteButtonHandler = async (event) => {
  if (event.target.classList.contains('btn-delete')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const showEditFormHandler = (event) => {
  if (event.target.classList.contains('btn-edit')) {
    const editForm = event.target.parentElement.parentElement.nextElementSibling;
    editForm.style.display = 'block';
  }
};

document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);

document.querySelector('.project-list').addEventListener('click', deleteButtonHandler);

document.querySelector('.project-list').addEventListener('click', showEditFormHandler);
