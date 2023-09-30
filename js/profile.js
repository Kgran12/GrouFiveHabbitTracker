const newFormHandler = async (event) => {
    event/preventDefault();

    const name = document.querySelector('#goals-name').value.trim();
    const description = document.querySelector('#goals-description').value.trim();
    const date = document.querySelector('#goals-date').value.trim();
    const completed = document.querySelector('#goals-completed').value.trim();

    if (name && description && date && completed) {
        const response = await fetch(`/api/goals`, {
            method: 'POST',
            body: JSON.stringify({ name, description, date, completed }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create goal');
        }
    }
};

const delBtnHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/goals/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete goal');
        }
    }
};

document
.querySelector('.new-goals-form')
.addEventListener('submit', newFormHandler);

docuemnt
.querySelector('.goal-list')
.addEventListener('click', delBtnHandler);