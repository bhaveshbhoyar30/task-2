 // Contact Form Validation and Submission
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (!name) {
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            }
            
            // Validate email
            if (!email) {
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!validateEmail(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Validate message
            if (!message) {
                document.getElementById('messageError').textContent = 'Message is required';
                isValid = false;
            }
            
            if (isValid) {
                // In a real application, you would send the data to a server here
                console.log({ name, email, message });
                
                // Show success message
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
                
                // Reset form
                contactForm.reset();
            }
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // To-Do List Functionality
        const todoInput = document.getElementById('todoInput');
        const addTodoBtn = document.getElementById('addTodo');
        const todoList = document.getElementById('todoList');
        
        addTodoBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
        
        function addTodo() {
            const text = todoInput.value.trim();
            if (text) {
                const li = document.createElement('li');
                li.className = 'todo-item';
                li.innerHTML = `
                    <span class="todo-text">${text}</span>
                    <button class="delete-btn">Delete</button>
                `;
                todoList.appendChild(li);
                todoInput.value = '';
                
                li.querySelector('.delete-btn').addEventListener('click', function() {
                    li.style.animation = 'fadeIn 0.3s ease-out reverse';
                    setTimeout(() => {
                        li.remove();
                    }, 300);
                });
            }
        }

        // Image Gallery Functionality
        const imageUpload = document.getElementById('imageUpload');
        const galleryGrid = document.getElementById('galleryGrid');
        const clearGalleryBtn = document.getElementById('clearGallery');
        
        imageUpload.addEventListener('change', function(e) {
            const files = e.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.match('image.*')) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const galleryItem = document.createElement('div');
                        galleryItem.className = 'gallery-item';
                        galleryItem.innerHTML = `
                            <img src="${event.target.result}" alt="Uploaded image ${file.name}">
                        `;
                        galleryGrid.appendChild(galleryItem);
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
        
        clearGalleryBtn.addEventListener('click', function() {
            galleryGrid.innerHTML = '';
        });