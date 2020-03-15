import React from 'react';

const Formfield = ({formdata, change, id}) => {
    
    const renderTemplate = () => {
        let formTemplate = null;
        console.log(formdata)
        
        switch(formdata.element){

            case('input'):
                formTemplate = (
                    <div className="formBlock">
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            //eveything doing change or onblur, will fire this function that will updatethe state of form data
                            onBlur={(event)=>{change({event, id, blur: true})}}
                            coChange={(event)=>{change({event, id})}}
                        />
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