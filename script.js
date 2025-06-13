// Form submission handling
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.style.color = 'inherit';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            formStatus.textContent = 'Message sent successfully!';
            formStatus.style.color = 'green';
            form.reset();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
        // formStatus.style.color = 'red';
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});
