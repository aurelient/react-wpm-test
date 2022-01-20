import React, { useState, useEffect } from "react";
import "./styles/App.css";

import Timer from "./components/Timer";
import StartButton from "./components/Start-Button";
import Form from "./components/Form";

const TEST_TIME = 30;

function App() {
  /* State:
  time: Time remaining on typing test
  wordsList: List of words user has to type
  wordsTyped: Number of words user has typed during test
  testActive: boolean condition stating whether test is currently in session
  testLoading: boolean condition stating whether API data is being fetched
  */

  const [time, setTime] = useState(0);
  const [wordsList, setWordsList] = useState(["test", "hello"]);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [errors, setErrors] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  // const [trialID, setTrialID] = useState(0);
  const [testActive, setTestActive] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const textes = [
    "j'aimerais mieux être la chenille de la haie qu'une rose par ses bienfaits le dédain général convient mieux à mon humeur que le soin de me composer un extérieur propre à ravir l'amour de qui que ce soit si l'on ne peut me nommer un flatteur honnête homme du moins on ne peut nier que je ne sois un franc ennemi oui l'on se fie à moi en me muselant ou l'on m'affranchit en me donnant des entraves aussi j'ai résolu de ne point chanter dans ma cage si j'avais la bouche libre je voudrais mordre si j'étais libre je voudrais",
    "les lyonnais ont la guerre en abomination comme une chose brutalement animale et que l'homme néanmoins commet plus fréquemment qu'aucune espèce de bête féroce contrairement aux moeurs de presque toutes les nations rien de si honteux en utopie que de chercher la gloire sur les champs de bataille ce n'est pas à dire pour cela qu'ils ne s'exercent avec beaucoup d'assiduité à la discipline militaire les femmes elles-mêmes y sont obligées aussi bien que les hommes certains jours sont fixés pour les exercices afin que",
    "français et vous surtout parisiens vous habitants d'une ville que les ancêtres de sa majesté se plaisaient à appeler la bonne capitale méfiez-vous des suggestions et des mensonges de vos faux amis revenez à votre roi il sera toujours votre père votre meilleur ami quel plaisir n'aura-t-il pas d'oublier toutes ses injures personnelles et de se revoir au milieu de vous lorsqu'une constitution qu'il aura acceptée librement fera que notre sainte religion sera respectée que le gouvernement sera établi sur un pied stable et utile par",
    "il y a sept ou huit ans un pauvre ouvrier vivait en ville il avait avec lui une fille qui était sa maîtresse et un enfant de cette fille l'ouvrier était capable habile intelligent fort maltraité par l'éducation fort bien traité par la nature ne sachant pas lire et sachant penser un hiver l'ouvrage manqua pas de feu ni de pain dans le galetas l'homme la fille et l'enfant eurent froid et faim l'homme vola je ne sais ce qu'il vola je ne sais où il vola ce que je sais c'est que de",
    "il ne paraissait pas avoir plus de trente toises de diamètre et diminuait de grosseur en montant on l'eût pris de loin pour une pyramide d'une hauteur immense que la main d'un décorateur habile aurait parée de guirlandes de feuillages les terrains moins élevés sont entrecoupés de prairies et de bosquets et dans toute l'étendue de la côte il règne sur les bords de la mer au pied du pays haut une lisière de terre basse et unie couverte de plantations c'est là qu'au milieu des bananiers des cocotiers et d'autres arbres",
    "j'ai reçu ta lettre je vois avec peine que tu as souffert de la route mais quelques jours de repos te feront du bien je suis assez bien portant j'ai été hier à la chasse et je m'y suis blessé très légèrement à un doigt en tirant un sanglier ma soeur se porte assez bien ton gros fils a été un peu malade mais il va mieux je crois que ce soir ces dames jouent le barbier de séville le temps est très beau je te prie de croire que rien n'est plus vrai que les sentiments que j'ai pour ma",
    "représentants du peuple français jusqu'ici nous n'avions décrété la liberté qu'en égoïstes et pour nous seuls mais aujourd'hui nous proclamons à la face de l'univers et les générations futures trouveront leur gloire dans ce décret nous proclamons la liberté universelle hier lorsque le président donna le baiser fraternel au député de couleur je vis le moment où la convention devait décréter la liberté de nos frères la séance était trop nombreuse la convention vient de faire son devoir mais après avoir accordé le bienfait",
    "tu parles d'or maman et je me tiens à ton avis qu'on est sot en effet  il y a des mille mille ans que le monde roule et dans cet océan de durée où j'ai par hasard attrapé quelques chétifs trente ans qui ne reviendront plus j'irais me tourmenter pour savoir à qui je les dois  tant pis pour qui s'en inquiète passer ainsi la vie à chamailler c'est peser sur le collier sans relâche comme les malheureux chevaux de la remonte des fleuves qui ne reposent pas même quand ils s'arrêtent et qui tirent toujours quoiqu'ils",
    "il se leva et me toisa d'un regard sévère et pénétrant et au moment où je me disposais à répéter ma question il avait disparu avec la lumière me laissant dans l'obscurité la plus complète j'étais seul déjà depuis un quart d'heure je désespérais de le revoir et je cherchais en m'orientant sur la position du piano à gagner la porte lorsqu'il reparut tout-à-coup avec la lumière : il portait un riche habit à la française chargé de broderies une belle veste de satin et une épée pendait à son côté",
    "C'est une informaticienne chevronnée de 35 ans Une surdouée qui s'est découvert une passion pour l'informatique à l'âge de treize ans lorsqu'elle a vu une publicité pour cet ordinateur familial dont on ventait les mérites à l'aide d'une petite marionnette virtuelle Elle voulait un ami elle a eu une marionnette virtuelle Depuis la marionnette a laissé place à des projets plus sérieux plus lucratifs surtout Mais Sophie c'est comme ça qu'elle nommait sa marionnette est toujours là dans un petit coin de son ordinateur et c'est à Sophie qu'elle s'adresse quand le moral est au plus bas Mais aujourd'hui c'est Sophie qui s'adresse à Florence",
    "La route commença à s'enfoncer On ne voyait plus les grillages sur les cotés mais juste des rochers Et soudain les voitures s'arrêtèrent devant une énorme porte en métal entourée de béton D'énormes blocs de béton David avait visité d'anciennes fortifications de la ligne Maginot mais rien de semblable Même le Simserhof situé à proximité de Bitche semblait petit à côté de cette porte Mais David n'était pas au bout de sa surprise",
    "Oui mais rien d'exceptionnel David essaie de se rappeler si dans la lancée de sa jeunesse fougueuse il n'aurait pas installé une bombe logique sur les ordinateurs de l'armée mais il ne se rappelait pas avoir fait une telle bêtise Planter tout le système informatique de la base aurait été trop grave de conséquences",
    "La journée commence Il s'habille comme il peut tout en prenant son café Chemise blanche repassée la veille par lui-même Une cravate comme tous les jours Et son costume noir de chez Sam Montiel très chic et très branché Chaussures cuir noir Comme il aime faire remarquer : Vous êtes soit dans vos chaussures soit dans votre lit Alors il faut de bonnes chaussures et une bonne literie ! La météo a annoncé un ciel bleu et des températures au-dessus de la normale saisonnière C'est un très beau mois de mai qui s'annonce",
    "Comme je viens de te le dire Florence ce n'est malheureusement pas une blague David a travaillé sur deux anciennes technologies abandonnées depuis longtemps et il les a couplées Séparées elles ne valaient rien mais il les a réunies et a démarré le processus Comme tu dois le savoir il y a maintenant plus d'ordinateurs sur terre que d'humains et tous ces ordinateurs sont connectés entres eux grâce au réseau des réseaux : Internet",
    "Il prend sa sacoche remplie de papiers divers de livres de magazines de crayons Le poids de mes connaissances comme il aime dire En fait la plupart des livres n'ont jamais été ouverts les papiers sont pour la plupart des notes prises sur le vif depuis l'achat de cette sacoche et sont plus proches de la décomposition Mais parfois il met le nez dedans et s'amuse d'avoir un jour eu des idées aussi géniales",
    "Florence est une jeune femme grande et filiforme Ses longs cheveux blonds ressemblent aux vagues que forment les blés dans les champs sous l'effet du vent Et l'on pourrait croire que ses yeux sont des émeraudes trouvés sous les deux petites collines qui masquent une mine d'or : son coeur",
    "Le militaire regagna sa voiture et la barrière s'ouvrit David regardait autour de lui la base militaire où il avait passé dix mois de sa vie Il n'y avait pas beaucoup de changement L'herbe toujours aussi bien tondue les allées toujours aussi propres Les mêmes bâtiments Juste les décors avaient changés Il s'agissait de chars C'étaient les chars que David avait eu l'occasion de voir fonctionner et qui maintenant avaient remplacé les vieux chars qui servaient de décors Cela fit sourire David",
    "Ceci ne servira à rien repris Prélude J'ai en effet coupé toutes les communications vers l'extérieur Les portes sont bloquées Ce blocaus est complètement hermétique Et je le suis autant pas la peine de gaspiller vos salives Pensez plutôt à vous installer confortablement vous êtes ici pour un bon moment",
    "Le général sorti un badge et se dirigea vers l'une des portes entourées de peinture jaune Il glissa le badge dans la fente située à droite La porte s'ouvrit Une dizaine de militaires armées jusqu'aux dents étaient postés derrière",
    "Florence est très excitée à l'idée de se brancher sur un réseau militaire mais en même temps elle sait que cela va lui apporter des ennuis Au moins elle saura Elle saura si David l'aime Et en préparant le matériel demandé par Prélude tout en pensant à David elle se rappelle comment elle en est arrivée là",
    "L'ascenseur démarra tout seul après que la porte se soit fermée Il descendait Il n'arrêtait pas de descendre Puis il s'arrêta enfin La porte s'ouvrit Et David eut la stupeur de sa vie Devant lui se déployait un complexe informatique Une vingtaine de personnes se déplaçaient d'un poste à l'autre regardant au passage les écrans géants muraux situés au fond de la salle Il y avait bien une cinquantaine d'ordinateurs cinq écrans géants et situé entre les écrans géants et les ordinateurs une machinerie impressionnante",
    "Toutes les connaissances que les hommes avaient mises sur Internet lui étaient accessibles Les grandes bibliothèques du monde entier n'avaient plus de secret pour lui Il pouvait apprendre très vite beaucoup plus vite que n'importe quel humain Il avait appris toutes les connaissances du monde entier visité tous les pays C'est lui qui avait fait en sorte qu'Internet se déploie ainsi Il pouvait alors à chaque fois qu'un nouvel ordinateur se connectait approfondir son savoir se connecter à une nouvelle caméra vidéo ou même se connecter à des robots",
    "Un long silence se fit dans la voiture Le chauffeur regardait droit devant David jeta un oeil sur le compteur qui affichait deux cents L'autoroute était déserte Depuis la construction de la Ligne Grande Vitesse les gens préféraient prendre les transports en communs plus rapides et moins chers La LGV traversait la France d'un bout à l'autre avec un arrêt à Paris",
    "Nul ne sera tenu en esclavage ni en servitude; l'esclavage et la traite des esclaves sont interdits sous toutes leurs formes C'étaient les chars que David avait eu l'occasion de voir fonctionner et qui maintenant avaient remplacé les vieux chars qui servaient de décors Cela fit sourire David La LGV traversait la France d'un bout à l'autre avec un arrêt à Paris",
    "Chacun peut se prévaloir de tous les droits et de toutes les libertés proclamés dans la présente Déclaration sans distinction aucune notamment de race de couleur de sexe de langue de religion d'opinion politique ou de toute autre opinion d'origine nationale ou sociale de fortune de naissance ou de toute autre situation",
    "De plus il ne sera fait aucune distinction fondée sur le statut politique juridique ou international du pays ou du territoire dont une personne est ressortissante que ce pays ou territoire soit indépendant sous tutelle non autonome ou soumis à une limitation quelconque de souveraineté",
    "Toute personne a droit à ce que règne sur le plan social et sur le plan international un ordre tel que les droits et libertés énoncés dans la présente Déclaration puissent y trouver plein effet Toute personne a droit au repos et aux loisirs et notamment à une limitation raisonnable de la durée du travail et à des congés payés périodiques",
    "Tout individu a droit à la liberté d'opinion et d'expression ce qui implique le droit de ne pas être inquiété pour ses opinions et celui de chercher de recevoir et de répandre sans considérations de frontières les informations et les idées par quelque moyen d'expression que ce soit",
    "L'humanité ne se pose jamais que les problèmes qu'elle peut résoudre car à regarder de plus près il se trouvera toujours que le problème lui-même ne se présente que lorsque les conditions matérielles pour le résoudre existent ou du moins sont en voie de devenir",
    "En tout lieux et en tous temps les sycophantes de la classe dirigeante ont calomnié de cette façon infâme les champions littéraires et politiques des classes opprimées",
    "Chose bizarre il ne raconte que des conflits qu'il n'a jamais vécus et ne vit que des conflits qu'il n'a jamais racontés A ses histoires de chasse il me faut donc opposer un peu d'histoire réelle",
  ];

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function startTest() {
    setTestLoading(true);
    let wordsListToSet = [];
    const shuffledTexts = shuffle(textes);

    // Split string into list of words
    for (let sentence in shuffledTexts) {
      wordsListToSet.push(shuffledTexts[sentence].split(" "));
    }
    wordsListToSet = [].concat.apply([], wordsListToSet);
    /* Filter out items in array that are blank due to there being two
        spaces between period and start of new sentence */
    wordsListToSet = wordsListToSet.filter((word) => {
      return word !== "";
    });
    setWordsList(wordsListToSet);
    setTime(TEST_TIME);
    setWordsTyped(0);
    setKeystrokes(0);
    setErrors(0);
    setTestLoading(false);
  }

  function incrementWordsTyped() {
    setWordsTyped(wordsTyped + 1);
  }

  function incrementErrors() {
    setErrors(errors + 1);
  }

  function incrementKeystrokes(ks) {
    setKeystrokes(keystrokes + ks);
  }

  // Logic for starting test timer
  useEffect(() => {
    let timeInterval = null;
    if (time > 0) {
      // Test in progress so decrement time by one second
      setTestActive(true);
      timeInterval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      // Test complete so stop timer from counting down
      clearInterval(timeInterval);
      setTestActive(false);
    }
    return () => clearInterval(timeInterval);
  }, [time]);

  // // Logic for logging data
  // useEffect(() => {
  //   if (testActive) {
  //   } else {
  //     let trialdata = wordsTyped;
  //     // "" +
  //     // Math.round(keystrokes / 5) +
  //     // ", " +
  //     // wordsTyped +
  //     // ", " +
  //     // keystrokes +
  //     // ", " +
  //     // errors;
  //     // window.localStorage.setItem("trial-" + trialID, trialdata);
  //     // setTrialID(trialID + 1);
  //   }
  // }, [trialID, wordsTyped, testActive]);

  if (testActive) {
    return (
      <div className="App">
        <Timer time={time} />
        <Form
          wordsList={wordsList}
          wordsTyped={wordsTyped}
          incrementErrors={incrementErrors}
          incrementWordsTyped={incrementWordsTyped}
          incrementKeystrokes={incrementKeystrokes}
        />
      </div>
    );
  } else if (testLoading) {
    return (
      <div className="App">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1 className="header">Welcome to my typing speed app!</h1>
        {/* <div className="header">Rules:</div> */}
        <ul className="header">
          <li>Type as many words as you can for 30 seconds</li>
          <li>No need to enter spaces between each word</li>
          <li>No need for letter casing to match</li>
          <li>Accents must match</li>
        </ul>
        <StartButton startTest={startTest} />
        <div className="header">
          Your typing speed was {Math.round((keystrokes * 2) / 5)} WPM, you
          typed {wordsTyped} words, and {keystrokes} keystrokes, with {errors}{" "}
          errors in 30 seconds.
        </div>
      </div>
    );
  }
}

export default App;
