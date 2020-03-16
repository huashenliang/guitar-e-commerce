import React from 'react';

const Formfield = ({formdata, change, id}) => {
    
    const showError = () => {
        let errorMessage = null;

        //display error message
        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>

            )
        }

        return errorMessage
    }

    const renderTemplate = () => {
        let formTemplate = null;
        
        console.log(formdata.element)
        
        switch(formdata.element){

            case('input'):
                formTemplate = (
                    <div className="formBlock">
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            //eveything doing change or onblur, will fire this function that will updatethe state of form data
                            onBlur={(event)=>change({event, id, blur: true})}
                            onChange={(event)=>change({event, id})}
                        />
                        {showError()}
                    </div>
                )
            break;
            default:
                formTemplate= null
        }

        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>

    );
}
 
export default Formfield;