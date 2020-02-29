# DiplomkaFrontend

Klientská část diplomové práce na téma: **Návrh hardwarového stimulátoru pro neuroinformatické experimenty**

![](https://github.com/stechy1/diplomka-frontend/workflows/build/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/stechy1/diplomka-frontend/badge.svg?branch=master)](https://coveralls.io/github/stechy1/diplomka-frontend?branch=master)

## Funkce

 - Experimenty
   - [x] prohlížeč všech experimentů
     - [x] filtrování
     - [x] řazení
     - [x] seskupování
     - [x] nastavení zobrazené informace
   - [x] CRUD operace s experimenty
   - [ ] tvorba nových experimentů
     - [x] ERP
       - [ ] sekvence
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
       - [ ] sekvence
     - [x] CVEP
     - [x] FVEP
     - [x] TVEP
     - [ ] REA
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
    - [ ] Konfigurace parametrů
      - [x] Přeheld experimentů
      - [x] Konfigurace serveru
