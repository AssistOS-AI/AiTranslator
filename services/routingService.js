export class routingService {
    constructor() {
        this.appName = "AiTranslator";
    }
    async navigateToLocation(locationArray=[],appName) {

        const AITRANSLATOR_PAGE = "aitranslator-page";

        if(locationArray.length === 0){
            const pageUrl = `${webSkel.currentUser.space.id}/${appName}/${AITRANSLATOR_PAGE}`;
            await webSkel.changeToDynamicPage(AITRANSLATOR_PAGE, pageUrl);
            return;
        }

        if (locationArray[0] !== AITRANSLATOR_PAGE) {
            console.error("Invalid URL structure.");
            return;
        }

        const webComponentName = locationArray[locationArray.length - 1];
        const pageUrl = `${webSkel.currentUser.space.id}/${appName}/${locationArray.join("/")}`;
        await webSkel.changeToDynamicPage(webComponentName, pageUrl);
    }
}