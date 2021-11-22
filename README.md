# DiplomkaFrontend

Klientská část diplomové práce na téma: **Návrh hardwarového stimulátoru pro neuroinformatické experimenty**

![](https://github.com/neuro-stimulator/neuro-client/workflows/build/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/neuro-stimulator/neuro-client/badge.svg?branch=master)](https://coveralls.io/github/neuro-stimulator/neuro-client?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8e32be8838534ae08de36a79e2da835a)](https://www.codacy.com/manual/neuro-stimulator2/neuro-client)
![](https://img.shields.io/github/languages/code-size/neuro-stimulator/neuro-client)
![](https://img.shields.io/github/package-json/v/neuro-stimulator/neuro-client)
![](https://img.shields.io/librariesio/github/neuro-stimulator/neuro-client)

![Výsledná aplikace](images/01_angular_experiments_list.png)

## Funkce

 - Experimenty
   - [x] prohlížeč všech experimentů
     - [x] filtrování
     - [x] řazení
     - [x] seskupování
     - [x] nastavení zobrazené informace
   - [x] CRUD operace s experimenty
   - [x] tvorba nových experimentů
     - [x] ERP
       - [x] sekvence
     - [x] CVEP
     - [x] FVEP
     - [x] TVEP
     - [x] REA
 - Výsledky experimentů
   - [x] zobrazení
   - [x] smazání
 - Přehrávač experimentů
   - [x] podporované experimenty:
     - [x] ERP
       - [x] sekvence
     - [x] CVEP
     - [x] FVEP
     - [x] TVEP
     - [x] REA
 - Podporované typy výstupů
    - [x] LED
    - [x] IMAGE
    - [x] AUDIO
 - Podporované příkazy v konzoli:
    - `Reboot` - restartuje stimulátor
    - `DisplayClear` - vymaže obsah displaye
    - `DisplayText` - zapíše text na display
    - `ExperimentUpload` - nahraje experiment do paměti stimulátoru
    - `ExperimentInit` - inicializuje nahraný experiment ve stimulátoru
    - `ExperimentStart` - odstartuje experiment
    - `ExperimentStop` - zastaví experiment
    - `ExperimentClear`  - vymaže experiment z paměti stimulátoru
 - Nastavení aplikace
    - [ ] Stav připojených služeb
      - [ ] Web Server
        - [x] Odpojení
        - [ ] Restart
      - [ ] Stimulator
        - [x] Připojení
        - [x] Odpojení
        - [ ] Restart
        - [x] Aktualizace firmware
      - [x] Přehrávač zvuků a obrázků
    - [x] Konfigurace parametrů
      - [x] Přeheld experimentů
      - [x] Konfigurace serveru
