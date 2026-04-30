const guestSeedVersion = '2026-04-30-1';

const defaultInvitati = [
  {
    nume: "Cornel Lucaciu",
    masa: 1
  },
  {
    nume: "Silvia Lucaciu",
    masa: 1
  },
  {
    nume: "Silviu Lucaciu",
    masa: 1
  },
  {
    nume: "Laura Lucaciu",
    masa: 1
  },
  {
    nume: "Sami Caba",
    masa: 1
  },
  {
    nume: "Ana Caba",
    masa: 1
  },
  {
    nume: "George Caba",
    masa: 1
  },
  {
    nume: "Lavinia Simuț",
    masa: 1
  },
  {
    nume: "Cătălin Caba",
    masa: 2
  },
  {
    nume: "Traian Fodor",
    masa: 2
  },
  {
    nume: "Mărioara Fodor",
    masa: 2
  },
  {
    nume: "Adina Fodor",
    masa: 2
  },
  {
    nume: "Alina Fodor",
    masa: 2
  },
  {
    nume: "Ancuța Fodor",
    masa: 2
  },
  {
    nume: "Călin Trifan",
    masa: 2
  },
  {
    nume: "Lidia Trifan",
    masa: 2
  },
  {
    nume: "Alexandru Gherle",
    masa: 3
  },
  {
    nume: "Anamaria Gherle",
    masa: 3
  },
  {
    nume: "Corneliu Vaida",
    masa: 3
  },
  {
    nume: "Sara Vaida",
    masa: 3
  },
  {
    nume: "Viorel Ghenț",
    masa: 3
  },
  {
    nume: "Monica Ghenț",
    masa: 3
  },
  {
    nume: "Adelina Ghenț",
    masa: 3
  },
  {
    nume: "Denisa Ghenț",
    masa: 3
  },
  {
    nume: "Pavel Ghenț",
    masa: 4
  },
  {
    nume: "Sidonia Ghenț",
    masa: 4
  },
  {
    nume: "Iana Ghenț",
    masa: 4
  },
  {
    nume: "Sorin Demian",
    masa: 4
  },
  {
    nume: "Ema Demian",
    masa: 4
  },
  {
    nume: "Naomi Piț",
    masa: 4
  },
  {
    nume: "soț? Piț",
    masa: 4
  },
  {
    nume: "Florian Ghenț",
    masa: 4
  },
  {
    nume: "Moni Ghenț",
    masa: 5
  },
  {
    nume: "Răzvan Ghenț",
    masa: 5
  },
  {
    nume: "soție Ghenț",
    masa: 5
  },
  {
    nume: "Otilia Stirb",
    masa: 5
  },
  {
    nume: "Cosmin Stirb",
    masa: 5
  },
  {
    nume: "Florica Ile",
    masa: 5
  },
  {
    nume: "Florin Ile",
    masa: 5
  },
  {
    nume: "Marinela Ile",
    masa: 5
  },
  {
    nume: "Daniel Ile",
    masa: 6
  },
  {
    nume: "Stelian Ile",
    masa: 6
  },
  {
    nume: "Elisei Ile",
    masa: 6
  },
  {
    nume: "Natanael Ile",
    masa: 6
  },
  {
    nume: "Neluțu Ile",
    masa: 6
  },
  {
    nume: "Dalia Ile",
    masa: 6
  },
  {
    nume: "Rareș Ile",
    masa: 6
  },
  {
    nume: "Bogdan Ile",
    masa: 6
  },
  {
    nume: "Emil Curta",
    masa: 7
  },
  {
    nume: "Corina Curta",
    masa: 7
  },
  {
    nume: "Ruben Curta",
    masa: 7
  },
  {
    nume: "Filip Săcară",
    masa: 7
  },
  {
    nume: "Ainoa Săcară",
    masa: 7
  },
  {
    nume: "Ovidiu Ile",
    masa: 7
  },
  {
    nume: "Corina Ile",
    masa: 7
  },
  {
    nume: "Lenuța Boitoș",
    masa: 7
  },
  {
    nume: "Gheorghe Lucaciu",
    masa: 8
  },
  {
    nume: "Daniel Lucaciu",
    masa: 8
  },
  {
    nume: "Alessio Lucaciu",
    masa: 8
  },
  {
    nume: "Nelu Ghenț",
    masa: 8
  },
  {
    nume: "Dana Ghenț",
    masa: 8
  },
  {
    nume: "Gabriel Ghenț",
    masa: 8
  },
  {
    nume: "Daniela Ghenț",
    masa: 8
  },
  {
    nume: "Tița Coste",
    masa: 8
  },
  {
    nume: "Sorin Coste",
    masa: 9
  },
  {
    nume: "Monica Coste",
    masa: 9
  },
  {
    nume: "Steli Coste",
    masa: 9
  },
  {
    nume: "Lore Coste",
    masa: 9
  },
  {
    nume: "David Coste",
    masa: 9
  },
  {
    nume: "Teodora Popa",
    masa: 9
  },
  {
    nume: "Eugen Lucaciu",
    masa: 9
  },
  {
    nume: "Florina Lucaciu",
    masa: 9
  },
  {
    nume: "Paul Lucaciu",
    masa: 10
  },
  {
    nume: "Alexandru Lucaciu",
    masa: 10
  },
  {
    nume: "Olivia Lucaciu",
    masa: 10
  },
  {
    nume: "Timotei Morna",
    masa: 10
  },
  {
    nume: "Maria Morna",
    masa: 10
  },
  {
    nume: "Octavian Junc",
    masa: 10
  },
  {
    nume: "Dorin Costea",
    masa: 10
  },
  {
    nume: "Carmen Costea",
    masa: 10
  },
  {
    nume: "Raul Costea",
    masa: 11
  },
  {
    nume: "Răzvan Mal",
    masa: 11
  },
  {
    nume: "Diana Mal",
    masa: 11
  },
  {
    nume: "Ovidiu Lucaci",
    masa: 11
  },
  {
    nume: "Răzvan Lucaci",
    masa: 11
  },
  {
    nume: "Emanuel Motoc",
    masa: 11
  },
  {
    nume: "Adriana Motoc",
    masa: 11
  },
  {
    nume: "Anișoara Lucaci",
    masa: 11
  },
  {
    nume: "Adrian Dumea",
    masa: 12
  },
  {
    nume: "Adina Dumea",
    masa: 12
  },
  {
    nume: "Daria Dumea",
    masa: 12
  },
  {
    nume: "Timotei Dumea",
    masa: 12
  },
  {
    nume: "Anișoara Lugojan",
    masa: 12
  },
  {
    nume: "Viorel Lazăr",
    masa: 12
  },
  {
    nume: "Romanița Lazăr",
    masa: 12
  },
  {
    nume: "Violeta Bucur",
    masa: 12
  },
  {
    nume: "Miriam Lazăr",
    masa: 13
  },
  {
    nume: "Ana Manole",
    masa: 13
  },
  {
    nume: "Alexandru Manole",
    masa: 13
  },
  {
    nume: "Eduard Manole",
    masa: 13
  },
  {
    nume: "Marinela Pukansky",
    masa: 13
  },
  {
    nume: "Ioji Pukansky",
    masa: 13
  },
  {
    nume: "Piti Seracin",
    masa: 13
  },
  {
    nume: "Alina Seracin",
    masa: 13
  },
  {
    nume: "Mari Seracin",
    masa: 14
  },
  {
    nume: "Aurel Seracin",
    masa: 14
  },
  {
    nume: "Claudia Seracin",
    masa: 14
  },
  {
    nume: "Adrian Seracin",
    masa: 14
  },
  {
    nume: "Pușa Tuchiluș",
    masa: 14
  },
  {
    nume: "Dorin Tuchiluș",
    masa: 14
  },
  {
    nume: "Trifu Beuca",
    masa: 14
  },
  {
    nume: "Daniel Bistrian",
    masa: 14
  },
  {
    nume: "Sănduț Bogdan",
    masa: 15
  },
  {
    nume: "Maria Bogdan",
    masa: 15
  },
  {
    nume: "Cosmin Bogdan",
    masa: 15
  },
  {
    nume: "Uțu Berneanțu",
    masa: 15
  },
  {
    nume: "Florian Baciu",
    masa: 15
  },
  {
    nume: "Lenuța Baciu",
    masa: 15
  },
  {
    nume: "Ioan Oprea",
    masa: 15
  },
  {
    nume: "Liviu Rugea",
    masa: 15
  },
  {
    nume: "Larisa Rogojan",
    masa: 16
  },
  {
    nume: "Sami Condre",
    masa: 16
  },
  {
    nume: "Nelu Codoban",
    masa: 16
  },
  {
    nume: "Florica Codoban",
    masa: 16
  },
  {
    nume: "Dani Codoban",
    masa: 16
  },
  {
    nume: "Ana Codoban",
    masa: 16
  },
  {
    nume: "Dinu Pop",
    masa: 16
  },
  {
    nume: "Eugenia Pop",
    masa: 16
  },
  {
    nume: "Iuliu Centea",
    masa: 17
  },
  {
    nume: "Ligia Centea",
    masa: 17
  },
  {
    nume: "Ionel Haidău",
    masa: 17
  },
  {
    nume: "Felicia Haidău",
    masa: 17
  },
  {
    nume: "Gabi Floruț",
    masa: 17
  },
  {
    nume: "Ana Floruț",
    masa: 17
  },
  {
    nume: "Tudor Luca",
    masa: 17
  },
  {
    nume: "Octaviana Luca",
    masa: 17
  },
  {
    nume: "Ema Baciu",
    masa: 18
  },
  {
    nume: "Maria Durne",
    masa: 18
  },
  {
    nume: "Cristi Chirilă",
    masa: 18
  },
  {
    nume: "Nicoleta Chirilă",
    masa: 18
  },
  {
    nume: "Timeea Chirilă",
    masa: 18
  },
  {
    nume: "Iulia Chirilă",
    masa: 18
  },
  {
    nume: "Vlad Chirilă",
    masa: 18
  },
  {
    nume: "Liviu Apolzan",
    masa: 18
  },
  {
    nume: "Savi Apolzan",
    masa: 19
  },
  {
    nume: "Gheorghe Băbălai",
    masa: 19
  },
  {
    nume: "Dan Sălăgean",
    masa: 19
  },
  {
    nume: "Vali Sălăgean",
    masa: 19
  },
  {
    nume: "Vasile Farcău",
    masa: 19
  },
  {
    nume: "Rodi Farcău",
    masa: 19
  },
  {
    nume: "Nicolae Micoriciu",
    masa: 19
  },
  {
    nume: "Dan Hodorog",
    masa: 19
  },
  {
    nume: "Lena Hodorog",
    masa: 20
  },
  {
    nume: "Sorin Buciuman",
    masa: 20
  },
  {
    nume: "Romina Fâșie",
    masa: 20
  },
  {
    nume: "George Ivan",
    masa: 20
  },
  {
    nume: "Byanca Ivan",
    masa: 20
  },
  {
    nume: "Titus Opreanu",
    masa: 20
  },
  {
    nume: "Iulia Opreanu",
    masa: 20
  },
  {
    nume: "Denisa Popa",
    masa: 20
  },
  {
    nume: "Antoniu Popa",
    masa: 21
  },
  {
    nume: "Laurențiu Pereț",
    masa: 21
  },
  {
    nume: "Adriana Pereț",
    masa: 21
  },
  {
    nume: "Gabriel Țirtea",
    masa: 21
  },
  {
    nume: "Tabita Bonca",
    masa: 21
  },
  {
    nume: "Alexandru Heredea",
    masa: 21
  },
  {
    nume: "Beniamin Țicărat",
    masa: 21
  },
  {
    nume: "Cristina Țicărat",
    masa: 21
  },
  {
    nume: "Gyula Fehér",
    masa: 22
  },
  {
    nume: "Larisa Fehér",
    masa: 22
  },
  {
    nume: "Beniamin Rogojan",
    masa: 22
  },
  {
    nume: "Anca Rogojan",
    masa: 22
  },
  {
    nume: "Filip Rogojan",
    masa: 22
  },
  {
    nume: "Tania Rogojan",
    masa: 22
  },
  {
    nume: "Darius Pașca",
    masa: 22
  },
  {
    nume: "Roberta Pașca",
    masa: 22
  },
  {
    nume: "Delia Eghedi",
    masa: 23
  },
  {
    nume: "Mădălina Eghedi",
    masa: 23
  },
  {
    nume: "Paula Eghedi",
    masa: 23
  },
  {
    nume: "Natanael Eghedi",
    masa: 23
  },
  {
    nume: "Andreea Bere",
    masa: 23
  },
  {
    nume: "Laura Vinter",
    masa: 23
  },
  {
    nume: "David Săcară",
    masa: 23
  },
  {
    nume: "Petra Jarda",
    masa: 23
  },
  {
    nume: "Beniamin Baciu",
    masa: 24
  },
  {
    nume: "Andreea Nan",
    masa: 24
  },
  {
    nume: "Cosmin Ghiță",
    masa: 24
  },
  {
    nume: "Carina Ghiță",
    masa: 24
  },
  {
    nume: "Paul Eghedi",
    masa: 24
  },
  {
    nume: "Vicențiu Cozariuc",
    masa: 24
  },
  {
    nume: "Bogdan Modi",
    masa: 24
  },
  {
    nume: "Ștefania Munteanu",
    masa: 24
  },
  {
    nume: "Daniel Ionaș",
    masa: 25
  },
  {
    nume: "Camelia Ionaș",
    masa: 25
  },
  {
    nume: "Darius Breje",
    masa    : 25
  }
]