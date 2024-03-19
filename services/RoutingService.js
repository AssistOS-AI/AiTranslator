export class RoutingService {
    constructor() {
        this.appName = "AiTranslator";
    }
    async navigateToLocation(locationArray=[],appName) {

        const AITRANSLATOR_PAGE = "aitranslator-page";

       if (locationArray.length === 0 || locationArray[0] === AITRANSLATOR_PAGE) {
            const pageUrl = `${system.space.id}/${appName}/${AITRANSLATOR_PAGE}`;
            await system.UI.changeToDynamicPage(AITRANSLATOR_PAGE, pageUrl);
            return;
        }
         if(locationArray[locationArray.length-1]!== AITRANSLATOR_PAGE){
         console.error(`Invalid URL: URL must end with ${AITRANSLATOR_PAGE}`);
            return;
        }

        const webComponentName = locationArray[locationArray.length - 1];
        const pageUrl = `${system.space.id}/${appName}/${locationArray.join("/")}`;
        await system.UI.changeToDynamicPage(webComponentName, pageUrl);
    }
}
