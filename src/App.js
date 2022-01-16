import React, { useState, useEffect } from "react";
import "./styles/App.css";

import Timer from "./components/Timer";
import StartButton from "./components/Start-Button";
import Form from "./components/Form";

const TEST_TIME = 60;

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
    console.log(wordsListToSet);
    setWordsList(wordsListToSet);
    setTime(TEST_TIME);
    setWordsTyped(0);
    setErrors(0);
    setTestLoading(false);
  }

  function incrementWordsTyped() {
    setWordsTyped(wordsTyped + 1);
  }

  function incrementErrors() {
    setErrors(errors + 1);
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

  if (testActive) {
    return (
      <div className="App">
        <Timer time={time} />
        <Form
          wordsList={wordsList}
          wordsTyped={wordsTyped}
          incrementErrors={incrementErrors}
          incrementWordsTyped={incrementWordsTyped}
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
        <div className="header">Rules:</div>
        <ul className="header">
          <li>Type as many words as you can for 60 seconds</li>
          <li>No need to enter spaces between each word</li>
          <li>Punctuation and letter casing must match</li>
        </ul>
        <StartButton startTest={startTest} />
        <div className="header">
          Your typing speed was {wordsTyped} WPM, with {errors} errors.
        </div>
      </div>
    );
  }
}

export default App;
