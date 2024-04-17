<div class="loadingWidget"/>
<p>Cargando...</p>

<style>
    .loadingWidget {
        width: 50px;
        height: 50px;
        border: 4px rgb(83, 0, 218) solid;
        border-right: 4px transparent solid;
        border-radius: 50%;
        animation: infinite 1s spining;
    }

    p {
        color: white;
        margin-top: 4px;
    }

    @keyframes spining {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>