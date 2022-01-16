const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_APIKEY);

const sendMail = async (to, name, movieName) => {
  const message = {
    to,
    from: "siriusa255@gmail.com",
    subject: "Confirmation of Movie Ticket Booking",
    text: `${name},Your booking for movie ${movieName} has been confirmed.
        Thank You.`,
  };

  await sendgrid.send(message);
};

module.exports = sendMail;
