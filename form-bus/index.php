<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png">
    <link rel="manifest" href="favicons/manifest.json">
    <link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="favicons/favicon.ico">
    <meta name="msapplication-config" content="favicons/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">
    <!-- favicons -->

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title>Form-bus</title>
</head>

<body>

    <div class="wrapper">
        <form method="post" class="form">
            <h1>FORM</h1>

            <div class="form_row">
                <span>Bus number</span>
                <input id='driver' name="bus[bus number]">
            </div>

            <hr>

            <div class="form_row">
                <span>Stations</span>
                <button id="station" type="button">Add station</button>
            </div>

            <div class="stations"></div>

            <hr>

            <div class="form_row">
                <span>Passengers</span>
                <button id="passenger" type="button">Add passengers</button>
            </div>

            <div class="passengers"></div>

            <hr>

            <div class="form_row">
                <span>Your email</span>
                <input id="email" type='email'>
            </div>

            <hr>

            <div class="form_row">
                <input type="submit" value="SEND">
            </div>
        </form>

        <div class="data">
            <?php
                if ($_POST) {
                    getData();
                    mail('khrapins@gmail.com', 'Message from site Form-bus', 'test mail');
                }

                function getData() {
//                    return 'test';

                    echo '<h3>Form successfully sent</h3>';

                    // Bus number
                    echo '<p><b>Bus number</b> - ' . $_POST['bus']['bus number'] . '</p>';

                    // Route
                    echo '<p><b>Route</b></p>';
                    echo '<ol>';
                    foreach ($_POST['bus']['route'] as $value) {
                        echo '<li>' . $value . '</li>';
                    }
                    echo '</ol>';

                    // Passengers
                    echo '<p><b>Passengers</b></p>';
                    echo '<ol>';
                    foreach ($_POST['bus']['passengers'] as $value) {
                        echo '<li>' . $value['name'] . ', ' . $value['station-from'] . ' - ' . $value['station-to'] . '</li>';
                    }
                    echo '</ol>';
                }
            ?>
        </div>

    </div>


    <!-- ошибка о незаполненных полях -->
    <div class="error_wrapper">
        <div class="error_message">
            Fill out all the fields of the form please!
        </div>
    </div>


<!--    <pre>--><?php //var_dump($_POST); ?><!--</pre>-->


    <script src="https://code.jquery.com/jquery-3.1.1.js"></script>

    <script src="script.js"></script>
</body>
</html>