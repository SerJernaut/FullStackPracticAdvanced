const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const senderEmail = 'squadhelp2.0@gmail.com';
const senderPass = 'squadhelp_email_pass';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: senderEmail,
        pass: senderPass
    }

}, {
    from: 'Squadhelp <squadhelp2.0@gmail.com>',
});

const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve(__dirname, '../emailTemplates'),
        layoutsDir: path.resolve(__dirname, '../emailTemplates'),
        defaultLayout: null,
    },
    viewPath: path.resolve(__dirname, '../emailTemplates'),
    extName: '.html',
};

transporter.use('compile', hbs(handlebarOptions))

module.exports = {transporter};