<script>


    /** @param {Event} event */
    function handleSubmit(event) {
        throw new Error("Function not implemented.");
    }
</script>

<div>
    <form class="loginCard" on:submit={handleSubmit}>
        <h2>Inicia sesión</h2>
        <input  type="email" 
                placeholder="Ingrese su email"
                class="textField">
        <input  type="password"
                placeholder="Ingrese su contraseña"
                class="textField"/>
        <button type="submit"
                class="submitButton">Iniciar Sesión</button>
    </form>
    <hr />
    <h2>¿No tienes cuenta?</h2>
    <button class="submitButton">Registrate</button>
</div>

<style>
    .loginCard {
        display: flex;
        flex-direction: column;
    }
    h2 {
        color: white;
        text-align: center;
        font-size: large;
        margin-bottom: 12px;
    }
    .textField {
        border-color: rgb(111, 0, 255);
        border-width: 2px;
        padding: 4px;
        border-radius: 16px;
        margin-bottom: 8px;
    }
    .submitButton {
        background-color: rgb(111, 0, 255, 100%);
        padding: 8px;
        border-radius: 16px;
        color: white;
        font-weight: bold;
        transition: all 300ms;
        width: 100%;
    }
    .submitButton:hover {
        cursor: pointer;
        background-color: rgba(111, 0, 255, 0);
        background: linear-gradient(68deg, rgba(2,0,36,1) 0%,
                    rgba(72,9,121,1) 48%, 
                    rgba(87,7,156,1) 52%,
                    rgba(134,77,189,1) 75%, 
                    rgba(128,0,255,1) 100%);
        box-shadow: 0 0 20px rgb(170, 114, 243);
    }
    hr {
        margin: 24px 0 24px 0;
    }
</style>