# DiplomkaFrontend

Klientská část diplomové práce na téma: **Návrh hardwarového stimulátoru pro neuroinformatické experimenty**

## Funkce

 - Experimenty
   - [x] prohlížeč všech experimentů
     - [ ] filtrování
   - [x] CRUD operace s experimenty
   - [ ] tvorba nových experimentů
     - [x] ERP
     - [x] CVEP
     - [x] FVEP
     - [x] TVEP
     - [ ] REA
 - Výsledky experimentů
   - [x] zobrazení
   - [x] smazání
 - Přehrávač experimentů
   - podporované experimenty:
     - [ ] ERP
     - [x] CVEP
     - [ ] FVEP
     - [ ] TVEP
     - [ ] REA
 - Podporované typy výstupů
    - [x] LED
    - [ ] IMAGE
    - [ ] AUDIO
 - Podporované příkazy v konzoli:
    - `Reboot` - restartuje stimulátor
    - `DisplayClear` - vymaže obsah displaye
    - `DisplayText` - zapíše text na display
    - `ExperimentUpload` - nahraje experiment do paměti stimulátoru
    - `ExperimentInit` - inicializuje nahraný experiment ve stimulátoru
    - `ExperimentStart` - odstartuje experiment
    - `ExperimentStop` - zastaví experiment
    - `ExperimentClear`  - vymaže experiment z paměti stimulátoru
