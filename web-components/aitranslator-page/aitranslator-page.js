
export class AiTranslatorPage {
    constructor(element, invalidate) {
        this.element = element;
        this.invalidate = invalidate;
        this.invalidate();
        this.text = "";
    }

    beforeRender() {
        if(!this.personality){
            this.selectedPersonality = `<option value="" disabled selected hidden>Select personality</option>`;
        }else {
            this.selectedPersonality = `<option value="${this.personality.id}" selected>${this.personality.name}</option>`
        }
        let stringHTML = "";
        for(let personality of system.space.personalities){
            stringHTML+=`<option value=${personality.id}>${personality.name}</option>`;
        }
        this.personalitiesOptions = stringHTML;
    }

    afterRender(){
        if(this.generatedText!==undefined){
            let refreshButton=this.element.querySelector("#refresh-button");
            let copyButton=this.element.querySelector("#copy-button");
            try{
                refreshButton.style.display="block";
                copyButton.style.display="block";
            }catch(e){
                console.error("Error trying to change the display of the buttons"+e);
            }
        }
        let textElement = this.element.querySelector("#text");
        textElement.value = this.text;

        if(this.language){
            let languageElement = this.element.querySelector("#language");
            languageElement.value = this.language;
        }

        if(this.generatedText){
           let aiText = this.element.querySelector(".generated-text-container");
           aiText.style.display = "flex";
        }

        if(this.details){
            let details = this.element.querySelector("#details");
            details.value = this.details;
        }
    }

    async translate(formElement) {
        const formData= await system.UI.extractFormInformation(formElement);

        this.text = formData.data.text;
        this.language = formData.data.language;
        this.personality = system.space.getPersonality(formData.data.personality);
        this.details = formData.data.details;
        let flowId = system.space.getFlowIdByName("Translate");
        let context = {
            text: this.text,
            language: this.language,
            prompt: formData.data.details,
            maxTokens: ""
        }
        let result = await system.services.callFlow(flowId, context, formData.data.personality);
        this.generatedText = result ? JSON.stringify(result) : result;
        this.invalidate();

    }
    async regenerate(_target){
            if(this.text!==undefined){
                await this.translate(this.element.querySelector("form"));
            }
    }
    async copyText(_target){
        let text=system.UI.reverseQuerySelector(_target,".generated-text");
        if(text){
            await navigator.clipboard.writeText(text.innerText);
            text.insertAdjacentHTML("afterend", `<confirmation-popup data-presenter="confirmation-popup" 
                    data-message="Copied!" data-left="${text.offsetWidth+150}"></confirmation-popup>`);
        }
    }
}
