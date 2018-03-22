


export class PdfUtilities {


  templatePath = './pdfTemplates/';

  constructor() {

  }
  
  generatePDF(data?: string[]) {
      /*var htmlPath = req.body.htmlPath;
      if (!htmlPath){
          res.status(400).send("Missing 'htmlPath'");
          return;
      }**/
      var fs = require('fs');
      var ejs = require('ejs');
      var pdf = require('html-pdf')
      var compiled = ejs.compile(fs.readFileSync(this.templatePath + '/basic_variable_pdf.html', 'utf8'));
      var html = compiled({ title : 'EJS', text : 'Hello, World!' });
      // you may want to change this path dynamically if you also wish to keep the generated PDFs
      var pdfFilePath = './businesscard.pdf';
      var options = { format: 'A4' };
      pdf.create(html, options).toFile(pdfFilePath);
      fs.readFile(pdfFilePath , function (err,data){
        return data;
      });
  }

}