<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Aktivasi Akun</title>
</head>

<body>
    <h2>Halo, {{ $user->name }}</h2>
    <p>Silakan klik tombol di bawah untuk mengaktivasi akun Anda:</p>
    <button><a href="{{ url('/api/activate/' . $token) }}">Aktivasi Akun</a></button>
    <p>Terima kasih telah mendaftar!</p>
</body>

</html>