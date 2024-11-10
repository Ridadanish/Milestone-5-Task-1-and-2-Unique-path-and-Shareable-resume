document.getElementById('resumeform')?.addEventListener('submit', function(event) {
    event.preventDefault();

    //Get references to form elements using their IDs
    const  profilePictureInput = document.getElementById('profilePicture');
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const educationElement = document.getElementById('education');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills');
    const CVNameElement = document.getElementById('CVName');

    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && CVNameElement) {

        const name = (nameElement as HTMLInputElement).value;
        const email = (emailElement as HTMLInputElement).value;
        const phone = (phoneElement as HTMLInputElement).value;
        const education = (educationElement as HTMLInputElement).value;
        const experience = (experienceElement as HTMLInputElement).value;
        const skills = (skillsElement as HTMLInputElement).value;
        const CVName = (CVNameElement as HTMLInputElement).value;
        const uniquePath = `resumes/${CVName.replace(/\s*/g, '_')}_cv.html`

        //Handle profile picture
        const profilePictureFile = (profilePictureInput as HTMLInputElement).files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
     
  
    //Create Resume Output
    const resumeOutput = `
    <h2>Resume</h2>
    ${profilePictureURL ? `<img src"${profilePictureURL} alt="profile Picture" class='profilePicture">`: "" }
    <p><strong>Name:</strong> ${name} </p>
    <p><strong>Email:</strong> ${email} </p>
    <p><strong>Phone Number:</strong> ${phone} </p>
    
    <h3>education</h3>
    <p>${education}</p>

    <h3>experience</h3>
    <p>${experience}</p>

    <h3>skills</h3>
    <p>${skills}</p>`;

    //Display the resume in the output container
    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement){
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.classList.remove("hidden");

    //create container for button
    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttonsContainer";
    resumeOutputElement.appendChild(buttonsContainer);

    //Add Download PDF buttons
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download as PDF";
    downloadButton.addEventListener("click", () => {
        window.print(); 
    });
    buttonsContainer.appendChild(downloadButton);

    //add shareable link button
    const shareLinkButton = document.createElement("button");
    shareLinkButton.textContent = "Copt Shareable Link";
    shareLinkButton.addEventListener("click", async () => {
        try {
            const shareableLink = `https://yourdomain.com/resumes/${name.replace(
                /\s*/g,
                "_"
            )}_cv.html`;
            await navigator.clipboard.writeText(shareableLink);
            alert("shareable Link copied to clipboard!");
        } catch(err){
            console.error("failed to copy link:", err);
            alert("failed to copy to Clipboard. Please trt again.");
        }
    });
    buttonsContainer.appendChild(shareLinkButton);
    } else {
        console.error('the resume output element is missing')
    }
} else {
    console.error('one or more output elements are missing')
}
})