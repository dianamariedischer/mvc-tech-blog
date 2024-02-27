const updateHandler = async (event) => {
    event.preventDefault();

    
    const title = document.querySelector('#title').value.trim();
    const text = document.querySelector('#text').value.trim();
  
    if (title && text) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to update post.');
        }
    }
};

const deleteHandler = async (event) => {
    event.preventDefault();

    
    const post_id = window.location.pathname.slice(8);
  
    if (post_id) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE',
        });
  
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete post.');
        }
    }
};

document
    .getElementById('update-button')
    .addEventListener('click', updateHandler);

document
    .getElementById('delete-button')
    .addEventListener('click', deleteHandler);