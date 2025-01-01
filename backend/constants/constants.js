/* const commitlyPromt = (userMessage) => {
  return `Generate eight creative and funny commit messages for the following changes ${userMessage}.Make each commit message witty, relevant to the changes, and optionally include playful puns or jokes. Additionally, if the user provides a specific commit message, transform it into a funnier, lighthearted version while retaining its core meaning. Ensure the suggestions fit common Git commit message guidelines (short, clear, and impactful). donot describe the changes in detail, but rather focus on the commit message itself. and just give the commit messages in the response without the need to add the description to the commit messages dont give me serial number just give me the texts seperated by a single \n`;
}; */
const commitlyPromt = (userMessage) => {
  return `ONLY dont describe the thought process nor conclusions  Generate eight funny and creative GitHub commit messages for the following changes: ${userMessage}. Use Nepali words translated into English phonetically. Focus on humor and brevity, following common Git commit guidelines. For example, use 'UI ko jit bhayo' instead of describing the change in detail. dont give the actual english translation dont give me serial number just give me the texts seperated by a single \n`;
};
export { commitlyPromt };
