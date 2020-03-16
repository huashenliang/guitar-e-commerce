export const validateEmail = (mail)  => 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true
  }
    return false
}

export const validate = (element, formdata=[]) => {
    //default 
    let error = [true, '']

    //validating email 
    if(element.validation.email){
           const valid = validateEmail(element.value)
           const message = `${!valid ? 'Must be a valid email' : ''}`
           error = !valid ? [valid, message] : error
    }

    if(element.validation.required){
        //checking if the value is empty 
        const valid = element.value.trim() !== ''
        //if not valid, get a error message 
        const message = `${!valid ? 'This filed is required' : ''}`

        error = !valid ? [valid, message] : error
    };

    return error

}

export const update = (element, formdata, formName) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }

    //mutate the new elements 
    newElement.value = element.event.target.value;

    //check if the user is clicked 
    if(element.blur){
        //validating inputed data
        let validData = validate(newElement, formdata);

        //valiData[0] return a boolean
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

    }

    newElement.touched = element.blur;

    //new state of formData
    newFormdata[element.id] = newElement


    return newFormdata;
}