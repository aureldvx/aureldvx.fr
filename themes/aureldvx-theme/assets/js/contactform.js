let form = document.querySelector('form.contact');

if(form !== null) {
	let formName = form.querySelector('#contact__identity');
	let formDescription = form.querySelector('#contact__description');
	let formMail = form.querySelector('#contact__email');

	formName.addEventListener('focus', () => { createInput('username', 'text', formName) });
	formDescription.addEventListener('focus', () => { createInput('description', 'text', formDescription) });
	formMail.addEventListener('focus', () => { createInput('mail', 'text', formMail) });

	formName.addEventListener('input', () => { createInput('username', 'text', formName) });
	formDescription.addEventListener('input', () => { createInput('description', 'text', formDescription) });
	formMail.addEventListener('input', () => { createInput('mail', 'text', formMail) });

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = form.querySelector('input[name="username"]');
		const description = form.querySelector('input[name="description"]');
		const email = form.querySelector('input[name="mail"]');
		const subject = form.querySelector('select[name="mission"]');

		let messageExists = form.querySelector('.form__error-message');
		if(messageExists !== null)
			form.removeChild(messageExists)

		let errors = document.createElement('p');
		errors.classList.add('form__error-message');

		let validation= true;

		if(name === null) {
			errors.innerHTML += `<span>Merci de renseigner vos nom et prénom</span>`;
			validation = false
		}
		if(description === null) {
			errors.innerHTML += `<span>Merci de renseigner une courte description de votre demande</span>`;
			validation = false
		}
		if(email === null) {
			errors.innerHTML += `<span>Merci de renseigner votre email</span>`;
			validation = false
		}
		if(subject === null) {
			errors.innerHTML += `<span>Merci de renseigner un sujet</span>`;
			validation = false
		}
		if(email !== null && !ValidateEmail(email.getAttribute('value'))) {
			errors.innerHTML += `<span>Merci de renseigner un email valide</span>`;
			validation = false
		}

		if(validation) {
			Email.send({
				SecureToken : "0735d22a-8a73-44cb-8f20-0676771345f3",
				To : 'hello@aureldvx.fr',
				From : "aurelien.devaux16@gmail.com",
				Subject : "PORTFOLIO // Formulaire de contact",
				Body : `<p>Une personne a rempli le formulaire avec les informations suivantes :</p>
<ul>
	<li><strong>Nom : </strong>${name.getAttribute('value')}</li>
	<li><strong>Sujet : </strong>${subject.value}</li>
	<li><strong>Détail : </strong>${description.getAttribute('value')}</li>
	<li><strong>Email : </strong>${email.getAttribute('value')}</li>
</ul>`
			}).then(
				(message) => {
					if(message === 'OK') {
						errors.innerHTML += `<span>Votre message a été envoyé !</span>`
					} else {
						errors.innerHTML += `<span>Un problème est survenu lors de l'envoi du message 😕 Merci de réessayer plus tard !</span>`
					}
				}
			);
		}
		form.append(errors)
	});

	function createInput(name, type, elem) {
		let input = form.querySelector('input[name="' + name + '"]');
		if(input !== null) {
			input.setAttribute('value', elem.innerText)
		} else {
			let fakeInput = document.createElement('input');
			fakeInput.name = name;
			fakeInput.type = type;
			fakeInput.style.display = 'none';
			fakeInput.value = elem.innerText;
			form.insertBefore(fakeInput, form.querySelector('button'));
		}
	}

	function ValidateEmail(mail)
	{
		let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return regex.test(mail);
	}
}