const $ = require('jquery');
const { postCard, getAllCards } = require('./model');

const submitForm = () => {
    console.log("Form submitted");
    let formData = {
        title: $('#title').val(),
        movie: $('#subtitle').val(),
        path: $('#path').val(),
        description: $('#description').val()
    };

    console.log(formData);

    postCard(formData)
        .then(result => {
            if (result.statusCode === 201) {
                alert('Card posted successfully');
                getAllCards();
            }
        })
        .catch(error => {
            console.error(error);
            alert('Failed to post card');
        });
};

module.exports = { submitForm };
