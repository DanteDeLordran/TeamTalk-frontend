<script lang="ts">
    // Css imports
    import '../../styles/inputs.css'
    import '../../styles/form_texts.css'

    // Svelte modules
    import type LoginDTO from "../../../api/models/LoginDTO";

    // Properties
    export let onLogin = async (loginEntity: LoginDTO) => {};
    export let registerPageRoute: string = "/";

    // Data bindings
    let email: string = "";
    let password: string = "";
    
    function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
        if (email.length > 0 && password.length > 0) {
            const loginData: LoginDTO = {email, password};
            onLogin(loginData);
        }
    }

    function goRegister(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
        if (event.button === 0) {
            window.open(registerPageRoute, '_self');
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
    <button on:click={goRegister}
            class="submitButton longSubmitButton">Registrate</button>
</div>

<style>
    .loginCard {
        display: flex;
        flex-direction: column;
    }
</style>