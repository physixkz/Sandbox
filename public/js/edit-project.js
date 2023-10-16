const editFormHandler = async (event) => {
    event.preventDefault();
  
    const id = event.target.getAttribute('data-id');
    const dish = document.querySelector('#edit-project-name').value.trim();
    const cooking_time = document.querySelector('#edit-project-funding').value.trim();
    const ingredients = document.querySelector('#edit-project-desc').value.trim();
    const instructions = document.querySelector('#edit-project-inst').value.trim();
    const picture_link = document.querySelector('#edit-project-pict').value.trim();
  
    if (dish && cooking_time && ingredients && instructions && picture_link) {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ dish, cooking_time, ingredients, instructions, picture_link }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile'); // Redirect to the profile page after successfully updating the recipe
      } else {
        alert('Failed to update the recipe');
      }
    }
  };
  
  document
    .querySelector('.edit-project-form')
    .addEventListener('submit', editFormHandler);
  