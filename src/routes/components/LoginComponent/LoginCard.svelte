<script lang="ts">
    // Css imports
    import '../../styles/inputs.css'
    import '../../styles/form_texts.css'

    // Svelte modules
    import type LoginDTO from "../../../api/models/LoginDTO";

    // Properties
    export let onLogin = async (loginEntity: LoginDTO) => {};

    // Data bindings
    let email: string = "";
    let password: string = "";
    
    function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
        if (email.length > 0 && password.length > 0) {
            const loginData: LoginDTO = {email, password};
            onLogin(loginData);
        }
    }

</script>

<div>
    <form class="loginCard" on:submit={handleSubmit}>
        <h2>Inicia sesión</h2>
        <input  type="email" 
                placeholder="Ingrese su email"
                bind:value={email}>
        <input  type="password"
                placeholder="Ingrese su contraseña"
                bind:value={password}/>
        <button type="submit"
                class="submitButton">Iniciar Sesión</button>
    </form>
    <hr />
    <h2>¿No tienes cuenta?</h2>
    <a class="submitButton longSubmitButton" href="/Register">Registrate</a>
</div>

<style>
    .loginCard {
        display: flex;
        flex-direction: column;
    }
</style>