'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Neuro-stimulator client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutRoutingModule.html" data-type="entity-link" >AboutRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-de6d073092fbc2a8dac7ab5c4ba9da934b0575fcaa8a0533509114d0c3c0df8058d882d2edc252affb227d8fe1c9a518c9b776838f1fcdc92a451aaeb656b954"' : 'data-target="#xs-components-links-module-AppModule-de6d073092fbc2a8dac7ab5c4ba9da934b0575fcaa8a0533509114d0c3c0df8058d882d2edc252affb227d8fe1c9a518c9b776838f1fcdc92a451aaeb656b954"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-de6d073092fbc2a8dac7ab5c4ba9da934b0575fcaa8a0533509114d0c3c0df8058d882d2edc252affb227d8fe1c9a518c9b776838f1fcdc92a451aaeb656b954"' :
                                            'id="xs-components-links-module-AppModule-de6d073092fbc2a8dac7ab5c4ba9da934b0575fcaa8a0533509114d0c3c0df8058d882d2edc252affb227d8fe1c9a518c9b776838f1fcdc92a451aaeb656b954"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageNotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExperimentResultsRoutingModule.html" data-type="entity-link" >ExperimentResultsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ExperimentsRoutingModule.html" data-type="entity-link" >ExperimentsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HelpRoutingModule.html" data-type="entity-link" >HelpRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ParamConfigRoutingModule.html" data-type="entity-link" >ParamConfigRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PlayerRoutingModule.html" data-type="entity-link" >PlayerRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SequencesRoutingModule.html" data-type="entity-link" >SequencesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsRoutingModule.html" data-type="entity-link" >SettingsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ShareModule.html" data-type="entity-link" >ShareModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureAboutModule.html" data-type="entity-link" >StimFeatureAboutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureAboutModule-370ee37a16680ff67ad779bcf3c1cd905f2eb64ab4d87db0c4d31948fe32401a66ee43a99286318d0060cd4c10b904bec7947489591e865b2e28d37239daf77d"' : 'data-target="#xs-components-links-module-StimFeatureAboutModule-370ee37a16680ff67ad779bcf3c1cd905f2eb64ab4d87db0c4d31948fe32401a66ee43a99286318d0060cd4c10b904bec7947489591e865b2e28d37239daf77d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureAboutModule-370ee37a16680ff67ad779bcf3c1cd905f2eb64ab4d87db0c4d31948fe32401a66ee43a99286318d0060cd4c10b904bec7947489591e865b2e28d37239daf77d"' :
                                            'id="xs-components-links-module-StimFeatureAboutModule-370ee37a16680ff67ad779bcf3c1cd905f2eb64ab4d87db0c4d31948fe32401a66ee43a99286318d0060cd4c10b904bec7947489591e865b2e28d37239daf77d"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureAuthDomainModule.html" data-type="entity-link" >StimFeatureAuthDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StimFeatureAuthDomainModule-69f1815688326047bd99156584a46b07eb429a0e0b0e9f08ce589cbddd4d314c230665a60f056c18774d45b3fd6da1ff1fe229c1d966c70eda4b83171f8575d4"' : 'data-target="#xs-injectables-links-module-StimFeatureAuthDomainModule-69f1815688326047bd99156584a46b07eb429a0e0b0e9f08ce589cbddd4d314c230665a60f056c18774d45b3fd6da1ff1fe229c1d966c70eda4b83171f8575d4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StimFeatureAuthDomainModule-69f1815688326047bd99156584a46b07eb429a0e0b0e9f08ce589cbddd4d314c230665a60f056c18774d45b3fd6da1ff1fe229c1d966c70eda4b83171f8575d4"' :
                                        'id="xs-injectables-links-module-StimFeatureAuthDomainModule-69f1815688326047bd99156584a46b07eb429a0e0b0e9f08ce589cbddd4d314c230665a60f056c18774d45b3fd6da1ff1fe229c1d966c70eda4b83171f8575d4"' }>
                                        <li class="link">
                                            <a href="injectables/AuthFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureAuthFeatureModule.html" data-type="entity-link" >StimFeatureAuthFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureAuthFeatureModule-60dd0414d2dd6db926fe20d821bd4eeb5d4e39d0d9f21f1ac667e197f3ba73a9310ad5ff57bb901767b87cc76c45e407e2a19da20965d7324164192c2c76e34e"' : 'data-target="#xs-components-links-module-StimFeatureAuthFeatureModule-60dd0414d2dd6db926fe20d821bd4eeb5d4e39d0d9f21f1ac667e197f3ba73a9310ad5ff57bb901767b87cc76c45e407e2a19da20965d7324164192c2c76e34e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureAuthFeatureModule-60dd0414d2dd6db926fe20d821bd4eeb5d4e39d0d9f21f1ac667e197f3ba73a9310ad5ff57bb901767b87cc76c45e407e2a19da20965d7324164192c2c76e34e"' :
                                            'id="xs-components-links-module-StimFeatureAuthFeatureModule-60dd0414d2dd6db926fe20d821bd4eeb5d4e39d0d9f21f1ac667e197f3ba73a9310ad5ff57bb901767b87cc76c45e407e2a19da20965d7324164192c2c76e34e"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureAuthFeatureRoutingModule.html" data-type="entity-link" >StimFeatureAuthFeatureRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureExperimentResultsDomainModule.html" data-type="entity-link" >StimFeatureExperimentResultsDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StimFeatureExperimentResultsDomainModule-99e47ba7bb189c97401fbc82ea7ad39cb346baf6288698f508b400e477d6ee0d21fd7de5c7adade635655bf0e0ed75c3810242d18de780445bdb48d58a584a8f"' : 'data-target="#xs-injectables-links-module-StimFeatureExperimentResultsDomainModule-99e47ba7bb189c97401fbc82ea7ad39cb346baf6288698f508b400e477d6ee0d21fd7de5c7adade635655bf0e0ed75c3810242d18de780445bdb48d58a584a8f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StimFeatureExperimentResultsDomainModule-99e47ba7bb189c97401fbc82ea7ad39cb346baf6288698f508b400e477d6ee0d21fd7de5c7adade635655bf0e0ed75c3810242d18de780445bdb48d58a584a8f"' :
                                        'id="xs-injectables-links-module-StimFeatureExperimentResultsDomainModule-99e47ba7bb189c97401fbc82ea7ad39cb346baf6288698f508b400e477d6ee0d21fd7de5c7adade635655bf0e0ed75c3810242d18de780445bdb48d58a584a8f"' }>
                                        <li class="link">
                                            <a href="injectables/ExperimentResultsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentResultsFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureExperimentResultsFeatureModule.html" data-type="entity-link" >StimFeatureExperimentResultsFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureExperimentResultsFeatureModule-6685c9070d62c4c3f8570fadea4670dedee2006184b7ef75adcda3a035dab6490186850fa1eb5bbb2a40cb31993a0c5c7e9c3b2705d633fe99c143f1ab7f4868"' : 'data-target="#xs-components-links-module-StimFeatureExperimentResultsFeatureModule-6685c9070d62c4c3f8570fadea4670dedee2006184b7ef75adcda3a035dab6490186850fa1eb5bbb2a40cb31993a0c5c7e9c3b2705d633fe99c143f1ab7f4868"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureExperimentResultsFeatureModule-6685c9070d62c4c3f8570fadea4670dedee2006184b7ef75adcda3a035dab6490186850fa1eb5bbb2a40cb31993a0c5c7e9c3b2705d633fe99c143f1ab7f4868"' :
                                            'id="xs-components-links-module-StimFeatureExperimentResultsFeatureModule-6685c9070d62c4c3f8570fadea4670dedee2006184b7ef75adcda3a035dab6490186850fa1eb5bbb2a40cb31993a0c5c7e9c3b2705d633fe99c143f1ab7f4868"' }>
                                            <li class="link">
                                                <a href="components/ExperimentResultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentResultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentResultsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentResultsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentResultsFilterDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentResultsFilterDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentResultsGhostItemListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentResultsGhostItemListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentResultsItemListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentResultsItemListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureExperimentsDomainModule.html" data-type="entity-link" >StimFeatureExperimentsDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StimFeatureExperimentsDomainModule-a70534757241284ff120240ad709bd870e5f5c29f5c8d4f4b34eb4eb6681440135d7611b598e555572318927e6b3a52ee110479eb31241f8f49178d9327d7194"' : 'data-target="#xs-injectables-links-module-StimFeatureExperimentsDomainModule-a70534757241284ff120240ad709bd870e5f5c29f5c8d4f4b34eb4eb6681440135d7611b598e555572318927e6b3a52ee110479eb31241f8f49178d9327d7194"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StimFeatureExperimentsDomainModule-a70534757241284ff120240ad709bd870e5f5c29f5c8d4f4b34eb4eb6681440135d7611b598e555572318927e6b3a52ee110479eb31241f8f49178d9327d7194"' :
                                        'id="xs-injectables-links-module-StimFeatureExperimentsDomainModule-a70534757241284ff120240ad709bd870e5f5c29f5c8d4f4b34eb4eb6681440135d7611b598e555572318927e6b3a52ee110479eb31241f8f49178d9327d7194"' }>
                                        <li class="link">
                                            <a href="injectables/ExperimentsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentsFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureExperimentsFeatureModule.html" data-type="entity-link" >StimFeatureExperimentsFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' : 'data-target="#xs-components-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' :
                                            'id="xs-components-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' }>
                                            <li class="link">
                                                <a href="components/ExperimentTypeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeCvepComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeCvepComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeCvepOutputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeCvepOutputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeErpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeErpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeErpOutputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeErpOutputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeFvepComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeFvepComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeFvepOutputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeFvepOutputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeNoneComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeNoneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeReaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeReaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeReaOutputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeReaOutputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeTvepComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeTvepComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentTypeTvepOutputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeTvepOutputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentsFilterDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentsFilterDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentsGhostItemListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentsGhostItemListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentsItemListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentsItemListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentsPageToolsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentsPageToolsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OutputEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OutputEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OutputPatternComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OutputPatternComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OutputTypeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OutputTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SequenceFastDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SequenceFastDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' : 'data-target="#xs-directives-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' :
                                        'id="xs-directives-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' }>
                                        <li class="link">
                                            <a href="directives/ExperimentTypeResolverDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeResolverDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' : 'data-target="#xs-pipes-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' :
                                            'id="xs-pipes-links-module-StimFeatureExperimentsFeatureModule-ccb446a16a1ae5a37ba834df7dbd6205328f2bbb27a5d6fc6947413a34598044bafe557fcad95c22a130d4ba4837d3d1a3770a254a6b2b6d5a2b23a4181252c5"' }>
                                            <li class="link">
                                                <a href="pipes/ExperimentTypeCvepOutputCountPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeCvepOutputCountPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ExperimentTypeErpOutputCountPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeErpOutputCountPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ExperimentTypeErpOutputDependencyPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeErpOutputDependencyPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ExperimentTypeFvepOutputCountPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeFvepOutputCountPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ExperimentTypeReaOutputCountPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeReaOutputCountPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ExperimentTypeTvepOutputCountPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentTypeTvepOutputCountPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureFileBrowserDomainModule.html" data-type="entity-link" >StimFeatureFileBrowserDomainModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureFileBrowserFeatureModule.html" data-type="entity-link" >StimFeatureFileBrowserFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureFileBrowserFeatureModule-52c72d143b5356b378f1b0db6a222b7070fb471a93f47d0782099d804f395388b7393b8beea28e3070c1844c8995179fe011279a8e47b6af70db65c8b2f5b26e"' : 'data-target="#xs-components-links-module-StimFeatureFileBrowserFeatureModule-52c72d143b5356b378f1b0db6a222b7070fb471a93f47d0782099d804f395388b7393b8beea28e3070c1844c8995179fe011279a8e47b6af70db65c8b2f5b26e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureFileBrowserFeatureModule-52c72d143b5356b378f1b0db6a222b7070fb471a93f47d0782099d804f395388b7393b8beea28e3070c1844c8995179fe011279a8e47b6af70db65c8b2f5b26e"' :
                                            'id="xs-components-links-module-StimFeatureFileBrowserFeatureModule-52c72d143b5356b378f1b0db6a222b7070fb471a93f47d0782099d804f395388b7393b8beea28e3070c1844c8995179fe011279a8e47b6af70db65c8b2f5b26e"' }>
                                            <li class="link">
                                                <a href="components/FileBrowserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileBrowserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureHelpFeatureModule.html" data-type="entity-link" >StimFeatureHelpFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureHelpFeatureModule-7204b97d263a68b11df850a95dd84a16e31994292f9c914b2ee85b685a594add60a09748e312c345290d1b0ace69a99af5f0aa4c402dd0bffe859568587144c5"' : 'data-target="#xs-components-links-module-StimFeatureHelpFeatureModule-7204b97d263a68b11df850a95dd84a16e31994292f9c914b2ee85b685a594add60a09748e312c345290d1b0ace69a99af5f0aa4c402dd0bffe859568587144c5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureHelpFeatureModule-7204b97d263a68b11df850a95dd84a16e31994292f9c914b2ee85b685a594add60a09748e312c345290d1b0ace69a99af5f0aa4c402dd0bffe859568587144c5"' :
                                            'id="xs-components-links-module-StimFeatureHelpFeatureModule-7204b97d263a68b11df850a95dd84a16e31994292f9c914b2ee85b685a594add60a09748e312c345290d1b0ace69a99af5f0aa4c402dd0bffe859568587144c5"' }>
                                            <li class="link">
                                                <a href="components/HelpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureNavigationDomainModule.html" data-type="entity-link" >StimFeatureNavigationDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StimFeatureNavigationDomainModule-566f979c6ea792277968176049390eb414c8f3f1502be294c10b40d5db9fe395f982af79156686494afbc078f349f17a91b63dc7af2b1707e4bfbac3e870a636"' : 'data-target="#xs-injectables-links-module-StimFeatureNavigationDomainModule-566f979c6ea792277968176049390eb414c8f3f1502be294c10b40d5db9fe395f982af79156686494afbc078f349f17a91b63dc7af2b1707e4bfbac3e870a636"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StimFeatureNavigationDomainModule-566f979c6ea792277968176049390eb414c8f3f1502be294c10b40d5db9fe395f982af79156686494afbc078f349f17a91b63dc7af2b1707e4bfbac3e870a636"' :
                                        'id="xs-injectables-links-module-StimFeatureNavigationDomainModule-566f979c6ea792277968176049390eb414c8f3f1502be294c10b40d5db9fe395f982af79156686494afbc078f349f17a91b63dc7af2b1707e4bfbac3e870a636"' }>
                                        <li class="link">
                                            <a href="injectables/ComponentStoreService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComponentStoreService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NavigationFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureNavigationFeatureModule.html" data-type="entity-link" >StimFeatureNavigationFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureNavigationFeatureModule-279c4815d4e6a03cf9faf388573bda5e323db4eeb2b69c655e18862b06ae29181596aff894200da367db3aa950000fa64dc1202a77fa6f668b47c4465ecd905c"' : 'data-target="#xs-components-links-module-StimFeatureNavigationFeatureModule-279c4815d4e6a03cf9faf388573bda5e323db4eeb2b69c655e18862b06ae29181596aff894200da367db3aa950000fa64dc1202a77fa6f668b47c4465ecd905c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureNavigationFeatureModule-279c4815d4e6a03cf9faf388573bda5e323db4eeb2b69c655e18862b06ae29181596aff894200da367db3aa950000fa64dc1202a77fa6f668b47c4465ecd905c"' :
                                            'id="xs-components-links-module-StimFeatureNavigationFeatureModule-279c4815d4e6a03cf9faf388573bda5e323db4eeb2b69c655e18862b06ae29181596aff894200da367db3aa950000fa64dc1202a77fa6f668b47c4465ecd905c"' }>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-StimFeatureNavigationFeatureModule-279c4815d4e6a03cf9faf388573bda5e323db4eeb2b69c655e18862b06ae29181596aff894200da367db3aa950000fa64dc1202a77fa6f668b47c4465ecd905c"' : 'data-target="#xs-directives-links-module-StimFeatureNavigationFeatureModule-279c4815d4e6a03cf9faf388573bda5e323db4eeb2b69c655e18862b06ae29181596aff894200da367db3aa950000fa64dc1202a77fa6f668b47c4465ecd905c"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-StimFeatureNavigationFeatureModule-279c4815d4e6a03cf9faf388573bda5e323db4eeb2b69c655e18862b06ae29181596aff894200da367db3aa950000fa64dc1202a77fa6f668b47c4465ecd905c"' :
                                        'id="xs-directives-links-module-StimFeatureNavigationFeatureModule-279c4815d4e6a03cf9faf388573bda5e323db4eeb2b69c655e18862b06ae29181596aff894200da367db3aa950000fa64dc1202a77fa6f668b47c4465ecd905c"' }>
                                        <li class="link">
                                            <a href="directives/NavigationButtonsAddonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonsAddonDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeaturePlayerDomainModule.html" data-type="entity-link" >StimFeaturePlayerDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StimFeaturePlayerDomainModule-4a15aa6ee42471f02d119a1d2fbd7ca6fbd1932fe8ad78395d134cc444612fb12b98e693b77833d2e27153d05139ffd9a33d95c699d636b95b6ce55efc1385d6"' : 'data-target="#xs-injectables-links-module-StimFeaturePlayerDomainModule-4a15aa6ee42471f02d119a1d2fbd7ca6fbd1932fe8ad78395d134cc444612fb12b98e693b77833d2e27153d05139ffd9a33d95c699d636b95b6ce55efc1385d6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StimFeaturePlayerDomainModule-4a15aa6ee42471f02d119a1d2fbd7ca6fbd1932fe8ad78395d134cc444612fb12b98e693b77833d2e27153d05139ffd9a33d95c699d636b95b6ce55efc1385d6"' :
                                        'id="xs-injectables-links-module-StimFeaturePlayerDomainModule-4a15aa6ee42471f02d119a1d2fbd7ca6fbd1932fe8ad78395d134cc444612fb12b98e693b77833d2e27153d05139ffd9a33d95c699d636b95b6ce55efc1385d6"' }>
                                        <li class="link">
                                            <a href="injectables/PlayerFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayerFacade</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PlayerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeaturePlayerFeatureModule.html" data-type="entity-link" >StimFeaturePlayerFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeaturePlayerFeatureModule-24dd7b6efe541716e63b6088d38dc1d8e5d9517de754368140cf575dd7bfa5e9e0d3f1c2e3e9ea4b51a7331b00fd1a43df2b42ccfe397fe3c67a1b4550535fad"' : 'data-target="#xs-components-links-module-StimFeaturePlayerFeatureModule-24dd7b6efe541716e63b6088d38dc1d8e5d9517de754368140cf575dd7bfa5e9e0d3f1c2e3e9ea4b51a7331b00fd1a43df2b42ccfe397fe3c67a1b4550535fad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeaturePlayerFeatureModule-24dd7b6efe541716e63b6088d38dc1d8e5d9517de754368140cf575dd7bfa5e9e0d3f1c2e3e9ea4b51a7331b00fd1a43df2b42ccfe397fe3c67a1b4550535fad"' :
                                            'id="xs-components-links-module-StimFeaturePlayerFeatureModule-24dd7b6efe541716e63b6088d38dc1d8e5d9517de754368140cf575dd7bfa5e9e0d3f1c2e3e9ea4b51a7331b00fd1a43df2b42ccfe397fe3c67a1b4550535fad"' }>
                                            <li class="link">
                                                <a href="components/CountingCycleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CountingCycleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CountingExperimentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CountingExperimentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoConditionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoConditionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayerPageToolsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayerPageToolsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StopConditionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopConditionsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-StimFeaturePlayerFeatureModule-24dd7b6efe541716e63b6088d38dc1d8e5d9517de754368140cf575dd7bfa5e9e0d3f1c2e3e9ea4b51a7331b00fd1a43df2b42ccfe397fe3c67a1b4550535fad"' : 'data-target="#xs-directives-links-module-StimFeaturePlayerFeatureModule-24dd7b6efe541716e63b6088d38dc1d8e5d9517de754368140cf575dd7bfa5e9e0d3f1c2e3e9ea4b51a7331b00fd1a43df2b42ccfe397fe3c67a1b4550535fad"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-StimFeaturePlayerFeatureModule-24dd7b6efe541716e63b6088d38dc1d8e5d9517de754368140cf575dd7bfa5e9e0d3f1c2e3e9ea4b51a7331b00fd1a43df2b42ccfe397fe3c67a1b4550535fad"' :
                                        'id="xs-directives-links-module-StimFeaturePlayerFeatureModule-24dd7b6efe541716e63b6088d38dc1d8e5d9517de754368140cf575dd7bfa5e9e0d3f1c2e3e9ea4b51a7331b00fd1a43df2b42ccfe397fe3c67a1b4550535fad"' }>
                                        <li class="link">
                                            <a href="directives/PlayerExperimentTypeResolverDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayerExperimentTypeResolverDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/StopConditionDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopConditionDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureSequencesDomainModule.html" data-type="entity-link" >StimFeatureSequencesDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StimFeatureSequencesDomainModule-b30d71558b987f9ab1e86fdcfe0afe71dee6221ba4a66713918071bf9b03a7f4138c80b0f2ec42798270e6f133240e5a7c48a897a7a2a01375a83520957ab67e"' : 'data-target="#xs-injectables-links-module-StimFeatureSequencesDomainModule-b30d71558b987f9ab1e86fdcfe0afe71dee6221ba4a66713918071bf9b03a7f4138c80b0f2ec42798270e6f133240e5a7c48a897a7a2a01375a83520957ab67e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StimFeatureSequencesDomainModule-b30d71558b987f9ab1e86fdcfe0afe71dee6221ba4a66713918071bf9b03a7f4138c80b0f2ec42798270e6f133240e5a7c48a897a7a2a01375a83520957ab67e"' :
                                        'id="xs-injectables-links-module-StimFeatureSequencesDomainModule-b30d71558b987f9ab1e86fdcfe0afe71dee6221ba4a66713918071bf9b03a7f4138c80b0f2ec42798270e6f133240e5a7c48a897a7a2a01375a83520957ab67e"' }>
                                        <li class="link">
                                            <a href="injectables/SequencesFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SequencesFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureSequencesFeatureModule.html" data-type="entity-link" >StimFeatureSequencesFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureSequencesFeatureModule-c17c3d9c94e715dce11a48b290163b5569de4e3cd207e71d4a7dd1c930935085b1f3aa4321bac4fde684ac2f7c305b2c24aebc61a8b02817676df6647154d183"' : 'data-target="#xs-components-links-module-StimFeatureSequencesFeatureModule-c17c3d9c94e715dce11a48b290163b5569de4e3cd207e71d4a7dd1c930935085b1f3aa4321bac4fde684ac2f7c305b2c24aebc61a8b02817676df6647154d183"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureSequencesFeatureModule-c17c3d9c94e715dce11a48b290163b5569de4e3cd207e71d4a7dd1c930935085b1f3aa4321bac4fde684ac2f7c305b2c24aebc61a8b02817676df6647154d183"' :
                                            'id="xs-components-links-module-StimFeatureSequencesFeatureModule-c17c3d9c94e715dce11a48b290163b5569de4e3cd207e71d4a7dd1c930935085b1f3aa4321bac4fde684ac2f7c305b2c24aebc61a8b02817676df6647154d183"' }>
                                            <li class="link">
                                                <a href="components/SequenceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SequenceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SequencesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SequencesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SequencesFilterDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SequencesFilterDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SequencesGhostItemListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SequencesGhostItemListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SequencesItemListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SequencesItemListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureSettingsDomainModule.html" data-type="entity-link" >StimFeatureSettingsDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StimFeatureSettingsDomainModule-526da8cf9c61847402b785e3cbe26a2f03ce0ca9c672c68fe957406c861b3fd05d71637fcc50ed7b10158896d79e2de61befec0eaf16567feada866b1cac56f1"' : 'data-target="#xs-injectables-links-module-StimFeatureSettingsDomainModule-526da8cf9c61847402b785e3cbe26a2f03ce0ca9c672c68fe957406c861b3fd05d71637fcc50ed7b10158896d79e2de61befec0eaf16567feada866b1cac56f1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StimFeatureSettingsDomainModule-526da8cf9c61847402b785e3cbe26a2f03ce0ca9c672c68fe957406c861b3fd05d71637fcc50ed7b10158896d79e2de61befec0eaf16567feada866b1cac56f1"' :
                                        'id="xs-injectables-links-module-StimFeatureSettingsDomainModule-526da8cf9c61847402b785e3cbe26a2f03ce0ca9c672c68fe957406c861b3fd05d71637fcc50ed7b10158896d79e2de61befec0eaf16567feada866b1cac56f1"' }>
                                        <li class="link">
                                            <a href="injectables/SettingsFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureSettingsFeatureModule.html" data-type="entity-link" >StimFeatureSettingsFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureSettingsFeatureModule-b55f2b57ed0fd773523229f739474b21179324392494bb700b4135768545ca10832bb5085534a95ba3e2de61ac059bcb04311812b1ecd354d1e597c4757ef54d"' : 'data-target="#xs-components-links-module-StimFeatureSettingsFeatureModule-b55f2b57ed0fd773523229f739474b21179324392494bb700b4135768545ca10832bb5085534a95ba3e2de61ac059bcb04311812b1ecd354d1e597c4757ef54d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureSettingsFeatureModule-b55f2b57ed0fd773523229f739474b21179324392494bb700b4135768545ca10832bb5085534a95ba3e2de61ac059bcb04311812b1ecd354d1e597c4757ef54d"' :
                                            'id="xs-components-links-module-StimFeatureSettingsFeatureModule-b55f2b57ed0fd773523229f739474b21179324392494bb700b4135768545ca10832bb5085534a95ba3e2de61ac059bcb04311812b1ecd354d1e597c4757ef54d"' }>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureSettingsFeatureParamConfigApplicationModule.html" data-type="entity-link" >StimFeatureSettingsFeatureParamConfigApplicationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureSettingsFeatureParamConfigApplicationModule-89c784620d08ade1581b5be54208cc3602f2207a03c9cf39734be95047044b5da5c0e8a6612e8fbd5e9ed35e35f5de21e4f5ee625c99ca1c46bcbdecccc05cd3"' : 'data-target="#xs-components-links-module-StimFeatureSettingsFeatureParamConfigApplicationModule-89c784620d08ade1581b5be54208cc3602f2207a03c9cf39734be95047044b5da5c0e8a6612e8fbd5e9ed35e35f5de21e4f5ee625c99ca1c46bcbdecccc05cd3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureSettingsFeatureParamConfigApplicationModule-89c784620d08ade1581b5be54208cc3602f2207a03c9cf39734be95047044b5da5c0e8a6612e8fbd5e9ed35e35f5de21e4f5ee625c99ca1c46bcbdecccc05cd3"' :
                                            'id="xs-components-links-module-StimFeatureSettingsFeatureParamConfigApplicationModule-89c784620d08ade1581b5be54208cc3602f2207a03c9cf39734be95047044b5da5c0e8a6612e8fbd5e9ed35e35f5de21e4f5ee625c99ca1c46bcbdecccc05cd3"' }>
                                            <li class="link">
                                                <a href="components/ParamConfigApplicationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParamConfigApplicationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureSettingsFeatureParamConfigExperimentsModule.html" data-type="entity-link" >StimFeatureSettingsFeatureParamConfigExperimentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureSettingsFeatureParamConfigExperimentsModule-3045b24c14142669c79f4a453207748478c157e373ff8373411716ed7bb1128678a3290dad8244ecad5c2be92e047b98c4a5f23ad4c619fb4a7b84728c34e71b"' : 'data-target="#xs-components-links-module-StimFeatureSettingsFeatureParamConfigExperimentsModule-3045b24c14142669c79f4a453207748478c157e373ff8373411716ed7bb1128678a3290dad8244ecad5c2be92e047b98c4a5f23ad4c619fb4a7b84728c34e71b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureSettingsFeatureParamConfigExperimentsModule-3045b24c14142669c79f4a453207748478c157e373ff8373411716ed7bb1128678a3290dad8244ecad5c2be92e047b98c4a5f23ad4c619fb4a7b84728c34e71b"' :
                                            'id="xs-components-links-module-StimFeatureSettingsFeatureParamConfigExperimentsModule-3045b24c14142669c79f4a453207748478c157e373ff8373411716ed7bb1128678a3290dad8244ecad5c2be92e047b98c4a5f23ad4c619fb4a7b84728c34e71b"' }>
                                            <li class="link">
                                                <a href="components/ParamConfigExperimentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParamConfigExperimentsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureSettingsFeatureParamConfigModule.html" data-type="entity-link" >StimFeatureSettingsFeatureParamConfigModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureSettingsFeatureParamConfigModule-9b1ce779fa30751532732e0e0b60c3e10c9de89e633049a3d2084e94ec197ecae0aea024ed9e71c20340b9d95d8c7dd44d76565416bf55f121c17c1479ef0ba0"' : 'data-target="#xs-components-links-module-StimFeatureSettingsFeatureParamConfigModule-9b1ce779fa30751532732e0e0b60c3e10c9de89e633049a3d2084e94ec197ecae0aea024ed9e71c20340b9d95d8c7dd44d76565416bf55f121c17c1479ef0ba0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureSettingsFeatureParamConfigModule-9b1ce779fa30751532732e0e0b60c3e10c9de89e633049a3d2084e94ec197ecae0aea024ed9e71c20340b9d95d8c7dd44d76565416bf55f121c17c1479ef0ba0"' :
                                            'id="xs-components-links-module-StimFeatureSettingsFeatureParamConfigModule-9b1ce779fa30751532732e0e0b60c3e10c9de89e633049a3d2084e94ec197ecae0aea024ed9e71c20340b9d95d8c7dd44d76565416bf55f121c17c1479ef0ba0"' }>
                                            <li class="link">
                                                <a href="components/ParamConfigComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParamConfigComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureSettingsFeatureParamConfigServerModule.html" data-type="entity-link" >StimFeatureSettingsFeatureParamConfigServerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureSettingsFeatureParamConfigServerModule-6d30ac1597509c22dd6f83bcf0c234b3561a83142557f2f7837dce4fbf9df43e799c1f7cd4e1986c054488bac5c0ce190a8a22f51c7bdbd273a52dfc4585044f"' : 'data-target="#xs-components-links-module-StimFeatureSettingsFeatureParamConfigServerModule-6d30ac1597509c22dd6f83bcf0c234b3561a83142557f2f7837dce4fbf9df43e799c1f7cd4e1986c054488bac5c0ce190a8a22f51c7bdbd273a52dfc4585044f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureSettingsFeatureParamConfigServerModule-6d30ac1597509c22dd6f83bcf0c234b3561a83142557f2f7837dce4fbf9df43e799c1f7cd4e1986c054488bac5c0ce190a8a22f51c7bdbd273a52dfc4585044f"' :
                                            'id="xs-components-links-module-StimFeatureSettingsFeatureParamConfigServerModule-6d30ac1597509c22dd6f83bcf0c234b3561a83142557f2f7837dce4fbf9df43e799c1f7cd4e1986c054488bac5c0ce190a8a22f51c7bdbd273a52dfc4585044f"' }>
                                            <li class="link">
                                                <a href="components/ParamConfigServerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParamConfigServerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureSettingsFeatureServiceStateModule.html" data-type="entity-link" >StimFeatureSettingsFeatureServiceStateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureSettingsFeatureServiceStateModule-680ca468b8bdc57307f71b8056cd8c3c65ab8f057d58a3a687aa70bfbfa40f05f66b31b22267157e18acd74dfca4145921c4dba0e1ddb37398957c9a978b9394"' : 'data-target="#xs-components-links-module-StimFeatureSettingsFeatureServiceStateModule-680ca468b8bdc57307f71b8056cd8c3c65ab8f057d58a3a687aa70bfbfa40f05f66b31b22267157e18acd74dfca4145921c4dba0e1ddb37398957c9a978b9394"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureSettingsFeatureServiceStateModule-680ca468b8bdc57307f71b8056cd8c3c65ab8f057d58a3a687aa70bfbfa40f05f66b31b22267157e18acd74dfca4145921c4dba0e1ddb37398957c9a978b9394"' :
                                            'id="xs-components-links-module-StimFeatureSettingsFeatureServiceStateModule-680ca468b8bdc57307f71b8056cd8c3c65ab8f057d58a3a687aa70bfbfa40f05f66b31b22267157e18acd74dfca4145921c4dba0e1ddb37398957c9a978b9394"' }>
                                            <li class="link">
                                                <a href="components/ServiceStateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceStateComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureSettingsPopupModule.html" data-type="entity-link" >StimFeatureSettingsPopupModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureStimulatorDomainModule.html" data-type="entity-link" >StimFeatureStimulatorDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StimFeatureStimulatorDomainModule-a15b68aa733fc2186cde361d7cb80922b4dfac750957509833c7f6d29d345db663e9811a54803e1253762efc2d1bb132d87dc707d1273265b9242cde7b38bf7b"' : 'data-target="#xs-injectables-links-module-StimFeatureStimulatorDomainModule-a15b68aa733fc2186cde361d7cb80922b4dfac750957509833c7f6d29d345db663e9811a54803e1253762efc2d1bb132d87dc707d1273265b9242cde7b38bf7b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StimFeatureStimulatorDomainModule-a15b68aa733fc2186cde361d7cb80922b4dfac750957509833c7f6d29d345db663e9811a54803e1253762efc2d1bb132d87dc707d1273265b9242cde7b38bf7b"' :
                                        'id="xs-injectables-links-module-StimFeatureStimulatorDomainModule-a15b68aa733fc2186cde361d7cb80922b4dfac750957509833c7f6d29d345db663e9811a54803e1253762efc2d1bb132d87dc707d1273265b9242cde7b38bf7b"' }>
                                        <li class="link">
                                            <a href="injectables/StimulatorFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StimulatorFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureStimulatorFeatureModule.html" data-type="entity-link" >StimFeatureStimulatorFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureStimulatorFeatureModule-a043bcebca647780bcc1d06d0aa21bd73cf9d2b55be8ad5d30e3d29405b94b75733d2244423b6c3d4c37b75a820acd4eb6f9835e2139654bc7060655bd2f8885"' : 'data-target="#xs-components-links-module-StimFeatureStimulatorFeatureModule-a043bcebca647780bcc1d06d0aa21bd73cf9d2b55be8ad5d30e3d29405b94b75733d2244423b6c3d4c37b75a820acd4eb6f9835e2139654bc7060655bd2f8885"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureStimulatorFeatureModule-a043bcebca647780bcc1d06d0aa21bd73cf9d2b55be8ad5d30e3d29405b94b75733d2244423b6c3d4c37b75a820acd4eb6f9835e2139654bc7060655bd2f8885"' :
                                            'id="xs-components-links-module-StimFeatureStimulatorFeatureModule-a043bcebca647780bcc1d06d0aa21bd73cf9d2b55be8ad5d30e3d29405b94b75733d2244423b6c3d4c37b75a820acd4eb6f9835e2139654bc7060655bd2f8885"' }>
                                            <li class="link">
                                                <a href="components/CalibrationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalibrationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StimulatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StimulatorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureUsersDomainModule.html" data-type="entity-link" >StimFeatureUsersDomainModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureUsersFeatureModule.html" data-type="entity-link" >StimFeatureUsersFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimFeatureUsersFeatureModule-b38b0eea22a3d15e5313f66bf2830417071903423f8239efbd31e3ac38231a811c15bffb71ec2558d9bff5b2cc48a875cc12b0923553bf5957ab961ca53544a8"' : 'data-target="#xs-components-links-module-StimFeatureUsersFeatureModule-b38b0eea22a3d15e5313f66bf2830417071903423f8239efbd31e3ac38231a811c15bffb71ec2558d9bff5b2cc48a875cc12b0923553bf5957ab961ca53544a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimFeatureUsersFeatureModule-b38b0eea22a3d15e5313f66bf2830417071903423f8239efbd31e3ac38231a811c15bffb71ec2558d9bff5b2cc48a875cc12b0923553bf5957ab961ca53544a8"' :
                                            'id="xs-components-links-module-StimFeatureUsersFeatureModule-b38b0eea22a3d15e5313f66bf2830417071903423f8239efbd31e3ac38231a811c15bffb71ec2558d9bff5b2cc48a875cc12b0923553bf5957ab961ca53544a8"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimFeatureUsersFeatureRoutingModule.html" data-type="entity-link" >StimFeatureUsersFeatureRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StimLibAssetPlayerModule.html" data-type="entity-link" >StimLibAssetPlayerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StimLibAssetPlayerModule-62b3ece104f558470feb9e9225cdc2703e9a1527c31d6f77f907ea9d4414109c66b36bcb30c22ede4f01f27ec9c3c4d9b560e5a74f5fbc96839e215efa2a9eb2"' : 'data-target="#xs-injectables-links-module-StimLibAssetPlayerModule-62b3ece104f558470feb9e9225cdc2703e9a1527c31d6f77f907ea9d4414109c66b36bcb30c22ede4f01f27ec9c3c4d9b560e5a74f5fbc96839e215efa2a9eb2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StimLibAssetPlayerModule-62b3ece104f558470feb9e9225cdc2703e9a1527c31d6f77f907ea9d4414109c66b36bcb30c22ede4f01f27ec9c3c4d9b560e5a74f5fbc96839e215efa2a9eb2"' :
                                        'id="xs-injectables-links-module-StimLibAssetPlayerModule-62b3ece104f558470feb9e9225cdc2703e9a1527c31d6f77f907ea9d4414109c66b36bcb30c22ede4f01f27ec9c3c4d9b560e5a74f5fbc96839e215efa2a9eb2"' }>
                                        <li class="link">
                                            <a href="injectables/AssetPlayerFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssetPlayerFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimLibCommonModule.html" data-type="entity-link" >StimLibCommonModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StimLibConnectionModule.html" data-type="entity-link" >StimLibConnectionModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StimLibConsoleDomainModule.html" data-type="entity-link" >StimLibConsoleDomainModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StimLibConsoleDomainModule-c38478a390d71b10401fbc130b1ab76cc508d19bfdeb79c6f0cdc800fc0f8342a29e23f0dc6001603bd17257b985dd560c6f3f7dfb629714c8500c80a38cac51"' : 'data-target="#xs-injectables-links-module-StimLibConsoleDomainModule-c38478a390d71b10401fbc130b1ab76cc508d19bfdeb79c6f0cdc800fc0f8342a29e23f0dc6001603bd17257b985dd560c6f3f7dfb629714c8500c80a38cac51"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StimLibConsoleDomainModule-c38478a390d71b10401fbc130b1ab76cc508d19bfdeb79c6f0cdc800fc0f8342a29e23f0dc6001603bd17257b985dd560c6f3f7dfb629714c8500c80a38cac51"' :
                                        'id="xs-injectables-links-module-StimLibConsoleDomainModule-c38478a390d71b10401fbc130b1ab76cc508d19bfdeb79c6f0cdc800fc0f8342a29e23f0dc6001603bd17257b985dd560c6f3f7dfb629714c8500c80a38cac51"' }>
                                        <li class="link">
                                            <a href="injectables/HelpLocalCommandHandler.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpLocalCommandHandler</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimLibConsoleFeatureModule.html" data-type="entity-link" >StimLibConsoleFeatureModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimLibConsoleFeatureModule-34f1648e2bd7f6f122c64bbe135b96847efee907e19648c1516d69db9c9583e0893d147e2bac76aca47f7de97ce8bb46b351359f23376e103d12fd0017175104"' : 'data-target="#xs-components-links-module-StimLibConsoleFeatureModule-34f1648e2bd7f6f122c64bbe135b96847efee907e19648c1516d69db9c9583e0893d147e2bac76aca47f7de97ce8bb46b351359f23376e103d12fd0017175104"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimLibConsoleFeatureModule-34f1648e2bd7f6f122c64bbe135b96847efee907e19648c1516d69db9c9583e0893d147e2bac76aca47f7de97ce8bb46b351359f23376e103d12fd0017175104"' :
                                            'id="xs-components-links-module-StimLibConsoleFeatureModule-34f1648e2bd7f6f122c64bbe135b96847efee907e19648c1516d69db9c9583e0893d147e2bac76aca47f7de97ce8bb46b351359f23376e103d12fd0017175104"' }>
                                            <li class="link">
                                                <a href="components/ConsoleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConsoleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimLibFabModule.html" data-type="entity-link" >StimLibFabModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimLibFabModule-7bfe16f188f6508c82b71a0dbb1dfcaf59c0b2681f245dcf7329480b9ef503e5d4341983910655283ba83759f36def61391e1e276b061708312d9ae38d2e0bd4"' : 'data-target="#xs-components-links-module-StimLibFabModule-7bfe16f188f6508c82b71a0dbb1dfcaf59c0b2681f245dcf7329480b9ef503e5d4341983910655283ba83759f36def61391e1e276b061708312d9ae38d2e0bd4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimLibFabModule-7bfe16f188f6508c82b71a0dbb1dfcaf59c0b2681f245dcf7329480b9ef503e5d4341983910655283ba83759f36def61391e1e276b061708312d9ae38d2e0bd4"' :
                                            'id="xs-components-links-module-StimLibFabModule-7bfe16f188f6508c82b71a0dbb1dfcaf59c0b2681f245dcf7329480b9ef503e5d4341983910655283ba83759f36def61391e1e276b061708312d9ae38d2e0bd4"' }>
                                            <li class="link">
                                                <a href="components/FabComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FabComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimLibListUtilsModule.html" data-type="entity-link" >StimLibListUtilsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StimLibModalModule.html" data-type="entity-link" >StimLibModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimLibModalModule-b16cb6e620d3bdad52d77af12ab26e26366c31df34171b5ee28a3ef207cf4260ca8f1383b56aab35c21c308c4570af57eb066a5327311448b37f59645a94bf9e"' : 'data-target="#xs-components-links-module-StimLibModalModule-b16cb6e620d3bdad52d77af12ab26e26366c31df34171b5ee28a3ef207cf4260ca8f1383b56aab35c21c308c4570af57eb066a5327311448b37f59645a94bf9e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimLibModalModule-b16cb6e620d3bdad52d77af12ab26e26366c31df34171b5ee28a3ef207cf4260ca8f1383b56aab35c21c308c4570af57eb066a5327311448b37f59645a94bf9e"' :
                                            'id="xs-components-links-module-StimLibModalModule-b16cb6e620d3bdad52d77af12ab26e26366c31df34171b5ee28a3ef207cf4260ca8f1383b56aab35c21c308c4570af57eb066a5327311448b37f59645a94bf9e"' }>
                                            <li class="link">
                                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InformDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InformDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-StimLibModalModule-b16cb6e620d3bdad52d77af12ab26e26366c31df34171b5ee28a3ef207cf4260ca8f1383b56aab35c21c308c4570af57eb066a5327311448b37f59645a94bf9e"' : 'data-target="#xs-directives-links-module-StimLibModalModule-b16cb6e620d3bdad52d77af12ab26e26366c31df34171b5ee28a3ef207cf4260ca8f1383b56aab35c21c308c4570af57eb066a5327311448b37f59645a94bf9e"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-StimLibModalModule-b16cb6e620d3bdad52d77af12ab26e26366c31df34171b5ee28a3ef207cf4260ca8f1383b56aab35c21c308c4570af57eb066a5327311448b37f59645a94bf9e"' :
                                        'id="xs-directives-links-module-StimLibModalModule-b16cb6e620d3bdad52d77af12ab26e26366c31df34171b5ee28a3ef207cf4260ca8f1383b56aab35c21c308c4570af57eb066a5327311448b37f59645a94bf9e"' }>
                                        <li class="link">
                                            <a href="directives/DialogChildsDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogChildsDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimLibStoreModule.html" data-type="entity-link" >StimLibStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StimLibUiModule.html" data-type="entity-link" >StimLibUiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' : 'data-target="#xs-components-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' :
                                            'id="xs-components-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' }>
                                            <li class="link">
                                                <a href="components/AudioPlayerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AudioPlayerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiodeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropdownBtnComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownBtnComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ExperimentViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperimentViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ImagePlayerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImagePlayerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListButtonsAddonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListButtonsAddonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageToolsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageToolsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SequenceViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SequenceViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TagEditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagEditorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' : 'data-target="#xs-directives-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' :
                                        'id="xs-directives-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' }>
                                        <li class="link">
                                            <a href="directives/ContentTogglerDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentTogglerDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' : 'data-target="#xs-pipes-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' :
                                            'id="xs-pipes-links-module-StimLibUiModule-ed97b76841f14a00294d2d98e8c12c1d4889ea3bf714b39eff0ea0556e26de14f09cc43c9f3ea845370ed35a052edb7f095d570e2eefd5ef81b91499c0d7dde8"' }>
                                            <li class="link">
                                                <a href="pipes/AudioTitlePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AudioTitlePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/DateTimePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateTimePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SecondsToMinutesPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecondsToMinutesPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StimulatorRoutingModule.html" data-type="entity-link" >StimulatorRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/BaseExperimentTypeComponent.html" data-type="entity-link" >BaseExperimentTypeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BaseListComponent.html" data-type="entity-link" >BaseListComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/BaseExperimentTypeResolverDirective.html" data-type="entity-link" >BaseExperimentTypeResolverDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/FilterDialogComponent.html" data-type="entity-link" >FilterDialogComponent</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseFacade.html" data-type="entity-link" >BaseFacade</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseService.html" data-type="entity-link" >BaseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConsoleLoggerMonitorService.html" data-type="entity-link" >ConsoleLoggerMonitorService</a>
                            </li>
                            <li class="link">
                                <a href="classes/DelayResponse.html" data-type="entity-link" >DelayResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/DialogChildComponent.html" data-type="entity-link" >DialogChildComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/DisplayClearCommand.html" data-type="entity-link" >DisplayClearCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/DisplayTextCommand.html" data-type="entity-link" >DisplayTextCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExperimentClearCommand.html" data-type="entity-link" >ExperimentClearCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExperimentFinishCommand.html" data-type="entity-link" >ExperimentFinishCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExperimentNameValidator.html" data-type="entity-link" >ExperimentNameValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExperimentOutputTypeValidator.html" data-type="entity-link" >ExperimentOutputTypeValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExperimentPauseCommand.html" data-type="entity-link" >ExperimentPauseCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExperimentRunCommand.html" data-type="entity-link" >ExperimentRunCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExperimentSetupCommand.html" data-type="entity-link" >ExperimentSetupCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExperimentTypeErpOutputDependencyValidator.html" data-type="entity-link" >ExperimentTypeErpOutputDependencyValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExperimentUploadCommand.html" data-type="entity-link" >ExperimentUploadCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupByFilterEntity.html" data-type="entity-link" >GroupByFilterEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupByFilterProvider.html" data-type="entity-link" >GroupByFilterProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/HelpCommand.html" data-type="entity-link" >HelpCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/MemoryCommand.html" data-type="entity-link" >MemoryCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByFilterEntity.html" data-type="entity-link" >OrderByFilterEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderByFilterProvider.html" data-type="entity-link" >OrderByFilterProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/OutputSetCommand.html" data-type="entity-link" >OutputSetCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/PageToolsChildComponent.html" data-type="entity-link" >PageToolsChildComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterValidators.html" data-type="entity-link" >RegisterValidators</a>
                            </li>
                            <li class="link">
                                <a href="classes/SequencePartCommand.html" data-type="entity-link" >SequencePartCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/SettingsPopupComponent.html" data-type="entity-link" >SettingsPopupComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShareValidators.html" data-type="entity-link" >ShareValidators</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortByFilterEntity.html" data-type="entity-link" >SortByFilterEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortByFilterProvider.html" data-type="entity-link" >SortByFilterProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/StimulatorStateCommand.html" data-type="entity-link" >StimulatorStateCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/StopConditionChildComponent.html" data-type="entity-link" >StopConditionChildComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/StopConditionComponentProvider.html" data-type="entity-link" >StopConditionComponentProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnknownCommand.html" data-type="entity-link" >UnknownCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValueAccessorBase.html" data-type="entity-link" >ValueAccessorBase</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AliveCheckerFacade.html" data-type="entity-link" >AliveCheckerFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AliveCheckerService.html" data-type="entity-link" >AliveCheckerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppEffects.html" data-type="entity-link" >AppEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssetPlayerEffects.html" data-type="entity-link" >AssetPlayerEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssetPlayerService.html" data-type="entity-link" >AssetPlayerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthEffects.html" data-type="entity-link" >AuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommandParserService.html" data-type="entity-link" >CommandParserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConnectionEffects.html" data-type="entity-link" >ConnectionEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConsoleEffects.html" data-type="entity-link" >ConsoleEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConsoleFacade.html" data-type="entity-link" >ConsoleFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConsoleService.html" data-type="entity-link" >ConsoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DelayRequestStorage.html" data-type="entity-link" >DelayRequestStorage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExperimentResultssEffects.html" data-type="entity-link" >ExperimentResultssEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExperimentResultsService.html" data-type="entity-link" >ExperimentResultsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExperimentsEffects.html" data-type="entity-link" >ExperimentsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExperimentsService.html" data-type="entity-link" >ExperimentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileBrowserEffects.html" data-type="entity-link" >FileBrowserEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileBrowserFacade.html" data-type="entity-link" >FileBrowserFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FileBrowserService.html" data-type="entity-link" >FileBrowserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HelpLocalCommandHandler.html" data-type="entity-link" >HelpLocalCommandHandler</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IntroService.html" data-type="entity-link" >IntroService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IpcService.html" data-type="entity-link" >IpcService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListButtonsAddonService.html" data-type="entity-link" >ListButtonsAddonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListGroupSortFilterService.html" data-type="entity-link" >ListGroupSortFilterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalCommandFactory.html" data-type="entity-link" >LocalCommandFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationConnectionEffects.html" data-type="entity-link" >NavigationConnectionEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationEffects.html" data-type="entity-link" >NavigationEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationService.html" data-type="entity-link" >NavigationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayerEffects.html" data-type="entity-link" >PlayerEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SequenceNameValidator.html" data-type="entity-link" >SequenceNameValidator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SequencesEffects.html" data-type="entity-link" >SequencesEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SequencesService.html" data-type="entity-link" >SequencesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SettingsEffects.html" data-type="entity-link" >SettingsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SettingsService.html" data-type="entity-link" >SettingsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StimulatorEffects.html" data-type="entity-link" >StimulatorEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StimulatorService.html" data-type="entity-link" >StimulatorService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ClientIdInterceptorService.html" data-type="entity-link" >ClientIdInterceptorService</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/RequestTimeoutInterceptor.html" data-type="entity-link" >RequestTimeoutInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/ResponseInterceptor.html" data-type="entity-link" >ResponseInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/SessionInterceptorService.html" data-type="entity-link" >SessionInterceptorService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ExperimentsActivate.html" data-type="entity-link" >ExperimentsActivate</a>
                            </li>
                            <li class="link">
                                <a href="guards/ExperimentsDeactivate.html" data-type="entity-link" >ExperimentsDeactivate</a>
                            </li>
                            <li class="link">
                                <a href="guards/LocalSettingsResolver.html" data-type="entity-link" >LocalSettingsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LogoutGuard.html" data-type="entity-link" >LogoutGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ServerSettingsResolver.html" data-type="entity-link" >ServerSettingsResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AssetPlayerState.html" data-type="entity-link" >AssetPlayerState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link" >AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseActions.html" data-type="entity-link" >BaseActions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseFilter.html" data-type="entity-link" >BaseFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseRecord.html" data-type="entity-link" >BaseRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChangeServiceEvent.html" data-type="entity-link" >ChangeServiceEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClientCommand.html" data-type="entity-link" >ClientCommand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentCanDeactivate.html" data-type="entity-link" >ComponentCanDeactivate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentIntro.html" data-type="entity-link" >ComponentIntro</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentsSteps.html" data-type="entity-link" >ComponentsSteps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfirmDialogArgs.html" data-type="entity-link" >ConfirmDialogArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConnectionInformationState.html" data-type="entity-link" >ConnectionInformationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConsoleCommand.html" data-type="entity-link" >ConsoleCommand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConsoleState.html" data-type="entity-link" >ConsoleState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DateTimeFormat.html" data-type="entity-link" >DateTimeFormat</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExperimentResultsState.html" data-type="entity-link" >ExperimentResultsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExperimentsState.html" data-type="entity-link" >ExperimentsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FabListEntry.html" data-type="entity-link" >FabListEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileBrowserState.html" data-type="entity-link" >FileBrowserState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupFilter.html" data-type="entity-link" >GroupFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InformDialogArgs.html" data-type="entity-link" >InformDialogArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IntroTranslation.html" data-type="entity-link" >IntroTranslation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListFilterParameters.html" data-type="entity-link" >ListFilterParameters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListFilterProvider.html" data-type="entity-link" >ListFilterProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListUtilsModuleConfig.html" data-type="entity-link" >ListUtilsModuleConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalCommandHandler.html" data-type="entity-link" >LocalCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavigationState.html" data-type="entity-link" >NavigationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderFilter.html" data-type="entity-link" >OrderFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutputEditorActions.html" data-type="entity-link" >OutputEditorActions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutputEditorArgs.html" data-type="entity-link" >OutputEditorArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OutputEntry.html" data-type="entity-link" >OutputEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageToolsArgs.html" data-type="entity-link" >PageToolsArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParseCommandResult.html" data-type="entity-link" >ParseCommandResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlayerState.html" data-type="entity-link" >PlayerState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Round.html" data-type="entity-link" >Round</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SequenceFastDialogParams.html" data-type="entity-link" >SequenceFastDialogParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SequenceFastDialogResult.html" data-type="entity-link" >SequenceFastDialogResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SequencesState.html" data-type="entity-link" >SequencesState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServerSettings.html" data-type="entity-link" >ServerSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Settings.html" data-type="entity-link" >Settings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SettingsState.html" data-type="entity-link" >SettingsState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortFilter.html" data-type="entity-link" >SortFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StimulatorState.html" data-type="entity-link" >StimulatorState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StopConditionType.html" data-type="entity-link" >StopConditionType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SynchronizeEvent.html" data-type="entity-link" >SynchronizeEvent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});