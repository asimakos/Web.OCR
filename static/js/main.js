

$(document).ready(function(){

	var file;
	const reader = new FileReader();

        $('input[type="file"]').change(function(e){

        	//var fileName=e.target.files[0].name;

            file = e.target.files[0];

            if (file){
            	reader.readAsDataURL(file);
            }


            reader.onload = function (e) {

             $('img').attr('src', e.target.result);

             $('#warning').fadeIn();

	         const worker = Tesseract.createWorker({
		      logger: m => console.log(m)
		    });
		    //Tesseract.setLogging(true);
		    work();

		    async function work() {
		      await worker.load();
		      await worker.loadLanguage('ell+eng');
		      await worker.initialize('ell');

		      let result = await worker.detect(e.target.result);
		      //console.log(result.data);

		      result = await worker.recognize(e.target.result);
		      //console.log(result.data);

               $('#FormControlTextarea').val(result.data.text);
               $('#warning').fadeOut();
               $('#success').fadeIn();

		      await worker.terminate(); 
		    }

        }
			   
	 });
 
    });

