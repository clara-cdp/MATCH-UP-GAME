<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel=stylesheet href='styles.css'>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Barriecito&family=Titan+One&display=swap" rel="stylesheet">

        <title>MATCH UP!</title>
    </head>

    <body>
        <header>
            <h1>MATCH UP!</h1>
        </header>
        <main class="container">
            <div class="hud">
                <div class="score">score <span id="scoreBox">0</span></div>
                <div class="timer">Time <span id="seconds">00</span></div>
                <div>
                    <form action="Index.php" method="GET">
                        <h3>decks</h3>
                        <div>
                            <input type="radio" value="card1" name="cardType" id="card1">
                            <label for="card1">Japan</label><br>

                            <input type="radio" value="card2" name="cardType" id="card2">
                            <label for="card2">Mosaics</label><br>

                            <input type="radio" value="card3" name="cardType" id="card3">
                            <label for="card3">Dogs</label><br>
                        </div>
                        <h3>Backgrounds</h3>

                        <div>
                            <input type="radio" value="bg1" name="bgType" id="bg1">
                            <label for="bg1">Mt Fuji</label><br>

                            <input type="radio" value="bg2" name="bgType" id="bg2">
                            <label for="bg2">Neon</label><br>

                            <input type="radio" value="bg3" name="bgType" id="bg3">
                            <label for="bg3">Field</label><br>

                            <input type="radio" value="bg4" name="bgType" id="bg4">
                            <label for="bg4">Teal</label><br>

                            <input type="radio" value="bg5" name="bgType" id="bg5">
                            <label for="bg5">Koy</label><br>
                        </div>
                    </form>
                </div>
            </div>

            <div class='gameBoard'>

                <!-- create cards in javaSccript-->

            </div>
        </main>
    </body>
    <script src="script.js" defer></script>

</html>