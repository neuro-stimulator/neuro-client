# DiplomkaFrontend

Klientská část diplomové práce na téma: **Návrh hardwarového stimulátoru pro neuroinformatické experimenty**

![](https://github.com/stechy1/diplomka-frontend/workflows/build/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/stechy1/diplomka-frontend/badge.svg?branch=master)](https://coveralls.io/github/stechy1/diplomka-frontend?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/34518139f9c84080be1393c855db962f)](https://www.codacy.com/manual/stechy12/diplomka-frontend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=stechy1/diplomka-frontend&amp;utm_campaign=Badge_Grade)
![](https://img.shields.io/github/languages/code-size/stechy1/diplomka-frontend)
![](https://img.shields.io/github/package-json/v/stechy1/diplomka-frontend)
![](https://img.shields.io/librariesio/github/stechy1/diplomka-frontend)

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
