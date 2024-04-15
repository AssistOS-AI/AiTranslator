export class RoutingService {
    constructor() {
        this.appName = "AiTranslator";
    }
    async navigateToLocation(locationArray=[],appName) {

        const AITRANSLATOR_PAGE = "aitranslator-page";

       if (locationArray.length === 0 || locationArray[0] === AITRANSLATOR_PAGE) {
            const pageUrl = `${assistOS.space.id}/${appName}/${AITRANSLATOR_PAGE}`;
            await assistOS.UI.changeToDynamicPage(AITRANSLATOR_PAGE, pageUrl);
            return;
        }
         if(locationArray[locationArray.length-1]!== AITRANSLATOR_PAGE){
         console.error(`Invalid URL: URL must end with ${AITRANSLATOR_PAGE}`);
            return;
        }

        const webComponentName = locationArray[locationArray.length - 1];
        const pageUrl = `${assistOS.space.id}/${appName}/${locationArray.join("/")}`;
        await assistOS.UI.changeToDynamicPage(webComponentName, pageUrl);
    }
}
