import emailjs from "emailjs-com";
export const sendEmail = async (form) => {
  //  emailjs.init();
  console.log(form);
  try {
    const result = await emailjs.sendForm(
      "service_coqzmrc",
      "template_981afkk",
      form,
      "xIfEy8xWKk5lAtZ9K"
    );
    console.log("done");
    console.log(result);
  } catch (error) {
    console.log(error);
    console.log("error");
    throw error;
  } finally {
    console.log("exited");
  }
};
